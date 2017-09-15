const expect = require('chai').expect;
const posthtml = require('posthtml');
const posthtmlPrefixNgClass = require('../index');

const config = {
    empty: {},
    withPrefix: {
        prefix: "prefix-"
    },
    ignoreIsString: {
        prefix: "prefix-",
        ignore: "row"
    },
    ignoreIsArray: {
        prefix: "prefix-",
        ignore: ["row"]
    }
};

describe('keyValue', function() {
    const html = `<div ng-class="{'row': !vertical}"></div>`;

    it('empty', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.empty))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'row': !vertical}"></div>`);
            });
    });
    it('withPrefix', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.withPrefix))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'prefix-row': !vertical}"></div>`);
            });
    });
    it('ignoreIsString', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsString))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'row': !vertical}"></div>`);
            });
    });
    it('ignoreIsArray', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsArray))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'row': !vertical}"></div>`);
            });
    });
});

describe('fewKeyValue', function() {
    const html = `<div ng-class="{ 'has-error': model.$submitted && model.$invalid, 'row': vertical }"></div>`;

    it('empty', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.empty))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'has-error': model.$submitted && model.$invalid,'row': vertical}"></div>`);
            });
    });
    it('withPrefix', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.withPrefix))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'prefix-has-error': model.$submitted && model.$invalid,'prefix-row': vertical}"></div>`);
            });
    });
    it('ignoreIsString', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsString))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'prefix-has-error': model.$submitted && model.$invalid,'row': vertical}"></div>`);
            });
    });
    it('ignoreIsArray', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsArray))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="{'prefix-has-error': model.$submitted && model.$invalid,'row': vertical}"></div>`);
            });
    });
});

describe('ternaryWithDoubleColon', function() {
    const html = `<div ng-class="::verticalCentered  ? 'vertical-centered' : 'row'"></div>`;

    it('empty', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.empty))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="::verticalCentered ? 'vertical-centered' : 'row'"></div>`);
            });
    });
    it('withPrefix', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.withPrefix))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="::verticalCentered ? 'prefix-vertical-centered' : 'prefix-row'"></div>`);
            });
    });
    it('ignoreIsString', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsString))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="::verticalCentered ? 'prefix-vertical-centered' : 'row'"></div>`);
            });
    });
    it('ignoreIsArray', function() {
        return posthtml()
            .use(posthtmlPrefixNgClass(config.ignoreIsArray))
            .process(html)
            .then(({html}) => {
                expect(html).to.equal(`<div ng-class="::verticalCentered ? 'prefix-vertical-centered' : 'row'"></div>`);
            });
    });
});

describe('ternaryWithEmptyString', function() {
  const html = `<div ng-class=":: verticalCentered ? 'row' : ''"></div>`;

  it('empty', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.empty))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="::verticalCentered ? 'row' : ''"></div>`);
      });
  });
  it('withPrefix', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.withPrefix))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="::verticalCentered ? 'prefix-row' : ''"></div>`);
      });
  });
  it('ignoreIsString', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsString))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="::verticalCentered ? 'row' : ''"></div>`);
      });
  });
  it('ignoreIsArray', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsArray))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="::verticalCentered ? 'row' : ''"></div>`);
      });
  });
});

describe('ternaryWithVariableInString', function() {
  const html = `<div ng-class="vertical ? 'row' : 'col-sm-'+labelGridPart"></div>`;

  it('empty', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.empty))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="vertical ? 'row' : 'col-sm-'+labelGridPart"></div>`);
      });
  });
  it('withPrefix', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.withPrefix))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="vertical ? 'prefix-row' : 'prefix-'+'col-sm-'+labelGridPart"></div>`);
      });
  });
  it('ignoreIsString', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsString))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="vertical ? 'row' : 'prefix-'+'col-sm-'+labelGridPart"></div>`);
      });
  });
  it('ignoreIsArray', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsArray))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="vertical ? 'row' : 'prefix-'+'col-sm-'+labelGridPart"></div>`);
      });
  });
});

describe('variable', function() {
  const html = `<div ng-class="inputClass"></div>`;

  it('empty', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.empty))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="inputClass"></div>`);
      });
  });
  it('withPrefix', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.withPrefix))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="'prefix-'+inputClass"></div>`);
      });
  });
  it('ignoreIsString', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsString))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="'prefix-'+inputClass"></div>`);
      });
  });
  it('ignoreIsArray', function() {
    return posthtml()
      .use(posthtmlPrefixNgClass(config.ignoreIsArray))
      .process(html)
      .then(({html}) => {
        expect(html).to.equal(`<div ng-class="'prefix-'+inputClass"></div>`);
      });
  });
});
