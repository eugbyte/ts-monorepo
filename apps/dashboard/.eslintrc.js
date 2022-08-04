module.exports = {
    extends: ["../../.eslintrc.js"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
    ignorePatterns: [
        "service-worker.js"
    ]
};
