// TODO V3: remove this file, global fetch will be a runtime requirement.
module.exports = typeof fetch === 'undefined' ? require('undici').fetch : fetch;
