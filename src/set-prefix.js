'use strict';

let options;

const defaultOptions = {
    ignore: [],
    prefix: ''
};

const isOneTimeBinding = (expression) => {
    return expression.startsWith("::");
};

const isObject = (expression) => {
    return expression.charAt(0) === "{" && expression.charAt(expression.length - 1) === "}";
};

const isArray = (expression) => {
    return expression.charAt(0) === "[" && expression.charAt(expression.length - 1) === "]";
};

const isTernary = (expression) => {
    if (expression.indexOf("?") === -1) {
        return false;
    }

    return expression.indexOf("?") < expression.indexOf(":");
};

const isKeyValue = (expression) => {
    return (expression.indexOf("?") === -1) && (expression.indexOf(":") > -1);
};

const isString = (expression) => {
    const countOfApostrophe = (expression.match(/[\',\",\`]/g) || []).length;
    const countOfPlus = (expression.match(/\+/g) || []).length;

    return (["\"", "'", "`"].indexOf(expression.charAt(0)) > -1 && ["\"", "'", "`"].indexOf(expression.charAt(expression.length - 1))) && countOfApostrophe / 2 - 1 === countOfPlus;
};

const setPrefixForObject = (expression) => {
    return expression.split(",").map((item) => {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        } else if (isKeyValue(item)) {
            return setPrefixForKeyValue(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

const setPrefixForArray = (expression) => {
    return expression.split(",").map((item) => {
        item = item.trim();

        if (isTernary(item)) {
            return setPrefixForTernary(item);
        }

        return setPrefixForExpression(item);
    }).join(",");
};

const setPrefixForTernary = (expression) => {
    const condition = expression.substr(0, expression.indexOf('?')).trim();
    const expr1 = expression.substring(expression.indexOf("?") + 1).split(":")[0].trim();
    const expr2 = expression.substring(expression.indexOf("?") + 1).split(":")[1].trim();

    return `${condition} ? ${setPrefix(expr1)} : ${setPrefix(expr2)}`;
};

const setPrefixForKeyValue = (expression) => {
    return setPrefixForExpression(expression.split(":")[0].trim()) + ":" + expression.split(":")[1];
};

const setPrefixForExpression = (expression) => {
    if (isString(expression)) {
        return setPrefixForString(expression);
    }

    return options.prefix ? `\'${options.prefix}\'+${expression}` : expression;
};

const setPrefixForString = (string) => {
    const newClassName = string.slice(1,-1).replace(/\s\s+/g, ' ').split(" ").map((item) => {
        if (options.ignore.indexOf(item) !== -1) {
            return item;
        }

        return item.length ? `${options.prefix}${item}` : '';
    }).join(" ");

    return string.charAt(0) + newClassName + string.charAt(string.length - 1);
};

const setPrefix = (ngClass) => {
    ngClass = ngClass.trim();

    let newNgClass = "";

    if (isOneTimeBinding(ngClass)) {
        newNgClass += "::";
        ngClass = ngClass.replace("::","").trim();
    }

    if (isObject(ngClass)) {
        ngClass = ngClass.slice(1,-1);
        newNgClass += "{" + setPrefixForObject(ngClass) + "}";
    } else if (isArray(ngClass)) {
        ngClass = ngClass.slice(1,-1);
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

export const init = (ngClass, userOptions) => {
    options = {...defaultOptions, ...userOptions};

    if (typeof options.ignore === 'string') {
        options.ignore = [options.ignore];
    }

    const result = setPrefix(ngClass);

    options = defaultOptions;

    return result;
};
