app.controller('tutorialCtrl', function ($scope, $rootScope, $routeParams, $sce, tutorialsAPI) {
  $rootScope.trySignIn();

  var timer;

  $scope.tutorialParams = {
    slug: $routeParams.slug || '',
    style: ''
  }

  if ($scope.tutorialParams.slug) {
    $scope.tutorialParams.style = 'single';
    
    tutorialsAPI.getBySlug($scope.tutorialParams).then(function(obj) {
      $scope.tutorial = obj.data.tutorial;
      $scope.tutorial.content = $sce.trustAsHtml($scope.tutorial.content);
    }, function(error) {
      console.log(error);
    });

  } else {
    $scope.tutorialParams.style = 'grid';

    tutorialsAPI.getAll().then(function(obj) {
      $scope.tutorials = obj.data.tutorials;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.tutorialPointCounter = 15;
  timer = setInterval(function () {
    $scope.tutorialPointCounter--;
    if ($scope.tutorialPointCounter <= 0) {
      clearInterval(timer);
    }
    $scope.$apply(function($scope){
      $scope.tutorialPointCounter;
    });
  }, 1000);

  $scope.setPointByTutorial = function () {
    tutorialsAPI.setPointByTutorial($scope.tutorialParams).then(function(obj) {
      if (obj.data.success) {
        $scope.tutorial.readed = obj.data.success;
        $scope.setBadges('comecando-os-trabalhos');
      }
    }, function(error) {
      console.log(error);
    });
  }

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  }
});