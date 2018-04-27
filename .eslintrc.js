// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue',
    'eslint-comments',
    'compat',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'request', // for interceptors
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // custom settings not included to default template

    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'import/newline-after-import': 'error',
    'import/no-named-as-default-member': 'off',
    'no-plusplus': 'off',
    'max-params': ['error', 3],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always'],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
        'ArrowFunctionExpression': true,
        'FunctionExpression': true
      }
    }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': ['const', 'let', 'var'],
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': ['const', 'let', 'var']
      },
      {
        'blankLine': 'any',
        'prev': ['const', 'let', 'var'],
        'next': ['const', 'let', 'var']
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': ['case', 'default']
      },
      {
        'blankLine': 'always',
        'prev': ['const', 'let', 'var', 'block', 'block-like'],
        'next': ['block', 'block-like']
      },
      {
        'blankLine': 'always',
        'prev': 'directive',
        'next': '*'
      },
      {
        'blankLine': 'any',
        'prev': 'directive',
        'next': 'directive'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      }
    ],
    'no-bitwise': ['error', { 'int32Hint': true }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'dot-location': ['error', 'property'],
    'object-property-newline': 'error',
    'max-len': ['error',
      {
        'code': 80,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
      }
    ],
    'no-shadow': 'off',
    'array-bracket-spacing': ['error',
      'always',
      {
        'singleValue': false,
      }
    ],
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
    // browser compatibility error
    // Use caniuse and @kangax's compat table for determining coverage
    'compat/compat': 'error',
    // vuejs
    'vue/max-attributes-per-line': [2,
      {
        'singleline': 1,
        'multiline': {
          'max': 1,
          'allowFirstLine': true
        }
      }
    ],
  }
}
