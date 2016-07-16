"use strict";

var app = angular.module('mastermindApp', ['ngRoute', 'ngMessages', 'ngMaterial', 'ngCookies']);

app.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: 'HomeCtrl as home',
      templateUrl: '/views/home.html'
    })
    .when('/games', {
      controller: 'GamesCtrl as games',
      templateUrl: '/views/games.html'
    })
    .when('/game/create', {
      controller: 'GameCreateCtrl as gameCreate',
      templateUrl: '/views/game-create.html'
    })
    .when('/game/:gameId/play', {
      controller: 'GamePlayCtrl as gamePlay',
      templateUrl: '/views/game-play.html'
    })
    .when('/game/:gameId/view', {
      controller: 'GameViewCtrl as gameView',
      templateUrl: '/views/game-view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.constant('config', {
  apiURL: 'https://axiomzen-mastermind.herokuapp.com/api/',
  baseURL: window.location.origin,
  colors: ['R','B','G','Y','O','P','C','M']
})
.factory('UserAPI', function (config, $http) {
  var _login = function (data) {
    return $http.post(config.apiURL + 'authentication.json', data);
  };

  return {
    login: _login,
  };
})
.factory('GameAPI', function (config, $http, $rootScope, Auth) {
  var _list = function () {
    return $http.get(config.apiURL + 'games.json', { headers: {'Authorization': 'Token token=' + Auth.get().api_key}});
  };

  var _create = function (colors) {
    return $http.post(config.apiURL + 'games.json', colors, { headers: {'Authorization': 'Token token=' + Auth.get().api_key}})
  }

  var _play = function (game) {
    return $http.get(config.apiURL + 'games/' + game + '/play.json', { headers: {'Authorization': 'Token token=' + Auth.get().api_key}})
  }

  var _check = function (game, colors) {
    return $http.post(config.apiURL + 'games/' + game + '/guess.json', colors, { headers: {'Authorization': 'Token token=' + Auth.get().api_key}})
  }

  var _view = function (game) {
    return $http.get(config.apiURL + 'games/' + game + '.json', { headers: {'Authorization': 'Token token=' + Auth.get().api_key}})
  }

  return {
    list: _list,
    create: _create,
    play: _play,
    check: _check,
    view: _view
  };
})
.factory('Auth', function ($cookieStore, $location) {
  var user = {};

  var _set = function (data) {
    $cookieStore.put('current.user', data);
  }

  var _get = function () {
    return user;
  }

  var _verify = function () {
    user = $cookieStore.get('current.user');
    
    if ($location.path() === '/' && user) {
      $location.path('/games');
    }

    if ($location.path() !== '/' && !user) {
      $location.path('/');
    }
  }

  var _remove = function () {
    $cookieStore.remove('current.user', _user);
  }

  return {
    set: _set,
    get: _get,
    verify: _verify,
    remove: _remove
  };
});