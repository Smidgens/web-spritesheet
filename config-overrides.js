const { alias } = require("react-app-rewire-alias");

// @<alias> -> <path>
const aliases = {};

const getAliasFn = (prefix, path) => {
	return n => aliases[`${prefix}${n}`] = `${path}${n}`;
};

// mappers
const aliasFn = {
	module:getAliasFn("@", "modules/@"),
	rootModule:getAliasFn("#", ""),
	srcModule:getAliasFn("$", "src/"),
};

// ./src/$<name>
[
].forEach(aliasFn.srcModule);

// ./#<name>
[
].forEach(aliasFn.rootModule);

// ./modules/@<name>
[
].forEach(aliasFn.module);

module.exports = function override(config) {
	alias(aliases)(config);
	return config;
};