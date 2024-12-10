module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        'src/db/*',
    ]
};