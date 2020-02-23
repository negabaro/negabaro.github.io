var hoge = {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [
        {
            loader: "url-loader",
            options: {
                limit: 1000,
                name: "[path][name].[ext]"
            }
        }
    ]
};
console.log(hoge.use[0]);
