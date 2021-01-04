import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const COMP_ATTR = "rs-c";
const PROP_ATTR = "rs-p";

const defaultOpts = {
  debug: false,
  fallback: <div>Loading...</div>,
};

function extractAttrs(el) {
  const name = el.attributes[COMP_ATTR].value;
  const encodedProps = el.attributes[PROP_ATTR].value;
  return [name, JSON.parse(atob(encodedProps))];
}

// const elements = document.querySelectorAll(`[${opts.attributeName}]`);

export const LiveContext = React.createContext({});
export const useLiveContext = () => React.useContext(LiveContext);
export const LiveContextProvider = ({ children, ...events }) => (
  <LiveContext.Provider value={events}>{children}</LiveContext.Provider>
);

export function buildHook(components = {}, opts = defaultOpts) {
  opts = { ...defaultOpts, ...opts };

  const { fallback } = opts;
  // SSR Hook. (hydrate)
  const __RSH = {
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
      ]
    
      this._ReactSurface.comp = reduceComponents(this._ReactSurface.all);

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    updated() {
      const [compName, newProps] = extractAttrs(this.el);

      if (opts.debug) console.log("updated ", [compName, newProps]);
      const {
        name,
        // renderedCount
      } = this._ReactSurface;

      if (compName !== name)
        console.warn("Previous component differs from updated component");

      this._ReactSurface.name = compName;
      // this._ReactSurface.renderedCount = renderedCount + 1;
      this._ReactSurface.props = newProps;
      this._ReactSurface.all[0][1] = this._ReactSurface.props

      ReactDOM.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  // CSR Hook. (client side render)
  const __RSR = {
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
        // renderedCount: 1,
      };

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
      

      ReactDOM.render(reduceComponents(this._ReactSurface.all), this.el.lastChild);
    },
    updated() {
      const [compName, newProps] = extractAttrs(this.el);

      if (opts.debug) console.log("updated ", [compName, newProps]);
      const {
        name,
        // renderedCount
      } = this._ReactSurface;

      if (compName !== name)
        console.warn("Previous component differs from updated component");

      this._ReactSurface.name = compName;
      // this._ReactSurface.renderedCount = renderedCount + 1;
      this._ReactSurface.props = newProps;
      this._ReactSurface.all[0][1] = this._ReactSurface.props

      ReactDOM.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  return { __RSH, __RSR };
}

// [component, props]
function reduceComponents(components) {
  return components.reduce((acc, current) => {
    let [comp, props = {}] = current;
    if (acc === null) {
      return React.createElement(comp, props);
    } else {
      return React.createElement(comp, props, acc);
    }
  }, null);
}
