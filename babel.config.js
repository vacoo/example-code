module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
      [
          'module-resolver',
          {
              root: ['./src'],
              extensions: ['.tsx'],
              alias: {
                  '@root': './',
                  '@assets': './src/assets',
                  '@components': './src/components',
                  '@resources': './src/resources',
                  '@containers': './src/containers',
              },
          },
      ],
      ['transform-inline-environment-variables'],
    //   ['babel-plugin-transform-remove-console'],
      [
          require('@babel/plugin-proposal-decorators').default,
          {
              legacy: true,
          },
      ],
  ],
};
