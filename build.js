const path = require('path');
const webpack = require('webpack');

const config = {
    frontend: {
        entry: './src/frontend.js',
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'posthtml-prefix-ngclass.frontend.js',
            libraryTarget: "umd",
            library: 'prefixNgClass'
        },
        module: {
            loaders: [{
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["add-module-exports", 'transform-object-rest-spread']
                }
            }]
        }
    },
    backend: {
        entry: './src/backend.js',
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'posthtml-prefix-ngclass.backend.js',
            libraryTarget: 'commonjs2'
        },
        module: {
            loaders: [{
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-object-rest-spread']
                }
            }]
        }
    }
};

const frontend = webpack(config.frontend);
const backend = webpack(config.backend);

frontend.run(function (err, stats) {});
backend.run(function (err, stats) {});
