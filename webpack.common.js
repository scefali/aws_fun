const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src')],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react"]
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name]-styles.css"),
    ],

    devtool: 'source-map',
}