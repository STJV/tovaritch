module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'collectCoverage': true,
  'collectCoverageFrom': ['src/**/*.{js,vue}'],
  'coverageReporters': ['html', 'text-summary'],
  'watchPathIgnorePatterns': [
    '<rootDir>/node_modules/.*',
    '<rootDir>/coverage/.*'
  ]
}
