module.exports = {
    root: true,
    env: {
        es2020: true,
        node: true,
        mocha: true,
        es6: true,
    },
    globals: {
        browser: true,
        driver: true,
        $: true,
    },
    extends: ['prettier'],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
};
