module.exports = {
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "rootDir": "",
    "testMatch": [
        "**/*.spec.ts",
        "**/*.test.ts"
    ],
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@test/(.*)$": "<rootDir>/test/$1"
    }
}