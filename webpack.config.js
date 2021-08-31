
const path = require('path');
const libraryName = 'FormGen';
const fileName = `${libraryName}.js`;

module.exports = {
    entry: './index.ts',
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: fileName,
        path: path.resolve(__dirname, 'dist'),
        library: libraryName,
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    optimization: {
      minimize: true,
    },
    externals: {
      'bootstrap': 'bootstrap'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
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
            loader: 'eslint-loader',
            exclude: /node_modules/
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/i,
            loader: ['style-loader', 'css-loader']
          },
          {
            test: /\.svg/,
            loader: 'raw-loader'
          }
        ]
    },
}