app.controller('articleCtrl', function ($scope, $rootScope, $routeParams, $sce, articlesAPI) {
  $rootScope.trySignIn();

  var timer;

  $scope.articleParams = {
    category: $routeParams.category || 'geral',
    slug: $routeParams.slug || '',
    style: ''
  }

  if ($scope.articleParams.slug) {
    $scope.articleParams.style = 'single';
    
    articlesAPI.getBySlug($scope.articleParams).then(function(obj) {
      $scope.article = obj.data.article;
    }, function(error) {
      console.log(error);
    });

  } else {
    $scope.articleParams.style = 'grid';

    articlesAPI.getByCategory($scope.articleParams).then(function(obj) {
      $scope.articles = obj.data.articles;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.articlePointCounter = 15;
  timer = setInterval(function () {
    $scope.articlePointCounter--;
    if ($scope.articlePointCounter <= 0) {
      clearInterval(timer);
    }
    $scope.$apply(function($scope){
      $scope.articlePointCounter;
    });
  }, 1000);

  $scope.setPointByArticle = function () {
    articlesAPI.setPointByArticle($scope.articleParams).then(function(obj) {
      if (obj.data.success) {
        $scope.article.readed = obj.data.success;
        $rootScope.updateUser();
      }
    }, function(error) {
      console.log(error);
    });
  }

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  }
});