$(document).ready(function () {
  // Load version string
  $("#HFXVersion").text(chrome.runtime.getManifest().version);

  function getSettings () {
    var deferred = $.Deferred(function () {
      $("#main").hide();
    });

    chrome.storage.sync.get(null, function (data) {
      deferred.resolve(data);
    });
    return deferred.promise();
  }

  $.when(getSettings()).done(function (data) {
    $("#spinner").hide();
    $("#main").show();
    for (var key in data) {
      addSectionToList(key);
      buildSectionBase(key);
      for (var setting in data[key]) {
        // default, description, enabled, name
        addSettingOptionToList(key, data[key][setting]);
      }
    }
  });

  function addSectionToList (name) {
    var title = name.charAt(0).toUpperCase() + name.slice(1);
    var href = `#${name}`;
    $(".nav").append(`<li class="nav-item"><a class="nav-link" data-toggle="tab" href="${href}" role="tab">${title}</a></li>`);
  }

  function buildSectionBase (name) {
    $(".tab-content").append(`
      <div id="${name}" class="tab-pane fade">
        <h3>${capFirstLetter(name)}</h3>
        <div class="card card-default" role="tabpanel">
        </div>
      </div>
    `);
  }

  function addSettingOptionToList (sectionName, setting) {
    setting.description = setting.description.replace(/(?:\r\n|\r|\n)/g, "<br />");
    var checked = Boolean(setting.enabled) === true ? "checked" : "";
    $(`#${sectionName}`).find(".card").append(`
    <div class="d-flex justify-content-start">
      <div class="mr-auto p-2">${setting.name}</div>
      <div class="p-2">${setting.description}</div>
      <div class="mt-auto p-2">
        <div class="checkbox-slider--default">
          <label><input type="checkbox" ${checked}><span></span><label>
        </div>
      </div>
    </div>
    `);
  }

  function capFirstLetter (something) {
    return something.charAt(0).toUpperCase() + something.slice(1);
  }
});
