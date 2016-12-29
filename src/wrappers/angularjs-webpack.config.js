module.exports = {
    entry: './src/wrappers/httpfluent-angular.js',
    output: {
        filename: 'httpfluent-angular-bundled.js',
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