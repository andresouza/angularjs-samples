app.controller('registerCtrl', function ($scope, $rootScope, $location, Facebook, usersAPI, Auth, rankingAPI) {

  if ($location.url().indexOf('minha-conta') >= 0) {
    $rootScope.trySignIn(); 

    usersAPI.isSignedIn().then(function(obj) {
      $scope.user = obj.data.user;

      rankingAPI.getInformationById($scope.user.id).then(function(obj) {
        $scope.user.ranking = obj.data.user;
      }, function(error) {
        console.log(error);
      });

      usersAPI.getBadges().then(function(obj) {
        $scope.user.badges = obj.data.badges;
      }, function(error) {
        console.log(error);
      });

    }, function(error) {
      console.log(error);
    });
  }

  $scope.profiles = [
    { name:'Gerente', value:1 },
    { name:'Representante', value:2 },
    // {name:'Promotor(a)', value:3}
  ];

  $scope.clearForm = function () {
    $scope.registerForm.$setPristine();
    $scope.showForm = false;
  }

  $scope.saveUser = function (user) {
    var credentials = {
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
        profile_image_url: user.image
      }
    };

    usersAPI.save(credentials).then(function(obj) {
      if (obj.data.success) {
        var badge = { slug: 'bem-vindo' };
        usersAPI.setBadges(badge).then(function(obj) {
          $location.path('/');
        }, function(error) {
            console.log(error);
        });
      }
      $scope.setSystemError(handleErrorMessage(obj.data.error));
    }, function(error) {
        console.log(error);
    });
  }

  $scope.editUser = function (user) {
    var credentials = {
      user: {
        name: user.name,
        password: user.password,
        password_confirmation: user.password_confirmation,
        profile_image_url: user.image
      }
    };

    usersAPI.save(credentials).then(function(obj) {
      if (obj.data.success) {
        $rootScope.updateUser();
      }
      $scope.setSystemError(handleErrorMessage(obj.data.error));
    }, function(error) {
        console.log(error);
    });
  }

  $scope.validationUser = function (user) {
    $scope.clearForm();

    usersAPI.validation(user).success(function (data) {
      if (!data.error) {
        $scope.showForm = true;
        Auth._currentUser = data.user;
        
        $scope.user.name = data.user.name;
        $scope.user.id = data.user.id;
      }
      $scope.setSystemError(data.error);
    });
  }

  $scope.checkFacebookStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.getFacebookImage();
      } else {
        Facebook.login(function(response) {
          $scope.getFacebookImage();
        });
      }
    });
  };

  $scope.getFacebookImage = function() {
    Facebook.api('/me/picture', {
      'type': 'large'
    }, function(response) {
      convertImgToBase64(response.data.url, function(base64Img){
        $scope.$apply(function($scope){
          $scope.myImage = base64Img;
        });
      });
    });
  };

  $scope.$watch('myCroppedImage', function() {
    if (!$scope.myImage) {
      $scope.myCroppedImage = '';
    } else {
      $scope.user.image = $scope.myCroppedImage;
    }
  });

  // For ngImgCrop
  var handleFileSelect=function(evt) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
});

function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
        // Clean up
      canvas = null;
  };
  img.src = url;
}

function handleErrorMessage(error) {
  errorMessage = '';
  for (prop in error) {
    propArray = error[prop];
    for (i = 0; i < propArray.length; i++) { 
      errorMessage += capitalizeFirstLetter(prop) + ' ' + propArray[i] + '<br>';
    }
  }
  return errorMessage;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}