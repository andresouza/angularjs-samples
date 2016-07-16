app.factory("usersAPI", function ($http, config) {
  var _get = function () {
    return $http.get(config.baseUrl + "/api/users/information.json");
  };

  var _save = function (user) {
    return $http.put(config.baseUrl + "/users.json", user);
  };

  var _validation = function (user) {
    return $http.post(config.baseUrl + "/users/validation.json", user);
  };

  var _recover = function (user) {
    return $http.post(config.baseUrl + "/users/password.json", user);
  };

  var _isSignedIn = function () {
    return $http.get(config.baseUrl + "/users/is_signed_in.json");
  };

  var _getBadges = function () {
    return $http.get(config.baseUrl + "/api/users/badges.json");
  };

  var _setBadges = function (badge) {
    return $http.post(config.baseUrl + "/api/users/badges.json", badge);
  };

  return {
    get: _get,
    save: _save,
    validation: _validation,
    recover: _recover,
    isSignedIn: _isSignedIn,
    getBadges: _getBadges,
    setBadges: _setBadges
  };
});