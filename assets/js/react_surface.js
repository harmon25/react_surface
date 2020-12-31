import React from "react";
import ReactDOM from "react-dom";

const defaultOpts = {
  debug: false,
  attributeName: "rs-comp",
  hookName: "__React",
};

// const elements = document.querySelectorAll(`[${opts.attributeName}]`);

const LiveContext = React.createContext({});

export const useLiveContext = () => {
  return React.useContext(LiveContext);
};

function LiveContextProvider({ children, ...events }) {
  return (
    <LiveContext.Provider value={events}> {children} </LiveContext.Provider>
  );
}

export function buildHook(components = {}, opts = defaultOpts) {
  opts = { ...defaultOpts, ...opts };

  const __ReactSurface = {
    mounted() {
      let [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
      if (opts.debug) console.log("mounted ", [compName, newProps]);
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
        renderedCount: 1,
      };

      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[compName], this._ReactSurface.props)
      );

      ReactDOM.render(this._ReactSurface.comp, this.el.lastChild);
    },
    updated() {
      let [compName, newProps] = JSON.parse(
        this.el.attributes[opts.attributeName].value
      );
      if (opts.debug) console.log("updated ", [compName, newProps]);
      const { name, renderedCount } = this._ReactSurface;

      if (compName !== name)
        console.warn("Previous component differs from updated component");

      this._ReactSurface.renderedCount = renderedCount + 1;
      this._ReactSurface.props = newProps;
      this._ReactSurface.comp = React.createElement(
        LiveContextProvider,
        this._ReactSurface.contextProps,
        React.createElement(components[name], this._ReactSurface.props)
      );

      ReactDOM.hydrate(this._ReactSurface.comp, this.el.lastChild);
    },
    destroyed() {
      if (opts.debug) console.log(`Destroying `, this._ReactSurface.name);
      ReactDOM.unmountComponentAtNode(this.el.lastChild);
    },
  };

  return { __ReactSurface };
}
