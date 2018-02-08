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

window.addEventListener("load", function () {
  console.log(window);
  module.exports = new ChangeBodyColor();
});
