if (configPath.endsWith('.ts')) {
  try {
    require('@swc-node/register');
  } catch (error) {
    // @todo: differentiate error types
    console.error(`Please install @swc-node/register package in order to use TypeScript config file`);
    return;
  }
}