app.controller('forgotCtrl', function ($scope, usersAPI) {

  $scope.recover = function (user) {
    $scope.setSystemError('');
    $scope.setSystemSuccess('');
    
    user = { user: { email: user.email }};
    usersAPI.recover(user).then(function(obj) {
      if (obj.data.success) {
        $scope.setSystemSuccess("Instruções enviadas com sucesso!");
      } else {
        $scope.setSystemError(obj.data.error);
      }
    }, function(error) {
      console.log(error);
    });
  }

});