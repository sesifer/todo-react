module.exports = {
    parser: "@typescript-eslint/parser", //handle typescript
    parserOptions: {
        ecmaVersion: 2020,      // Use the latest ecmascript standard
        sourceType: "module",   // Allows using import/export statements
        ecmaFeatures: {
            jsx: true           // Enable JSX
        }
    },
    settings: {
        react: {
            version: "detect"   // Automatically detect the react version
        },
        "import/resolver": {
            "node": true,
            "eslint-import-resolver-typescript": true,
            "typescript": {}
        }
    },
    env: {
        browser: true,          // Enables browser globals like window and document
        amd: true,              // Enables require() and define() as global variables as per the amd spec.
        node: true,             // Enables Node.js global variables and Node.js scoping.
        es6: true
    },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": [
            "error",
            {
                components: ["Link"],
                specialLink: ["hrefLeft", "hrefRight"],
                aspects: ["invalidHref", "preferButton"]
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {
            "vars": "all",
            "args": "after-used",
            "argsIgnorePattern": "^_"
        }],
        "react/prop-types": "off",
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "semi": ["warn", "always"],
        "quotes": ["warn", "double", "avoid-escape"],
        "max-len": ["warn", 120, 4],
        "import/extensions": [0, "never", {"ts": "never"}],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
};