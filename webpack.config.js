require('dotenv').config()
const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const host = process.env.SERVER_HOST ?? 'localhost';
const port = Number.parseInt(process.env.SERVER_PORT) ?? 8080;
const publicPath = process.env.VERCEL_URL ?? `http://${host}:${port}/`;

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    target: 'web',
    entry: {
        app: [
            './index.tsx'
        ]
    },
    output: {
        filename: '[name]-[contenthash:6].bundle.js',
        path: path.join(__dirname, './build/www'),
        publicPath: publicPath
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.([jt])s(x?)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=img/[name]-[contenthash:6].[ext]',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:6].css',
            chunkFilename: '[id].css'
        }),
        new DotenvWebpackPlugin({
            path: '.env'
        }),
    ],
    devServer: {
        port,
        host,
        static: path.resolve(__dirname, 'src')
    },
};
