module.exports = {
  entry: './src/server.ts',
  output: {
    filename: 'bundle.[hash].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['js', 'jsx', 'ts', 'tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: ['/node_modules/', '/src/test/'],
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(html)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'html-loder',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.(svg)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'file-loder',
          options: {
            publicPath: './dist/',
            name: '[name].[ext]?[hash]',
          },
        },
      },
    ],
  },
  // externals: {
  //   react: 'React',
  // },
};
