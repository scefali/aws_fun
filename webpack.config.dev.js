let webpack = require('webpack');
let path = require('path');


module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './')
    },
    entry: [
        path.join(__dirname, './src/index.jsx')
    ],
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src')],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] }
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                loader: 'url-loader',
                query: { name: '[name].[hash:16].[ext]' }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    output: {
        filename: 'static/js/bundle.js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__DEV__': true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}