app.controller('rankingCtrl', function ($scope, $rootScope, $routeParams, Auth, usersAPI, rankingAPI) {
  $rootScope.trySignIn();

  $scope.ranking = {};
  $scope.visitedUsers = new Array();
  $scope.visibleGroups = new Array();

  $scope.ranking.type = $routeParams.type;

  if ($scope.ranking.type == 'geral') {
    rankingAPI.getGeneral().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'trimestre') {
    rankingAPI.getGeneralTrimester().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'regional') {
    rankingAPI.getRegional().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'regional-trimestre') {
    rankingAPI.getRegionalTrimester().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'gerente' || $scope.ranking.type == 'gerentes') {
    rankingAPI.getManager().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'representantes') {
    rankingAPI.getAllRepresentatives().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  } else if ($scope.ranking.type == 'representantes-trimestre') {
    rankingAPI.getAllRepresentativesTrimester().then(function(obj) {
      $scope.ranking = obj.data.rankings;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.getRankingDetail = function (userId) {
    rankingAPI.getInformationById(userId).then(function(obj) {
      $scope.rankingDetail = obj.data.user;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.setVisitedUser = function(user) {
    if ($scope.visitedUsers.length < 3) {
      if ($scope.visitedUsers.indexOf(user) < 0 || $scope.visitedUsers.length <= 0) {
        $scope.visitedUsers.push(user);
        
        if ($scope.visitedUsers.length >= 3) {
          $scope.setBadges('diga-me-com-quem-andas');
        }
      }
    }
  }

  $scope.orderBy = function (field) {
    $scope.orderCriteria = field;
    $scope.orderDirection = !$scope.orderDirection;
  }

  $scope.showGroup = function(group) {
    var i = $.inArray(group, $scope.visibleGroups);
    if (i > -1) {
      $scope.visibleGroups.splice(i, 1);
    } else {
      $scope.visibleGroups.push(group);
    }
  }

  $scope.filterGroup = function(row) {
    if ($scope.visibleGroups.length > 0) {
      if ($.inArray(row.user.group, $scope.visibleGroups) < 0)
        return;
    }
    return row;
  }

  usersAPI.get().then(function(obj) {
    $scope.getRankingDetail(obj.data.user.id);
  }, function(error) {
    console.log(error);
  });
});