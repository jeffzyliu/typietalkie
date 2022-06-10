module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'module-resolver',
      {
        // root: ['./src'],
        // alias: { '#': './src/' },
        alias: { '^#(.+)': './src/\\1' },
        // alias: {
        //   services: './src/services',
        // },
      },
    ],
  ],
  presets: [
    [
      '@babel/react',
    ],
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
      },
    ],
  ],
};
