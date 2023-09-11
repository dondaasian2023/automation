module.exports = {
    presets: [['@babel/preset-env', { targets: { node: '16.17.1' } }]],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: { src: './src', config: './config', variables: './variables' },
            },
        ],
    ],
};
