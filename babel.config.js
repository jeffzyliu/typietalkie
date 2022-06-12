module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'react-refresh/babel',
    [
      'module-resolver',
      {
        alias: { '^#(.+)': './src/\\1' },
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
