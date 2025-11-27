import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
type mode = "development" | "production"

interface IEnvVariables {
    mode: mode
}

export default (env: IEnvVariables) => {
    const config: webpack.Configuration = {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public','index.html')}),
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: {
            port: 5000,
            open: true,

        }
    }
    return config
};