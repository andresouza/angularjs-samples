app.factory("rankingAPI", function ($http, $routeParams, config) {
  var _getGeneral = function () {
    return $http.get(config.baseUrl + "/api/rankings/general.json");
  };

  var _getGeneralTrimester = function () {
    return $http.get(config.baseUrl + "/api/rankings/current/general.json");
  };

  var _getRegional = function () {
    return $http.get(config.baseUrl + "/api/rankings/regional.json");
  };

  var _getRegionalTrimester = function () {
    return $http.get(config.baseUrl + "/api/rankings/current/regional.json");
  };

  var _getManager = function () {
    return $http.get(config.baseUrl + "/api/rankings/managers.json");
  };

  var _getAllRepresentatives = function () {
    return $http.get(config.baseUrl + "/api/rankings/all.json");
  };

  var _getAllRepresentativesTrimester = function () {
    return $http.get(config.baseUrl + "/api/rankings/all.json");
  };

  var _getInformationById = function (id) {
    return $http.get(config.baseUrl + "/api/rankings/information/" + id + ".json");
  };

  return {
    getGeneral: _getGeneral,
    getGeneralTrimester: _getGeneralTrimester,
    getRegional: _getRegional,
    getRegionalTrimester: _getRegionalTrimester,
    getManager: _getManager,
    getInformationById: _getInformationById,
    getAllRepresentatives: _getAllRepresentatives,
    getAllRepresentativesTrimester: _getAllRepresentativesTrimester
  };
});