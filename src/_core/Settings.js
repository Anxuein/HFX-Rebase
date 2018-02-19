require("./HFX");
var queue = [];
class Settings {
  constructor () {
    this.running = false;
  }
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
    queue.push({ "section": section, "key": key, "defaultOpt": defaultOpt, "name": name, "description": description });
    this.processQueue();
  }

  processQueue () {
    if (queue.length === 0 || this.running) {
      return false;
    }
    this.running = true;
    var section = queue[0].section;
    var key = queue[0].key;
    var defaultOpt = queue[0].defaultOpt;
    var name = queue[0].name;
    var description = queue[0].description;
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
          HFX.Settings.proceedQueue();
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
          HFX.Settings.proceedQueue();
        });
      }
    });
  }

  proceedQueue () {
    this.running = false;
    console.log("before", queue);
    queue.shift();
    console.log("after", queue);
    this.processQueue();
  }

  printSettings () {
    chrome.storage.sync.get(null, function (items) {
      HFX.Logger.debug("Items: ", items);
    });
  }

  exists (section, key, setting, cb) {
    chrome.storage.sync.get(section, function (items) {
      if (setting === null) {
        return cb(Boolean(items[section][key]));
      } else {
        return cb(Boolean(items[section][key][setting]));
      }
    });
  }

  get (section, key, setting, cb) {
    chrome.storage.sync.get(section, function (items) {
      return cb(items[section][key][setting]);
    });
    return cb(null);
  }

  set (section, key, setting) {
    chrome.storage.sync.get(section, function (items) {
      var obj = items;
      obj[section][key][setting] = setting;
      chrome.storage.sync.set(obj, function () {
        HFX.Logger.debug(`Updated ${key}:${setting}`);
      });
    });
  }

  clear () {
    chrome.storage.sync.clear(function () {
      HFX.Logger.log("Cleared storage");
    });
  }
};
module.exports = new Settings();
