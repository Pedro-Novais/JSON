const path = require('path');

module.exports = {
    entry: './public/scripts/relocate.js', // Ponto de entrada do seu aplicativo
    output: {
        filename: 'bundle.js', // Nome do arquivo de saída
        path: path.resolve(__dirname, 'dist'), // Diretório de saída
    },
    mode: 'development', // Modo de desenvolvimento (você pode alterar para 'production' para otimização)
    module: {
        rules: [
            {
                test: /\.js$/, // Aplicar esta regra a todos os arquivos .js
                exclude: /node_modules/, // Exceto os arquivos na pasta node_modules
                use: {
                    loader: 'babel-loader', // Usar babel-loader para transpilar ES6+ para ES5
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};