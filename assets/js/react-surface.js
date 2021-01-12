import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// attribute names used on the server.
const COMP_ATTR = "rs-c";
const PROP_ATTR = "rs-p";
const METHOD_ATTR = "rs-m";

// some exported react utility hooks for accessing + setting up the LiveContext
export const LiveContext = React.createContext({});
export const useLiveContext = () => React.useContext(LiveContext);
export const LiveContextProvider = ({ children, ...events }) => (
  <LiveContext.Provider value={events}>{children}</LiveContext.Provider>
);

// default options for buildHook function.
const defaultOpts = {
  debug: false,
};

const logPrefix = "react-surface: ";

/**
 * Builds the LiveView Hooks to be passed to LiveSocket constructor.
 *
 * @param {Object} components
 * @param {Object} opts
 */
export function buildHook(components = {}, opts = defaultOpts) {
  opts = { ...defaultOpts, ...opts };
  const hook = {
    mounted() {
      const [compName, initialProps, method] = extractAttrs(this.el);
      if (!components[compName]) {
        // this kills LV - needs to be caught early in dev if it arises
        throw `${logPrefix}Missing ${compName} in supplied components object (${Object.keys(
          components
        )})`;
      }

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
      };
      // not sure if this should be a react-surface concern or if this should be something the user should be aware of. (when using react lazy + suspense)
      // when this is a full client side render - check if it is lazy, and add a suspense fallback
      this._ReactSurface.all = [
        [LiveContextProvider, this._ReactSurface.contextProps],
        [components[compName], initialProps],
      ];

      this._ReactSurface.comp = createComponent(this._ReactSurface.all);

      method === "h"
        ? ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild)
        : ReactDOM.render(this._ReactSurface.comp, this.el.lastChild);

      if (opts.debug)
        log("mounted " + formatLog([compName, initialProps, method]));
    },
    updated() {
      const [compName, newProps, method] = extractAttrs(this.el);
      const { name } = this._ReactSurface;

      if (compName !== name)
        warn("Previous component name differs from updated component name");

      this._ReactSurface.name = compName;
      // update the props of the child component.
      this._ReactSurface.all[1][1] = newProps;

      ReactDOM.hydrate(
        createComponent(this._ReactSurface.all),
        this.el.lastChild
      );

      if (opts.debug) log("updated " + formatLog([compName, newProps, method]));
    },
    destroyed() {
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
      if (opts.debug) log(`Destroyed ${this._ReactSurface.name}`);
    },
  };

  // return the created hook
  return {
    _RS: hook,
  };
}

function createComponent([parent_ctx, child_comp]) {
  return React.createElement(
    parent_ctx[0],
    parent_ctx[1],
    React.createElement(child_comp[0], child_comp[1])
  );
}

// grab component name, and encoded component props from element attributes, and returns the decoded tuple [component, props]
function extractAttrs(el) {
  const name = el.attributes[COMP_ATTR].value;
  const encodedProps = el.attributes[PROP_ATTR].value;
  const method = el.attributes[METHOD_ATTR].value;
  return [name, JSON.parse(atob(encodedProps)), method];
}

// logging utils

function formatLog([name, props, method]) {
  return `\nname: ${name}\nprops: ${JSON.stringify(props)}\nmethod: ${method}`;
}

function warn(msg, ...rest) {
  console.warn(logPrefix + msg, ...rest);
}
function log(msg, ...rest) {
  console.log(logPrefix + msg, ...rest);
}
