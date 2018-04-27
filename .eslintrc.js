const path = require('path');
const resourcesDir = path.resolve(__dirname, 'resources/assets');
const formatter = require('eslint-friendly-formatter');


module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jquery: true,
  },

  extends: 'airbnb-base',
// required to lint *.vue files
  plugins: [
    'html'
  ],
// check if imports actually resolve
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "modules": [resourcesDir + 'vues', resourcesDir + 'js', "node_modules"],
            "alias": {
              "vues" : resourcesDir + '/vues/',
              "js" : resourcesDir + '/js/',
            }
          },
          module: {
            rules: [
              {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resourcesDir],
                options: {
                  formatter: formatter
                }
              }
            ]
          },
        }
      }
    }
  },
// add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ["error", { "props": false }]
  }
}
