(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mapState"] = factory();
	else
		root["mapState"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var identity = function identity(value) {
	  return value;
	};

	var nullReducer = function nullReducer(state) {
	  return typeof state === 'undefined' ? null : state;
	};

	/**
	 * Creates a reducer wrapper which maps state before and after passing to a
	 * reducer, but does it only for passed action types.
	 * @param {function} [mapStateBefore=identity]
	 *   A function with signature: (stateBefore) => newStateBefore, where
	 *   stateBefore is the original state, newStateBefore is passed to the reducer.
	 * @param {function} [mapStateAfter=identity]
	 *   A function with signature: (stateAfter) => newStateAfter, where
	 *   stateAfter is returned by the reducer, newStateAfter is returned to the store.
	 * @param {[string]} [actionTypes]
	 *   Action types to perform map state. Handles all actions if not provided.
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var withMapStateReducer = function withMapStateReducer() {
	  var mapStateBefore = arguments.length <= 0 || arguments[0] === undefined ? identity : arguments[0];
	  var mapStateAfter = arguments.length <= 1 || arguments[1] === undefined ? identity : arguments[1];
	  var actionTypes = arguments[2];

	  var actionTypesDict = actionTypes && actionTypes.reduce(function (actionType, dict) {
	    return _extends({}, dict, _defineProperty({}, actionType, true));
	  }, {});

	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? nullReducer : arguments[0];
	    return function (state, action) {
	      if (actionTypes && !actionTypesDict[action.type]) {
	        return reducer(state, action);
	      }

	      return mapStateAfter(reducer(mapStateBefore(state), action));
	    };
	  };
	};

	exports.default = withMapStateReducer;

/***/ }
/******/ ])
});
;