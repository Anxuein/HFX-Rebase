const Log = require("./Logger");
module.exports = class Feature {
  constructor (opts) {
    var required = ["id", "section", "name", "default", "description"];
    var childClass = this.constructor.name;
    for (var index in required) {
      if (opts[required[index]] === undefined) {
        Log.error(`Not able to load ${childClass} as '${required[index]}' is missing.`);
        return;
      }
    };

    this.run();
  }
};
