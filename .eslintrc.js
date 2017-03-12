module.exports = {
    "env": {
        "browser":    true,
        "amd":        true,
        "node":       true,
        "es6":        true
    },

    "globals": {
        "define":     false,
        "require":    true,

        "alert":      true,
        "console":    true,
        "module":     true,

        "describe":   true,
        "it":         true,
        "before":     true,
        "beforeEach": true,
        "after":      true,
        "afterEach":  true,
        "expect":     true,
        "should":     true,

        "sinon":      true,

        "Promise":    true, // allow possibly overwriting Promise
    },

    "parserOptions": {
        "ecmaVersion": 6
    },

    // 0 = off, 1 = warning (doesn't affect exit code), 2 = error
    "rules": {
        "array-bracket-spacing": [2, "never"],
        "arrow-parens":         [2, "as-needed"],
        "camelcase":            [2, {"properties": "never"}],
        "comma-style":          [2, "last"],
        "curly":                [2, "all"],
        "dot-notation":         0, // allow obj['somePropertyName']
        "eol-last":             2,
        "indent":               [2, 4, { "SwitchCase": 1 }],
        "key-spacing":          0,
        "keyword-spacing":      [2, { "before": true, "after": true }],
        "linebreak-style":      [2, "unix"],
        "max-len":              [2, 120, { "ignoreComments": true, "ignoreUrls": true }],
        "new-cap":              0, // do not require 'new' keyword, allows i.e. "var promise = $.Deferred()"
        "no-alert":             2, // disencourage alert() and confirm()
        "no-console":           0,
        "no-extra-parens":      [2, "functions"],
        "no-implicit-coercion": [2, { "boolean": false, "string": true, "number": false }],
        "no-mixed-spaces-and-tabs": 2,
        "no-multi-spaces":      0,
        "no-multi-str":         2,
        "no-multiple-empty-lines": 2,
        "no-nested-ternary":    2,
        "no-new":               0,
        "no-spaced-func":       2,
        "no-undef":             2,
        "no-shadow":            2,
        "no-trailing-spaces":   2,
        "no-underscore-dangle": 0, // allow _variableName
        "no-unused-vars":       [2, { "vars": "all", "args": "none" }],
        "object-curly-spacing": [2, "always", { "objectsInObjects": false, "arraysInObjects": true }],
        "operator-linebreak":   [2, "after"],
        "prefer-const":         0, // enable when possible
        "quotes":               [2, "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "semi":                 [2, "always"],
        "semi-spacing":         [2, { "before": false, "after": true }],
        "space-before-blocks":  [2, "always"],
        "space-infix-ops":      2,
        "space-unary-ops":      [2, { "nonwords": false, "overrides": {} }],
        "space-before-function-paren": [2, "never"],
        "space-in-parens":      [2, "never"],
        "strict":               0
    }
};
