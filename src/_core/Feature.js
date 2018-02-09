require("./HFX");
module.exports = class Feature {
  constructor (opts) {
    var required = ["section", "name", "default", "description"];
    var childClass = this.constructor.name;

    for (var index in required) {
      if (opts[required[index]] === undefined) {
        HFX.Logger.error(`Not able to load ${childClass} as '${required[index]}' is missing.`);
        return;
      }
    };

    HFX.Settings.getFeatureSettings(opts.section, childClass, opts.default, opts.name, opts.description, this, function (settings, Feature) {
      if (!settings) {
        if (opts.default) {
          Feature.run();
        }
        HFX.Settings.create(opts.section, childClass, opts.default, opts.name, opts.description);
      } else {
        if (settings.enabled) {
          Feature.run();
        }
      }
    });

    HFX.Logger.debug(`${childClass} loaded.`);
  }
};
