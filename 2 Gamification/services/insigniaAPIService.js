app.factory("insigniasAPI", function ($http, config) {
  var _getAll = function () {
    return $http.get(config.baseUrl + "/api/badges.json");
  };

  return {
    getAll: _getAll
  };
});