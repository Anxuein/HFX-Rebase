require("./HFX");
class Settings {
  init () {
    this.loadSettings();
  }

  loadSettings () {
  }

  getFeatureSettings (section, key, defaultOpt, cb) {
    HFX.Logger.debug(`Creating ${section}`);
    chrome.storage.sync.get(section, function (items) {
      if (Object.keys(items).length === 0) {
        return cb(null);
      }

      if (items[section][key] === undefined) {
        return cb(null);
      }

      return cb(items);
    });
  }

  create (section, key, defaultOpt) {
    HFX.Logger.debug(`Creating... ${key}`);
    chrome.storage.sync.get(section, function (items) {
      var keys = Object.keys(items);
      var obj = {};
      if (keys.length === 0) {
        obj[section] = {};
        obj[section][key] = {};
        obj[section][key]["default"] = defaultOpt;
        chrome.storage.sync.set(obj);
      } else {
        obj = items;
        obj[section][key] = {};
        obj[section][key]["default"] = defaultOpt;
        chrome.storage.sync.set(obj);
      }
    });
    chrome.storage.sync.get(section, function (items) {
      HFX.Logger.debug("items: ", items);
    });
  }

  printSettings () {
    this.settings.each(function (e, k) {
      console.log(`${e} ${k}`);
    });
  }

  exists (section, setting) {

  }

  get (section, setting) {

  }

  set (section, setting) {

  }
};
module.exports = new Settings();
