// var autoprefixer = require('autoprefixer')
// var cssCustomProperties = require('postcss-custom-properties')
// var postcssCalc = require('postcss-calc')
// 
// module.exports = {
//   plugins: [
//     autoprefixer(),
//     cssCustomProperties(),
//     postcssCalc()
//   ]
// }

// http://cssnext.io/features/

module.exports = {
  use: [
    'postcss-import',
    'postcss-url',
    'postcss-cssnext',
    'postcss-browser-reporter',
    'postcss-reporter',
  ]
};
