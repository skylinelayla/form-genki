
const path = require('path');
const libraryName = 'FormGen';
const fileName = `${libraryName}.js`;

module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    output: {
        filename: fileName,
        path: path.resolve(__dirname, 'dist'),
        library: libraryName,
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    externals: {
      'bootstrap': 'bootstrap'
    },
    module: {
        rules: [
          {
            test: /(\\.jsx|\\.js)$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/
          },
          {
            test: /(\\.jsx|\\.js)$/,
            loader: "eslint-loader",
            exclude: /node_modules/
          },
          {
            test: /\.css$/i,
            loader: ['style-loader', 'css-loader']
          }
        ]
    },
}