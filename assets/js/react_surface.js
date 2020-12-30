import React from "react";
import ReactDOM from "react-dom";

const defaultOpts = { debug: false, attributeName: "rs-comp" };

/**
 *
 * @param {Object} components
 * @param {Object} opts
 */
export default function initReactSurface(components = {}, opts = defaultOpts) {
  // find all nodes with attribute
  opts = { ...defaultOpts, ...opts };
  const elements = document.querySelectorAll(`[${opts.attributeName}]`);

  // loop over found elements, and render em
  for (let el of elements) {
    parseAttrAndRender(el);
  }

  // returns a function that can be used to update when new props are passed
  // via onBeforeElUpdated dom hook...
  return (from, to) => {
    //
    if (from.__rs) {
      parseAttrAndRender(to, from);
    }
  };

  function parseAttrAndRender(el, from = null) {
    // grab attributes value string and parse as json.

    let [compName, newProps] = JSON.parse(
      el.attributes[opts.attributeName].value
    );

    if (!components[compName])
      throw `Component with name ${compName} not provided via component param`;

    let [oldCount, oldProps] = from
      ? [from.__rs.renderedCount, from.__rs.comp.props]
      : [0, {}];

    let mergedProps = {
      ...oldProps,
      ...newProps,
    };
    // lookup component by name (rather do a dynamic import..), create the react element
    el.__rs = {
      name: compName,
      comp: React.createElement(components[compName], mergedProps),
      renderedCount: oldCount + 1,
    };
    if (opts.debug) {
      console.log(el.__rs);
    }
    // console.log(Object.keys(el));

    // render the element
    ReactDOM.render(el.__rs.comp, el);

    // console.log(Object.keys(el));
  }
}

// consider a hook?
// const ReactSurface = {
//   mounted(){ },
//   updated(){ },
//   destroyed(){ },
// };

// export default ReactSurface;
