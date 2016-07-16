// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require angularjs
//= require angular-material
//= require angular-animate
//= require angular-aria
//= require angular-route
//= require angular-messages
//= require angular-facebook
//= require angular-utils-pagination
//= require angular-devise
//= require angular-sanitize
//= require angular-ui-utils
//= require ngImgCrop
//= require lib/angular-locale_pt-br
//= require_self
//= require_tree .

var app = angular.module('Gamification', [
  'ngRoute', 
  'ngMaterial', 
  'ngMessages',
  'Devise',
  'ngImgCrop',
  'ngSanitize', 
  'facebook',
  'angularUtils.directives.dirPagination',
  'ui.mask'
]);

app.run(function($rootScope, Auth, usersAPI, $location, $routeParams, $mdDialog) {

  $(window).load(function () {
    $("#app-loading").fadeOut(500);
  });

  $rootScope.signOut = function () {
    Auth.logout().then(function(oldUser) {
      window.location.href = "/login";
    }, function(error) {
      console.log(error);
    });
  };

  $rootScope.trySignIn = function () {
    $rootScope.mainClass = $location.$$path.split('/')[1];

    usersAPI.isSignedIn().then(function(obj) {
      if (obj.data.success) {
        Auth._currentUser = obj.data.user;
        $rootScope.setMainMenu(Auth._currentUser.profile_type);
      }

      if (!Auth.isAuthenticated()) {
        $location.path('/login');
      } else {
        $rootScope.updateUser();
      }
    }, function(error) {
      console.log(error);
      $location.path('/login');
    });
  }

  $rootScope.mainMenu = new Array();
  $rootScope.setMainMenu = function (userProfileType) {
    if (userProfileType == 4) {
      $rootScope.mainMenu = [
        { title: 'Notícias', link: '/noticias/geral', actived: true },
        { title: 'Belliz na Mídia', link: '/noticias/belliz-na-midia', actived: false },
        { title: 'Treinamento', link: '/treinamento', actived: false },
        { title: 'Ranking Geral', link: '/ranking/representantes', actived: false },
        { title: 'Ranking Trimestre', link: '/ranking/representantes-trimestre', actived: false },
        { title: 'Ranking Gerentes', link: '/ranking/gerentes', actived: false },
      ];
    } else if (userProfileType == 1) {
      $rootScope.mainMenu = [
        { title: 'Notícias', link: '/noticias/geral', actived: true },
        { title: 'Belliz na Mídia', link: '/noticias/belliz-na-midia', actived: false },
        { title: 'Ranking', link: '/ranking/gerente', actived: false },
        { title: 'Minha Equipe - Geral', link: '/ranking/regional', actived: false },
        { title: 'Minha Equipe - Trimestre', link: '/ranking/regional-trimestre', actived: false },
        { title: 'Insígnias', link: '/insignias', actived: false },
      ];
    } else {
      $rootScope.mainMenu = [
        { title: 'Notícias', link: '/noticias/geral', actived: true },
        { title: 'Belliz na Mídia', link: '/noticias/belliz-na-midia', actived: false },
        { title: 'Ranking Geral', link: '/ranking/geral', actived: false },
        { title: 'Ranking Trimestre', link: '/ranking/trimestre', actived: false },
        { title: 'Minha Regional', link: '/ranking/regional', actived: false },
        { title: 'Treinamento', link: '/treinamento', actived: false },
        { title: 'Insígnias', link: '/insignias', actived: false },
      ];
    }

    $rootScope.mainMenu.forEach(function (menu) {
      if (menu.link == $location.$$path) {
        menu.actived = true;
      } else {
        menu.actived = false;
      }
    });
  }

  $rootScope.setBadges = function (slug) {
    var badge = { slug: slug };
    usersAPI.setBadges(badge).then(function(obj) {
      if (obj.data.success) {
        $mdDialog.show(
          $mdDialog.alert({
            parent: angular.element(document.body),
            template: 
            '<md-dialog aria-label="List dialog">' +
            '  <md-dialog-content>'+
            '    <h2>Parabéns, você acabou de ganhar uma insígnia!</h2>'+
            '    <div class="badges-g-' + obj.data.badge.slug + '"></div>'+
            '    <p><b>Como:</b> ' + obj.data.badge.howto + '</p>' +
            '     <p>' + obj.data.badge.description + '</p>' +
            '  </md-dialog-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="dialog.hide()" class="md-primary">' +
            '      Legal!' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>'
          })
        );
      }
      $rootScope.updateUser();
    }, function(error) {
        console.log(error);
    });
  }

  $rootScope.updateUser = function () {
    usersAPI.get().then(function(obj) {
      $rootScope.currentUser = obj.data.user;
    }, function(error) {
      console.log(error);
    });
  }

  $rootScope.visitedSocialLinks = new Array();
  $rootScope.setVisitedSocialLinks = function (social) {
    if ($rootScope.visitedSocialLinks.length < 2) {
      if ($rootScope.visitedSocialLinks.indexOf(social) < 0 || $rootScope.visitedSocialLinks.length <= 0) {
        $rootScope.visitedSocialLinks.push(social);
        
        if ($rootScope.visitedSocialLinks.length >= 2) {
          $rootScope.setBadges('quem-tem-boca');
        }
      }
    }
  }

  $rootScope.visitedMainMenu = new Array();
  $rootScope.setVisitedMainMenu = function (menu) {
    if ($rootScope.visitedMainMenu.length < $rootScope.mainMenu.length) {
      if ($rootScope.visitedMainMenu.indexOf(menu) < 0 || $rootScope.visitedMainMenu.length <= 0) {
        $rootScope.visitedMainMenu.push(menu);
        
        if ($rootScope.visitedMainMenu.length >= $rootScope.mainMenu.length) {
          $rootScope.setBadges('explorador');
        }
      }
    }
  }

  $rootScope.systemError = '';
  $rootScope.setSystemError = function (error) {
    $rootScope.systemError = error;
  }
  $rootScope.systemSuccess = '';
  $rootScope.setSystemSuccess = function (success) {
    $rootScope.systemSuccess = success;
  }
  $rootScope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
    $rootScope.setSystemError('');
    $rootScope.setSystemSuccess('');
  });

});