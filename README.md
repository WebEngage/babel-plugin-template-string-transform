# babel-plugin-template-string-transform

### Install
```
npm install --save html-minifier cssmin

npm install --save WebEngage/babel-plugin-template-string-transform
```

### Use

build.js
```js
var babel = require('babel-core')

var transformed = babel.transform('code();', {
    plugins: [
        [
            'template-string-transform',
            {
                htmlmin : require('babel-plugin-template-string-transform/transforms/minify-html'),
                cssmin  : require('babel-plugin-template-string-transform/transforms/minify-css')
            }
        ]
    ],
    presets: ['es2015']
})

...
```

source.js
```js
var Layout = {
    getMarkup: function (data) {
        return htmlmin`
          <div id="wrapper">
              <div id="cta">
                  <a href="${data.href}"></a>
              </div>
          </div>
        `
    },
    getStyles: function (data) {
        return cssmin`
            div#cta a {
                color: ${data.linkColor};
            }
        `
    }
}
```
