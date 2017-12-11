module.exports =
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const prefixNgClass = __webpack_require__(1);

module.exports = function (options) {
    return function posthtmlPrefixNgClass(tree) {
        return tree.walk(function (node) {
            const attrs = node.attrs || false;
            const ngClassName = attrs["ng-class"];

            if (!ngClassName) {
                return node;
            }

            node.attrs["ng-class"] = prefixNgClass.init(ngClassName, options);

            return node;
        });
    };
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let options;

const defaultOptions = {
    ignore: [],
    prefix: ''
};

const isOneTimeBinding = expression => {
    return expression.startsWith("::");
};

const isObject = expression => {
    return expression.charAt(0) === "{" && expression.charAt(expression.length - 1) === "}";
};

const isArray = expression => {
    return expression.charAt(0) === "[" && expression.charAt(expression.length - 1) === "]";
};

const isTernary = expression => {
    if (expression.indexOf("?") === -1) {
        return false;
    }

    return expression.indexOf("?") < expression.indexOf(":");
};

const isKeyValue = expression => {
    return expression.indexOf("?") === -1 && expression.indexOf(":") > -1;
};

const isString = expression => {
    const countOfApostrophe = (expression.match(/[\',\",\`]/g) || []).length;
    const countOfPlus = (expression.match(/\+/g) || []).length;

    return ["\"", "'", "`"].indexOf(expression.charAt(0)) > -1 && ["\"", "'", "`"].indexOf(expression.charAt(expression.length - 1)) && countOfApostrophe / 2 - 1 === countOfPlus;
};

const setPrefixForObject = expression => {
    return expression.split(",").map(item => {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        } else if (isKeyValue(item)) {
            return setPrefixForKeyValue(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

const setPrefixForArray = expression => {
    return expression.split(",").map(item => {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

const setPrefixForTernary = expression => {
    const condition = expression.substr(0, expression.indexOf('?')).trim();
    const expr1 = expression.substring(expression.indexOf("?") + 1).split(":")[0].trim();
    const expr2 = expression.substring(expression.indexOf("?") + 1).split(":")[1].trim();

    return `${condition} ? ${setPrefix(expr1)} : ${setPrefix(expr2)}`;
};

const setPrefixForKeyValue = expression => {
    return setPrefixForExpression(expression.split(":")[0].trim()) + ":" + expression.split(":")[1];
};

const setPrefixForExpression = expression => {
    if (isString(expression)) {
        return setPrefixForString(expression);
    }

    return options.prefix ? `\'${options.prefix}\'+${expression}` : expression;
};

const setPrefixForString = string => {
    const newClassName = string.slice(1, -1).replace(/\s\s+/g, ' ').split(" ").map(item => {
        if (options.ignore.indexOf(item) !== -1) {
            return item;
        }

        return item.length ? `${options.prefix}${item}` : '';
    }).join(" ");

    return string.charAt(0) + newClassName + string.charAt(string.length - 1);
};

const setPrefix = ngClass => {
    ngClass = ngClass.trim();

    let newNgClass = "";

    if (isOneTimeBinding(ngClass)) {
        newNgClass += "::";
        ngClass = ngClass.replace("::", "").trim();
    }

    if (isObject(ngClass)) {
        ngClass = ngClass.slice(1, -1);
        newNgClass += "{" + setPrefixForObject(ngClass) + "}";
    } else if (isArray(ngClass)) {
        ngClass = ngClass.slice(1, -1);
        newNgClass += "[" + setPrefixForArray(ngClass) + "]";
    } else if (isTernary(ngClass)) {
        newNgClass += setPrefixForTernary(ngClass);
    } else if (isKeyValue(ngClass)) {
        newNgClass += setPrefixForKeyValue(ngClass);
    } else {
        newNgClass += setPrefixForExpression(ngClass);
    }

    return newNgClass;
};

const init = (ngClass, userOptions) => {
    options = _extends({}, defaultOptions, userOptions);

    if (typeof options.ignore === 'string') {
        options.ignore = [options.ignore];
    }

    const result = setPrefix(ngClass);

    options = defaultOptions;

    return result;
};
/* harmony export (immutable) */ __webpack_exports__["init"] = init;


/***/ })
/******/ ]);