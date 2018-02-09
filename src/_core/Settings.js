require("./HFX");
class Settings {
  getFeatureSettings (section, key, defaultOpt, name, description, Feature, cb) {
    chrome.storage.sync.get(section, function (items) {
      if (Object.keys(items).length === 0) {
        return cb(null, Feature);
      }

      if (items[section][key] === undefined) {
        return cb(null, Feature);
      }

      return cb(items[section][key], Feature);
    });
  }

  create (section, key, defaultOpt, name, description) {
    chrome.storage.sync.get(section, function (items) {
      var keys = Object.keys(items);
      var obj = {};
      if (keys.length === 0) {
        obj[section] = {};
        obj[section][key] = {};
        obj[section][key]["default"] = defaultOpt;
        obj[section][key]["enabled"] = defaultOpt;
        obj[section][key]["name"] = name;
        obj[section][key]["description"] = description;
        chrome.storage.sync.set(obj, function () {
          HFX.Logger.debug(`Added ${key} AND ${section}`);
        });
      } else {
        obj = items;
        obj[section][key] = {};
        obj[section][key]["default"] = defaultOpt;
        obj[section][key]["enabled"] = defaultOpt;
        obj[section][key]["name"] = name;
        obj[section][key]["description"] = description;
        chrome.storage.sync.set(obj, function () {
          HFX.Logger.debug(`Added ${key} in ${section}`);
        });
      }
    });
  }

  printSettings () {
    chrome.storage.sync.get(null, function (items) {
      HFX.Logger.debug("Items: ", items);
    });
  }

  exists (section, setting) {

  }

  get (section, setting) {

  }

  set (section, setting) {

  }

  clear () {
    chrome.storage.sync.clear(function () {
      HFX.Logger.log("Cleared storage");
    });
  }
};
module.exports = new Settings();
