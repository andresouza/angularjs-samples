app.factory("articlesAPI", function ($http, config) {
  var _getBySlug = function (params) {
    return $http.get(config.baseUrl + "/api/articles/" + params.category + "/" + params.slug + ".json");
  };

  var _getByCategory = function (params) {
    return $http.get(config.baseUrl + "/api/articles/" + params.category + ".json");
  };

  var _setPointByArticle = function (params) {
    return $http.get(config.baseUrl + "/api/articles/" + params.category + "/" + params.slug + "/point.json");
  };

  return {
    getBySlug: _getBySlug,
    getByCategory: _getByCategory,
    setPointByArticle: _setPointByArticle
  };
});