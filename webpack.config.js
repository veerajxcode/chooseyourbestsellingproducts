/**
 * Webpack configuration.
 */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

// JS Directory path.
const JS_DIR = path.resolve(__dirname, 'assets/src/js');
const IMG_DIR = path.resolve(__dirname, 'assets/src/img');
const BUILD_DIR = path.resolve(__dirname, 'assets/build');

const entry = {
    blocks: JS_DIR + '/blocks.js',
};

const output = {
    path: BUILD_DIR,
    filename: 'js/[name].js',
};

/**
 * Note: argv.mode will return 'development' or 'production'.
 */
const plugins = (argv) => [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: 'production' === argv.mode, // Automatically remove all unused webpack assets on rebuild, in production.
    }),

    new DependencyExtractionWebpackPlugin({
        injectPolyfill: true,
        combineAssets: true,
    }),
];

const rules = [
    {
        test: /\.js$/,
        include: [JS_DIR],
        exclude: /node_modules/,
        use: 'babel-loader',
    },

    {
        test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]',
                publicPath: process.env.NODE_ENV === 'production' ? '../' : '../../',
            },
        },
    },
    {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [IMG_DIR, /node_modules/],
        use: {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                publicPath: process.env.NODE_ENV === 'production' ? '../' : '../../',
            },
        },
    },
];


module.exports = (env, argv) => ({
    entry: entry,

    output: output,

    /**
     * A full SourceMap is emitted as a separate file ( e.g.  main.js.map )
     * It adds a reference comment to the bundle so development tools know where to find it.
     * set this to false if you don't need it
     */
    devtool: 'source-map',

    module: {
        rules: rules,
    },

    plugins: plugins(argv),

    externals: {
        jquery: 'jQuery',
    },
});
