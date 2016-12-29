module.exports = {
    entry: './src/ChainableUrl.js',
    output: {
        filename: 'ChainableUrl-bundled.js',
        path: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};