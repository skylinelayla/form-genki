/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_forms_input__ = __webpack_require__(1);
/**
 * @file index
 * @author skykun
 */


(function (window) {
    // const container  = document.getElementById('form-container');
    // if (!container) {
    //     throw new Error('please check container is provided');
    // }
    window.FormGen = {
        input: __WEBPACK_IMPORTED_MODULE_0__core_forms_input__["a" /* default */]
    };
})(window)

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__form__ = __webpack_require__(2);
/**
 * @file input file
 * @author skykun
 */


class Input {

    constructor(data) {
        this.data = data;
        this.container = document.getElementById('form-container');
        if (!this.container) {
            throw new Error('please check container');
        }
    }

    
    /**
     * @override
     */
    getHtml() {
        return `<input for="${this.data.label}" type="${this.data.type}" id="${this.data.uuid}" name="${this.data.name}">`;
    }

    getData() {
    }

    mount() {
        this.container.innerHTML = this.getHtml();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file form base class
 * @author skykun
 */

class Form {
    constructor(data) {
        this.metaData = data;
    }
    /** render form */
    render() {
        this.mount();
    }
    /** mount dom in container */
    mount() {
    }
    /** value validation */
    checkValue() {

    }
    /** get form value */
    getValue() {

    }
    /** refresh form dom */
    refresh() {
    }
    /** set defaultValue for form */
    setValue() {
    }
    /** get form html */
    getHtml() {
    }
}
/* unused harmony export default */



/***/ })
/******/ ]);
//# sourceMappingURL=FormGen.js.map