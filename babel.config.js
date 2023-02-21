module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src',
        },
      },
    ],
    ['module:react-native-dotenv',
      {
        'envName': 'APP_ENV',
        'moduleName': '@env',
        'path': '.env',
        'safe': false,
        'allowUndefined': true,
        'verbose': false
      }
    ]
  ],
};
