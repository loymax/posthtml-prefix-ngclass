'use strict';

const prefixNgClass = require('./set-prefix');

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
