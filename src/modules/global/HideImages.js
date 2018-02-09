require("../../_core/HFX");
class HideImages extends HFX.Feature {
  constructor () {
    super({
      section: "global",
      name: "Hides images",
      default: 0,
      description: "Hides images"
    });
  }

  run () {
    $("img").hide();
  }
};

module.exports = new HideImages();
