const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'src/index.html' },
            { from: 'src/css/style.css', to: 'css/' },
            { from: 'src/components/Reel/images/slot.png', to: 'images/' },
            { from: 'src/images/winLine.png', to: 'images/' },
            { from: 'src/images/background.png', to: 'images/' },
            { from: 'src/components/PlayButton/images/spin.png', to: 'images/' },
            { from: 'src/components/BetButtons/images/left/leftArrow.png', to: 'images/' },
            { from: 'src/components/BetButtons/images/right/rightArrow.png', to: 'images/' },
        ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true
    },
    optimization: {
        minimize: !isDev
      }
};

module.exports = config;
