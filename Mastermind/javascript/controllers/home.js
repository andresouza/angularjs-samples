"user strict";

app.controller('HomeCtrl', function ($rootScope, $scope, UserAPI, $location, Auth) {
  Auth.verify();
  
  $scope.login = function (user) {
    UserAPI.login(user).then(function(obj) {
      Auth.set(obj.data);
      $location.path('/games');
    }, function(error) {
      console.log(error);
    });
  }
});