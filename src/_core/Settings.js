module.exports = class Settings {
  init () {
    this.loadSettings();
  }

  loadSettings () {
    chrome.storage.sync.get(null, function (items) {
      var keys = Object.keys(items);
      if (keys === 0) {
        this.createNewSettings();
      }
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
