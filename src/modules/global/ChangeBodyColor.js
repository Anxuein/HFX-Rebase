require("../../_core/HFX");
class ChangeBodyColor extends HFX.Feature {
  constructor () {
    super({
      section: "global",
      name: "Change Body Color",
      default: 1,
      description: "Change color."
    });
  }

  run () {
    $("table").css("color", "red");
  }
};

module.exports = new ChangeBodyColor();
