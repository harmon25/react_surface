(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["react-surface"] = factory(require("react"), require("react-dom"));
	else
		root["react-surface"] = factory(root["React"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/react-surface.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/react-surface.js":
/*!*****************************!*\
  !*** ./js/react-surface.js ***!
  \*****************************/
/*! exports provided: LiveContext, useLiveContext, LiveContextProvider, buildHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveContext\", function() { return LiveContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useLiveContext\", function() { return useLiveContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveContextProvider\", function() { return LiveContextProvider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildHook\", function() { return buildHook; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n\n // attribute names used on the server.\n\nvar COMP_ATTR = \"rs-c\";\nvar PROP_ATTR = \"rs-p\"; // some exported react utility hooks for accessing + setting up the LiveContext\n\nvar LiveContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});\nvar useLiveContext = function useLiveContext() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(LiveContext);\n};\nvar LiveContextProvider = function LiveContextProvider(_ref) {\n  var children = _ref.children,\n      events = _objectWithoutProperties(_ref, [\"children\"]);\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LiveContext.Provider, {\n    value: events\n  }, children);\n}; // default options for buildHook function.\n\nvar defaultOpts = {\n  debug: false,\n  fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Loading...\")\n};\n/**\n * Builds the LiveView Hooks to be passed to LiveSocket constructor.\n * \n * @param {Object} components \n * @param {Object} opts \n */\n\nfunction buildHook() {\n  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;\n  opts = _objectSpread(_objectSpread({}, defaultOpts), opts);\n  var _opts = opts,\n      fallback = _opts.fallback; // SSR Hook. (hydrate)\n\n  var ClientSideHydrate = {\n    mounted: function mounted() {\n      var _extractAttrs = extractAttrs(this.el),\n          _extractAttrs2 = _slicedToArray(_extractAttrs, 2),\n          compName = _extractAttrs2[0],\n          initialProps = _extractAttrs2[1];\n\n      if (opts.debug) console.log(\"hydrate mounted \", [compName, initialProps]);\n      if (!components[compName]) throw \"Component with name \".concat(compName, \" not provided via component param\");\n      var handleEvent = this.handleEvent.bind(this);\n      var pushEvent = this.pushEvent.bind(this);\n      var pushEventTo = this.pushEventTo.bind(this);\n      this._ReactSurface = {\n        name: compName,\n        contextProps: {\n          handleEvent: handleEvent,\n          pushEvent: pushEvent,\n          pushEventTo: pushEventTo\n        },\n        props: initialProps\n      };\n      this._ReactSurface.all = [[components[compName], this._ReactSurface.props], [LiveContextProvider, this._ReactSurface.contextProps]];\n      this._ReactSurface.comp = reduceComponents(this._ReactSurface.all);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(this._ReactSurface.comp, this.el.lastChild);\n    },\n    updated: function updated() {\n      var _extractAttrs3 = extractAttrs(this.el),\n          _extractAttrs4 = _slicedToArray(_extractAttrs3, 2),\n          compName = _extractAttrs4[0],\n          newProps = _extractAttrs4[1];\n\n      if (opts.debug) console.log(\"updated \", [compName, newProps]);\n      var name = this._ReactSurface.name;\n      if (compName !== name) console.warn(\"Previous component differs from updated component\");\n      this._ReactSurface.name = compName;\n      this._ReactSurface.props = newProps; // update the props.\n\n      this._ReactSurface.all[0][1] = this._ReactSurface.props;\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n    destroyed: function destroyed() {\n      if (opts.debug) console.log(\"Destroying \", this._ReactSurface.name);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(this.el.lastChild);\n    }\n  }; // CSR Hook. (client side render)\n\n  var ClientSideRender = {\n    mounted: function mounted() {\n      var _extractAttrs5 = extractAttrs(this.el),\n          _extractAttrs6 = _slicedToArray(_extractAttrs5, 2),\n          compName = _extractAttrs6[0],\n          newProps = _extractAttrs6[1];\n\n      if (opts.debug) console.log(\"render mounted \", [compName, newProps]);\n      if (!components[compName]) throw \"Component with name \".concat(compName, \" not provided via component param\");\n      var handleEvent = this.handleEvent.bind(this);\n      var pushEvent = this.pushEvent.bind(this);\n      var pushEventTo = this.pushEventTo.bind(this);\n      this._ReactSurface = {\n        name: compName,\n        contextProps: {\n          handleEvent: handleEvent,\n          pushEvent: pushEvent,\n          pushEventTo: pushEventTo\n        },\n        props: newProps\n      }; // not sure if this should be a react-surface concern or if this should be something the user should be aware of. (when using react lazy + suspense)\n      // when this is a full client side render - check if it is lazy, and add a suspense fallback\n\n      this._ReactSurface.all = components[compName].$$typeof && String(components[compName].$$typeof).includes(\"lazy\") ? [[components[compName], this._ReactSurface.props], [react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"], {\n        fallback: fallback\n      }], [LiveContextProvider, this._ReactSurface.contextProps]] : [[components[compName], this._ReactSurface.props], [LiveContextProvider, this._ReactSurface.contextProps]]; // this is the only place we are fully rendering the react component\n      // all other ReactDOM calls should be to hydrate the already mounted react component.\n\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n    updated: function updated() {\n      var _extractAttrs7 = extractAttrs(this.el),\n          _extractAttrs8 = _slicedToArray(_extractAttrs7, 2),\n          compName = _extractAttrs8[0],\n          newProps = _extractAttrs8[1];\n\n      if (opts.debug) console.log(\"updated \", [compName, newProps]);\n      var name = this._ReactSurface.name;\n      if (compName !== name) console.warn(\"Previous component differs from updated component\");\n      this._ReactSurface.name = compName;\n      this._ReactSurface.props = newProps;\n      this._ReactSurface.all[0][1] = this._ReactSurface.props;\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n    destroyed: function destroyed() {\n      if (opts.debug) console.log(\"Destroying \", this._ReactSurface.name);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(this.el.lastChild);\n    }\n  }; // return the created hook\n\n  return {\n    __RSH: ClientSideHydrate,\n    __RSR: ClientSideRender\n  };\n} // [component, props]\n\n/**\n * Accepts a list of component + prop `tuples` and generates a react tree\n * Used for wrapping a user supplied component in n providers.\n * ```\n * <3>\n *  <2>\n *   <1/>\n *  </2>\n * </3>\n * ```\n *\n * @param {[[String, Object]]} components\n */\n\nfunction reduceComponents(components) {\n  return components.reduce(function (acc, _ref2) {\n    var _ref3 = _slicedToArray(_ref2, 2),\n        comp = _ref3[0],\n        _ref3$ = _ref3[1],\n        props = _ref3$ === void 0 ? {} : _ref3$;\n\n    if (acc === null) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(comp, props);\n    } else {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(comp, props, acc);\n    }\n  }, null);\n} // grab component name, and encoded component props from element attributes, and returns the decoded tuple [component, props]\n\n\nfunction extractAttrs(el) {\n  var name = el.attributes[COMP_ATTR].value;\n  var encodedProps = el.attributes[PROP_ATTR].value;\n  return [name, JSON.parse(atob(encodedProps))];\n}\n\n//# sourceURL=webpack://react-surface/./js/react-surface.js?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://react-surface/external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22,%22amd%22:%22React%22,%22root%22:%22React%22%7D?");

/***/ }),

/***/ "react-dom":
/*!****************************************************************************************************!*\
  !*** external {"commonjs":"react-dom","commonjs2":"react-dom","amd":"ReactDOM","root":"ReactDOM"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;\n\n//# sourceURL=webpack://react-surface/external_%7B%22commonjs%22:%22react-dom%22,%22commonjs2%22:%22react-dom%22,%22amd%22:%22ReactDOM%22,%22root%22:%22ReactDOM%22%7D?");

/***/ })

/******/ });
});