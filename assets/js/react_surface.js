import React from "react";
import ReactDOM from "react-dom";

const defaultOpts = {
  debug: false,
  attributeName: "rs-comp",
};

// const elements = document.querySelectorAll(`[${opts.attributeName}]`);

export const LiveContext = React.createContext({});
export const useLiveContext = () => React.useContext(LiveContext);
export const LiveContextProvider = ({ children, ...events }) => (
  <LiveContext.Provider value={events}>{children}</LiveContext.Provider>
);

export function buildHook(components = {}, opts = defaultOpts) {
  opts = { ...defaultOpts, ...opts };

  const __ReactSurfaceHydrate = {
    mounted() {
      const [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
      if (opts.debug) console.log("hydrate mounted ", [compName, newProps]);
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

      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[compName], this._ReactSurface.props)
      );

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    updated() {
      const [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
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
      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[compName], this._ReactSurface.props)
      );

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  const __ReactSurface = {
    mounted() {
      const [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
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

      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[compName], this._ReactSurface.props)
      );

      ReactDOM.render(this._ReactSurface.comp, this.el.lastChild);
    },
    updated() {
      const [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
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
      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[compName], this._ReactSurface.props)
      );

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  return { __ReactSurface, __ReactSurfaceHydrate };
}
