import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// attribute names used on the server.
const COMP_ATTR = "rs-c";
const PROP_ATTR = "rs-p";

// some exported react utility hooks for accessing + setting up the LiveContext
export const LiveContext = React.createContext({});
export const useLiveContext = () => React.useContext(LiveContext);
export const LiveContextProvider = ({ children, ...events }) => (
  <LiveContext.Provider value={events}>{children}</LiveContext.Provider>
);

// default options for buildHook function.
const defaultOpts = {
  debug: false,
  fallback: <div>Loading...</div>,
};

/**
 * Builds the LiveView Hooks to be passed to LiveSocket constructor.
 * 
 * @param {Object} components 
 * @param {Object} opts 
 */
export function buildHook(components = {}, opts = defaultOpts) {
  opts = { ...defaultOpts, ...opts };
  const { fallback } = opts;
  // SSR Hook. (hydrate)
  const ClientSideHydrate = {
    mounted() {
      const [compName, initialProps] = extractAttrs(this.el);

      if (opts.debug) console.log("hydrate mounted ", [compName, initialProps]);
      if (!components[compName])
        throw `Component with name ${compName} not provided via component param`;

      const handleEvent = this.handleEvent.bind(this);
      const pushEvent = this.pushEvent.bind(this);
      const pushEventTo = this.pushEventTo.bind(this);
      this._ReactSurface = {
        name: compName,
        contextProps: {
          handleEvent,
          pushEvent,
          pushEventTo,
        },
        props: initialProps,
      };

      this._ReactSurface.all = [
        [components[compName], this._ReactSurface.props],
        [LiveContextProvider, this._ReactSurface.contextProps],
      ];

      this._ReactSurface.comp = reduceComponents(this._ReactSurface.all);

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    updated() {
      const [compName, newProps] = extractAttrs(this.el);

      if (opts.debug) console.log("updated ", [compName, newProps]);
      const { name } = this._ReactSurface;

      if (compName !== name)
        console.warn("Previous component differs from updated component");

      this._ReactSurface.name = compName;
      this._ReactSurface.props = newProps;
      // update the props.
      this._ReactSurface.all[0][1] = this._ReactSurface.props;

      ReactDOM.hydrate(
        reduceComponents(this._ReactSurface.all),
        this.el.lastChild
      );
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  // CSR Hook. (client side render)
  const ClientSideRender = {
    mounted() {
      const [compName, newProps] = extractAttrs(this.el);

      if (opts.debug) console.log("render mounted ", [compName, newProps]);
      if (!components[compName])
        throw `Component with name ${compName} not provided via component param`;

      const handleEvent = this.handleEvent.bind(this);
      const pushEvent = this.pushEvent.bind(this);
      const pushEventTo = this.pushEventTo.bind(this);
      this._ReactSurface = {
        name: compName,
        contextProps: {
          handleEvent,
          pushEvent,
          pushEventTo,
        },
        props: newProps,
      };

      // not sure if this should be a react-surface concern or if this should be something the user should be aware of. (when using react lazy + suspense)
      // when this is a full client side render - check if it is lazy, and add a suspense fallback
      this._ReactSurface.all =
        components[compName].$$typeof &&
        String(components[compName].$$typeof).includes("lazy")
          ? [
              [components[compName], this._ReactSurface.props],
              [Suspense, { fallback }],
              [LiveContextProvider, this._ReactSurface.contextProps],
            ]
          : [
              [components[compName], this._ReactSurface.props],
              [LiveContextProvider, this._ReactSurface.contextProps],
            ];

      // this is the only place we are fully rendering the react component
      // all other ReactDOM calls should be to hydrate the already mounted react component.
      ReactDOM.render(
        reduceComponents(this._ReactSurface.all),
        this.el.lastChild
      );
    },
    updated() {
      const [compName, newProps] = extractAttrs(this.el);
      if (opts.debug) console.log("updated ", [compName, newProps]);

      const { name } = this._ReactSurface;

      if (compName !== name)
        console.warn("Previous component differs from updated component");

      this._ReactSurface.name = compName;
      this._ReactSurface.props = newProps;
      this._ReactSurface.all[0][1] = this._ReactSurface.props;

      ReactDOM.hydrate(
        reduceComponents(this._ReactSurface.all),
        this.el.lastChild
      );
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  // return the created hook
  return { __RSH: ClientSideHydrate, __RSR: ClientSideRender };
}

// [component, props]
/**
 * Accepts a list of component + prop `tuples` and generates a react tree
 * Used for wrapping a user supplied component in n providers.
 * ```
 * <3>
 *  <2>
 *   <1/>
 *  </2>
 * </3>
 * ```
 *
 * @param {[[String, Object]]} components
 */
function reduceComponents(components) {
  return components.reduce((acc, [comp, props = {}]) => {
    if (acc === null) {
      return React.createElement(comp, props);
    } else {
      return React.createElement(comp, props, acc);
    }
  }, null);
}

// grab component name, and encoded component props from element attributes, and returns the decoded tuple [component, props]
function extractAttrs(el) {
  const name = el.attributes[COMP_ATTR].value;
  const encodedProps = el.attributes[PROP_ATTR].value;
  return [name, JSON.parse(atob(encodedProps))];
}
