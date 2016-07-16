app.controller('loginCtrl', function ($scope, $location, Auth, usersAPI) {
  usersAPI.isSignedIn().then(function(obj) {
    if (obj.data.success) {
      Auth._currentUser = obj.data.user;
      $location.path('/');
    };
  }, function(error) {
    console.log(error);
  });

  $scope.login = function (user) {
    Auth.login(user).then(function(data) {
      if (data.success) {
        $location.path('/');
      } 
      $scope.setSystemError(data.error);
      
    }, function(error) {
      console.log(error); 
    });
  }
});