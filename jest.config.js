module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "moduleDirectories": [
        'node_modules', 'src'
    ],
    "testMatch": [
        "**/__tests__/test/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: 'node',
}