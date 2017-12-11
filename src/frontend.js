const prefixNgClass = require('./set-prefix');

export const set = (html = '', options = {}) => {
    return html.replace(/ng-class=\"(.*?)\"|ng-class=\'(.*?)\'/g, function (match) {
        let value = match.replace('ng-class=','');
        const quote = value[0];
        value = value.slice(1,-1);
        return `ng-class=${quote}${prefixNgClass.init(value, options)}${quote}`;
    })
};
