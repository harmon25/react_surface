(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["react_surface"] = factory(require("react"), require("react-dom"));
	else
		root["react_surface"] = factory(root["React"], root["ReactDOM"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/react_surface.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/react_surface.js":
/*!*****************************!*\
  !*** ./js/react_surface.js ***!
  \*****************************/
/*! exports provided: LiveContext, useLiveContext, LiveContextProvider, buildHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveContext\", function() { return LiveContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useLiveContext\", function() { return useLiveContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveContextProvider\", function() { return LiveContextProvider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildHook\", function() { return buildHook; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n\n\nvar COMP_ATTR = \"rs-c\";\nvar PROP_ATTR = \"rs-p\";\nvar defaultOpts = {\n  debug: false,\n  fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Loading...\")\n};\n\nfunction extractAttrs(el) {\n  var name = el.attributes[COMP_ATTR].value;\n  var encodedProps = el.attributes[PROP_ATTR].value;\n  return [name, JSON.parse(atob(encodedProps))];\n} // const elements = document.querySelectorAll(`[${opts.attributeName}]`);\n\n\nvar LiveContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});\nvar useLiveContext = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(LiveContext);\nvar LiveContextProvider = (_ref) => {\n  var {\n    children\n  } = _ref,\n      events = _objectWithoutProperties(_ref, [\"children\"]);\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LiveContext.Provider, {\n    value: events\n  }, children);\n};\nfunction buildHook() {\n  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;\n  opts = _objectSpread(_objectSpread({}, defaultOpts), opts);\n  var {\n    fallback\n  } = opts; // SSR Hook. (hydrate)\n\n  var __RSH = {\n    mounted() {\n      var [compName, initialProps] = extractAttrs(this.el);\n      if (opts.debug) console.log(\"hydrate mounted \", [compName, initialProps]);\n      if (!components[compName]) throw \"Component with name \".concat(compName, \" not provided via component param\");\n      var handleEvent = this.handleEvent.bind(this);\n      var pushEvent = this.pushEvent.bind(this);\n      var pushEventTo = this.pushEventTo.bind(this);\n      this._ReactSurface = {\n        name: compName,\n        contextProps: {\n          handleEvent,\n          pushEvent,\n          pushEventTo\n        },\n        props: initialProps\n      };\n      this._ReactSurface.all = [[components[compName], this._ReactSurface.props], [LiveContextProvider, this._ReactSurface.contextProps]];\n      this._ReactSurface.comp = reduceComponents(this._ReactSurface.all);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(this._ReactSurface.comp, this.el.lastChild);\n    },\n\n    updated() {\n      var [compName, newProps] = extractAttrs(this.el);\n      if (opts.debug) console.log(\"updated \", [compName, newProps]);\n      var {\n        name // renderedCount\n\n      } = this._ReactSurface;\n      if (compName !== name) console.warn(\"Previous component differs from updated component\");\n      this._ReactSurface.name = compName; // this._ReactSurface.renderedCount = renderedCount + 1;\n\n      this._ReactSurface.props = newProps;\n      this._ReactSurface.all[0][1] = this._ReactSurface.props;\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n\n    destroyed() {\n      if (opts.debug) console.log(\"Destroying \", this._ReactSurface.name);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(this.el.lastChild);\n    }\n\n  }; // CSR Hook. (client side render)\n\n  var __RSR = {\n    mounted() {\n      var [compName, newProps] = extractAttrs(this.el);\n      if (opts.debug) console.log(\"render mounted \", [compName, newProps]);\n      if (!components[compName]) throw \"Component with name \".concat(compName, \" not provided via component param\");\n      var handleEvent = this.handleEvent.bind(this);\n      var pushEvent = this.pushEvent.bind(this);\n      var pushEventTo = this.pushEventTo.bind(this);\n      this._ReactSurface = {\n        name: compName,\n        contextProps: {\n          handleEvent,\n          pushEvent,\n          pushEventTo\n        },\n        props: newProps // renderedCount: 1,\n\n      }; // when this is a full client side render - check if it is lazy, and add a suspense fallback\n\n      this._ReactSurface.all = components[compName].$$typeof && String(components[compName].$$typeof).includes(\"lazy\") ? [[components[compName], this._ReactSurface.props], [react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"], {\n        fallback\n      }], [LiveContextProvider, this._ReactSurface.contextProps]] : [[components[compName], this._ReactSurface.props], [LiveContextProvider, this._ReactSurface.contextProps]];\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n\n    updated() {\n      var [compName, newProps] = extractAttrs(this.el);\n      if (opts.debug) console.log(\"updated \", [compName, newProps]);\n      var {\n        name // renderedCount\n\n      } = this._ReactSurface;\n      if (compName !== name) console.warn(\"Previous component differs from updated component\");\n      this._ReactSurface.name = compName; // this._ReactSurface.renderedCount = renderedCount + 1;\n\n      this._ReactSurface.props = newProps;\n      this._ReactSurface.all[0][1] = this._ReactSurface.props;\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(reduceComponents(this._ReactSurface.all), this.el.lastChild);\n    },\n\n    destroyed() {\n      if (opts.debug) console.log(\"Destroying \", this._ReactSurface.name);\n      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(this.el.lastChild);\n    }\n\n  };\n  return {\n    __RSH,\n    __RSR\n  };\n} // [component, props]\n\nfunction reduceComponents(components) {\n  return components.reduce((acc, current) => {\n    var [comp, props = {}] = current;\n\n    if (acc === null) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(comp, props);\n    } else {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(comp, props, acc);\n    }\n  }, null);\n}\n\n//# sourceURL=webpack://react_surface/./js/react_surface.js?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://react_surface/external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22,%22amd%22:%22React%22,%22root%22:%22React%22%7D?");

/***/ }),

/***/ "react-dom":
/*!****************************************************************************************************!*\
  !*** external {"commonjs":"react-dom","commonjs2":"react-dom","amd":"ReactDOM","root":"ReactDOM"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;\n\n//# sourceURL=webpack://react_surface/external_%7B%22commonjs%22:%22react-dom%22,%22commonjs2%22:%22react-dom%22,%22amd%22:%22ReactDOM%22,%22root%22:%22ReactDOM%22%7D?");

/***/ })

/******/ });
});