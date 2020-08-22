const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        lk: ["@babel/polyfill", "./src/index"],
        admin: ["@babel/polyfill", "./src/admin"],
        message: ["@babel/polyfill", "./src/message"],
        maintenance: ["@babel/polyfill", "./src/maintenance"],
    },
    devtool: "source-map",
    devServer: {
        disableHostCheck: true,
        port: 80,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: "/index.html" },
                { from: /^\/admin/, to: "/admin.html" },
                { from: /^\/message/, to: "/message.html" },
                { from: /^\/maintenance/, to: "/maintenance.html" },
            ],
        },
        hot: true,
    },
    output: {
        filename: "[name]/bundle.js?v=[hash]",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "eslint-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                },
                // include: "/fonts/",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: "body",
            favicon: "./src/js/assets/icons/favicon/favicon.ico",
            chunks: ["lk"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/admin.html",
            filename: "./admin.html",
            inject: "body",
            favicon: "./src/js/assets/icons/favicon/favicon.ico",
            chunks: ["admin"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/message.html",
            filename: "./message.html",
            inject: "body",
            favicon: "./src/js/assets/icons/favicon/favicon.ico",
            chunks: ["message"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/maintenance.html",
            filename: "./maintenance.html",
            inject: "body",
            favicon: "./src/js/assets/icons/favicon/favicon.ico",
            chunks: ["maintenance"],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanTerminalPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin([{ from: "./src/js/assets/files/", to: "./" }]),
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/js/components/"),
            modules: path.resolve(__dirname, "src/js/modules/"),
            containers: path.resolve(__dirname, "src/js/containers/"),
            pages: path.resolve(__dirname, "src/js/pages/"),
            reducers: path.resolve(__dirname, "src/js/reducers/"),
            routes: path.resolve(__dirname, "src/js/routes/"),
            store: path.resolve(__dirname, "src/js/store/"),
            config: path.resolve(__dirname, "src/js/config/"),
            actions: path.resolve(__dirname, "src/js/actions/"),
            utils: path.resolve(__dirname, "src/js/utils/"),
            middleware: path.resolve(__dirname, "src/js/middleware/"),
            icons: path.resolve(__dirname, "src/js/assets/icons/"),
            fonts: path.resolve(__dirname, "src/js/assets/fonts/"),
            images: path.resolve(__dirname, "src/js/assets/images/"),
            decorators: path.resolve(__dirname, "src/js/decorators/"),
            wrappers: path.resolve(__dirname, "src/js/wrappers/"),
            styledMixins: path.resolve(__dirname, "src/js/styledMixins/"),
            scss: path.resolve(__dirname, "src/js/scss/"),
        },
    },
};
