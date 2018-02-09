require("../../_core/HFX");
class ChangeBodyColor extends HFX.Feature {
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
    $("table").css("color", "red");
  }
};

module.exports = new ChangeBodyColor();
