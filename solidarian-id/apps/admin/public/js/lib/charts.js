var ChartsLib = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === 'object') || typeof from === 'function') {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toCommonJS = mod => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

  // libs/charts/src/plugins/callbacks.ts
  var callbacks_exports = {};
  __export(callbacks_exports, {
    hydrateCallbacks: () => hydrateCallbacks,
  });
  function hydrateCallbacks(config) {
    config.options = config.options || {};
    config.options.plugins = config.options.plugins || {};
    config.options.plugins.tooltip = config.options.plugins.tooltip || {};
    config.options.plugins.tooltip.callbacks = {};
    for (const [key, funcString] of Object.entries(config._serializedCallbacks?.tooltip || {})) {
      config.options.plugins.tooltip.callbacks[key] = new Function('return ' + funcString)();
    }
    delete config._serializedCallbacks;
    return config;
  }
  return __toCommonJS(callbacks_exports);
})();
