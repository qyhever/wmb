/* eslint-env node */
module.exports = {
  parser: 'vue-eslint-parser',
  root: true,
  env: {
    node: true
  },
  globals: {
    defineOptions: true,
    showToast: true
  },
  extends: [
    // 'plugin:vue/vue3-recommended',
    // 'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2
      },
      multiline: {
        max: 1
      }
    }]
  }
}
