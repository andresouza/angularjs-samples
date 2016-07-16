app.factory("tutorialsAPI", function ($http, config) {
  var _getAll = function () {
    return $http.get(config.baseUrl + "/api/tutorials.json");
  };
  
  var _getBySlug = function (params) {
    return $http.get(config.baseUrl + "/api/tutorials/" + params.slug + ".json");
  };

  var _setPointByTutorial = function (params) {
    return $http.get(config.baseUrl + "/api/tutorials/" + params.slug + "/point.json");
  };

  return {
    getAll: _getAll,
    getBySlug: _getBySlug,
    setPointByTutorial: _setPointByTutorial
  };
});