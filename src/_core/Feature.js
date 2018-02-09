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

    HFX.Settings.getFeatureSettings(opts.section, childClass, opts.default, function (settings) {
      if (!settings) {
        HFX.Settings.create(opts.section, childClass, opts.default);
      } else {
        HFX.Logger.debug("settings: ", settings);
      }
    });

    HFX.Logger.log(`${childClass} loaded.`);
    this.run();
  }
};
