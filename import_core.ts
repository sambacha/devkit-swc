

import * as babel from '@babel/core';
import * as t from '@babel/types';


// $ExpectType Readonly<PartialConfig> | null
const partialConfig = babel.loadPartialConfig();

// $ExpectType Promise<Readonly<PartialConfig> | null>
const partialConfigPromise = babel.loadPartialConfigAsync();

if (partialConfig) {
    // $ExpectType boolean
    partialConfig.hasFilesystemConfig();
}

function withPluginPass(state: babel.PluginPass) {
    state.file.hub.addHelper('something');
    if (!state.get('jsxDetected')) return;
    state.set('jsxDetected', true);
}

const plugin: babel.PluginObj = {
    pre({ path }) {
        visitBlock(path);

        function visitBlock(block: babel.NodePath<t.Program>) {}
    },
    visitor: {},
};