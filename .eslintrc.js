module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",4
        ],
        "linebreak-style": [
            "error",
            "unix" 
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": ["warn", { "vars": "all", "args": "all", "ignoreRestSiblings": false }]
    }
};