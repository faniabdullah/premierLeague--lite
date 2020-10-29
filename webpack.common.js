const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
require("babel-core/register");
require("babel-polyfill");

module.exports = {
   entry: ['babel-polyfill',  './src/index.js'],
   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js"
   },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   {
                       loader: "style-loader"
                   },
                   {
                       loader: "css-loader"
                   }
               ]
           },
           {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                },
            ]
        },
           {
             test: /\.(png|jpe?g|gif)$/i,
               use : [
                   {
                       loader : 'file-loader',
                       options : {
                           name:'[name].[ext]',
                           outputPath : 'images/',
                           publicPath : 'images/'
                       }
                   }
               ]
           },
           
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: "./src/index.html",
           filename: "index.html"
       }),
       new HtmlWebpackPlugin({
        template: "./src/match.html",
        filename: "match.html"
    }),
    new HtmlWebpackPlugin({
        template: "./src/team.html",
        filename: "team.html"
    }),
    new HtmlWebpackPlugin({
        filename: './pages/home.html',
        template: __dirname + '/src/pages/home.html',
        chunks: [],
        path:'../'
    }),
    new HtmlWebpackPlugin({
        filename: './pages/favorite.html',
        template: __dirname + '/src/pages/favorite.html',
        chunks: [],
        path:'../'
    }),
    new HtmlWebpackPlugin({
        filename: './pages/teams.html',
        template: __dirname + '/src/pages/teams.html',
        chunks: [],
        path:'../'
    }),
    new HtmlWebpackPlugin({
        template: './src/nav-mobile.html',
        filename: 'nav-mobile.html',
        chunks: [],
        path:'../'
    }),
    new HtmlWebpackPlugin({
        template: "./src/top-nav.html",
        filename: "top-nav.html",
        chunks: [],
        path:'../'
    }),
    new WorkboxPlugin.InjectManifest({
        swSrc: './src/service-worker.js',
        swDest : 'service-worker.js'
      }),
    new WebpackPwaManifest({
        filename: "manifest.json",
        name: 'Premier League Lite',
        display: "standalone",
        start_url: "/index.html",
        short_name: 'PremierLeague',
        description: 'A litte information Premier Leaguea!',
        background_color: "#37003c",
        theme_color: "#37003c",
        gcm_sender_id: "1026050796962",
        crossorigin: null,
        inject: true,
        fingerprints: false,
        ios: false,
        publicPath: null,
        includeDirectory: true,
        icons: [
          {
            src: path.resolve( 'src/images/icon.png'),
            sizes: [72 , 96, 128, 144, 192, 256, 384, 512] ,
            purpose: 'any maskable',
            destination: path.join('images')
          }
        ]
      })
]
}