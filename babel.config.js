// @ts-check
/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api, targets) => {
    // https://babeljs.io/docs/en/config-files#config-function-api
    const isTestEnv = api.env('test');
  
    return {
      babelrc: false,
      ignore: ['./node_modules'],
      presets: [
        [
   //       '@babel/preset-env',
   "@babel/preset-typescript",
          {
            modules: isTestEnv ? 'commonjs' : false,
            targets: isTestEnv ? { node: 'current' } : targets,
            loose: false,
            useBuiltIns: false,
            exclude: ['transform-async-to-generator', 'transform-regenerator'],
          },
        ],
      ],
      plugins: [
        "babel-plugin-macros",
        "@babel/plugin-transform-modules-commonjs"
      ],
    };
  };