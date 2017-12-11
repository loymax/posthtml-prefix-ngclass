(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["prefixNgClass"] = factory();
	else
		root["prefixNgClass"] = factory();
})(this, function() {
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
var prefixNgClass = __webpack_require__(1);

var set = exports.set = function set() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return html.replace(/ng-class=\"(.*?)\"|ng-class=\'(.*?)\'/g, function (match) {
        var value = match.replace('ng-class=', '');
        var quote = value[0];
        value = value.slice(1, -1);
        return 'ng-class=' + quote + prefixNgClass.init(value, options) + quote;
    });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var options = void 0;

var defaultOptions = {
    ignore: [],
    prefix: ''
};

var isOneTimeBinding = function isOneTimeBinding(expression) {
    return expression.startsWith("::");
};

var isObject = function isObject(expression) {
    return expression.charAt(0) === "{" && expression.charAt(expression.length - 1) === "}";
};

var isArray = function isArray(expression) {
    return expression.charAt(0) === "[" && expression.charAt(expression.length - 1) === "]";
};

var isTernary = function isTernary(expression) {
    if (expression.indexOf("?") === -1) {
        return false;
    }

    return expression.indexOf("?") < expression.indexOf(":");
};

var isKeyValue = function isKeyValue(expression) {
    return expression.indexOf("?") === -1 && expression.indexOf(":") > -1;
};

var isString = function isString(expression) {
    var countOfApostrophe = (expression.match(/[\',\",\`]/g) || []).length;
    var countOfPlus = (expression.match(/\+/g) || []).length;

    return ["\"", "'", "`"].indexOf(expression.charAt(0)) > -1 && ["\"", "'", "`"].indexOf(expression.charAt(expression.length - 1)) && countOfApostrophe / 2 - 1 === countOfPlus;
};

var setPrefixForObject = function setPrefixForObject(expression) {
    return expression.split(",").map(function (item) {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        } else if (isKeyValue(item)) {
            return setPrefixForKeyValue(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

var setPrefixForArray = function setPrefixForArray(expression) {
    return expression.split(",").map(function (item) {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

var setPrefixForTernary = function setPrefixForTernary(expression) {
    var condition = expression.substr(0, expression.indexOf('?')).trim();
    var expr1 = expression.substring(expression.indexOf("?") + 1).split(":")[0].trim();
    var expr2 = expression.substring(expression.indexOf("?") + 1).split(":")[1].trim();

    return condition + ' ? ' + setPrefix(expr1) + ' : ' + setPrefix(expr2);
};

var setPrefixForKeyValue = function setPrefixForKeyValue(expression) {
    return setPrefixForExpression(expression.split(":")[0].trim()) + ":" + expression.split(":")[1];
};

var setPrefixForExpression = function setPrefixForExpression(expression) {
    if (isString(expression)) {
        return setPrefixForString(expression);
    }

    return options.prefix ? '\'' + options.prefix + '\'+' + expression : expression;
};

var setPrefixForString = function setPrefixForString(string) {
    var newClassName = string.slice(1, -1).replace(/\s\s+/g, ' ').split(" ").map(function (item) {
        if (options.ignore.indexOf(item) !== -1) {
            return item;
        }

        return item.length ? '' + options.prefix + item : '';
    }).join(" ");

    return string.charAt(0) + newClassName + string.charAt(string.length - 1);
};

var setPrefix = function setPrefix(ngClass) {
    ngClass = ngClass.trim();

    var newNgClass = "";

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

var init = exports.init = function init(ngClass, userOptions) {
    options = _extends({}, defaultOptions, userOptions);

    if (typeof options.ignore === 'string') {
        options.ignore = [options.ignore];
    }

    var result = setPrefix(ngClass);

    options = defaultOptions;

    return result;
};

/***/ })
/******/ ]);
});