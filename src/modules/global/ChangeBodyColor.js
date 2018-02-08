const Feature = require("../../_core/Feature");
class ChangeBodyColor extends Feature {
  constructor () {
    super({
      id: "ChangeBodyColor",
      section: "global",
      name: "Change Body Color",
      default: 0,
      description: "Change color."
    });
  }

  run () {
    console.log("Running ChangeBodyColor...");
    $("table").css("color", "red");
  }
};

module.exports = new ChangeBodyColor();
