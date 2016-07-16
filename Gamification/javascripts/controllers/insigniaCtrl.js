app.controller('insigniaCtrl', function ($scope, $rootScope, insigniasAPI) {
  $rootScope.trySignIn();

  insigniasAPI.getAll().then(function(obj) {
      $scope.insignias = obj.data.badges;
    }, function(error) {
      console.log(error);
    });
});