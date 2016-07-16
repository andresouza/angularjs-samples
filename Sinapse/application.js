// app/assets/javascripts/application.js

//= require angular/angular.min.js
//= require jquery/dist/jquery.min.js
//= require bootstrap/dist/js/bootstrap.min.js
//= require bootstrap/js/scrollspy.js
//= require tooltipster/js/jquery.tooltipster.min.js
//= require jquery-address/src/jquery.address.js
//= require slick-carousel/slick/slick.min.js
//= require fancybox/source/jquery.fancybox.js

angular.element(document).ready(function () {
	setContactUsHeight();
	$(window).resize(function(){
		setContactUsHeight();
	});

	$('#section-five').removeClass('hide');
	
	$(window).scrollTop($('#home').offset().top);

	$('.navbar-fixed').on('activate.bs.scrollspy', function () {
		var block = $('.navbar-fixed li.active a').attr('href');
		$('.scrollspy-block').removeClass('scrollspy-active');
		$(block).addClass('scrollspy-active');
	});

	$('.tooltipster').tooltipster({
		theme: 'tooltipster-sinapse'
	});

	var address = $.address.value();
	if(address.length > 1){
		$(window).scrollTop($(address.replace('/', '#')).offset().top + 20);
	}

	$('.slick-carousel').slick({
		dots: true,
		adaptiveHeight: true
	});

	$('section.brands-inner a.know-more').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$('section.brands-inner .project-details').hide();
		} else {
			$('section.brands-inner .project-details').show();
		}
		$(this).toggleClass('active');
	});

	$('.media-content a').fancybox({
		'fitToView':false,
		beforeShow: function(){
      this.width = ($('.fancybox-iframe').contents().find('#flashContent').width());
      this.height = ($('.fancybox-iframe').contents().find('#flashContent').height());
    },
	});
});

var myApp = angular.module('myApp', []);

myApp.config(["$httpProvider", function (provider) {
	provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')	
}]);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
	$scope.formData = {};

	$scope.processForm = function() {
		dataType: 'json',
		$http({
			method	: 'post',
			url 	: 'contact-us',
			data 	: $.param($scope.formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(data){
			$scope.loading = false;
			
			if (!data.success) {
				$scope.errorName = data.errors.name;
				$scope.errorEmail = data.errors.email;
				$scope.errorMessage = data.errors.message;
			} else {
				$scope.formData = {};
				$scope.errorName = '';
				$scope.errorEmail = '';
				$scope.errorMessage = '';
				$scope.message = 'Sua mensagem foi enviada com sucesso';
			}
		});
	};

	$scope.prepareForm = function() {
		$scope.message = '';
		$scope.loading = true;
		$scope.processForm();
	};
}]);

myApp.directive('focusInput', function() {
	return function(scope, element, attrs) {
		$(element).click(function(event) {
			$(element).parent().find('input').focus();
			event.preventDefault();
		});
	}
});

myApp.directive('focusTextarea', function() {
	return function(scope, element, attrs) {
		$(element).click(function(event) {
			$(element).parent().find('textarea').focus();
			event.preventDefault();
		});
	}
});

myApp.directive('eatClick', function() {
	return function(scope, element, attrs) {
		$(element).click(function(event) {
			event.preventDefault();
		});
	}
});

myApp.directive('scrollOnClick', function() {
	return {
		restrict: 'A',
		link: function(scope, $elm, attrs) {
			
			var idToScroll = attrs.href;
			$elm.on('click', function(event) {
				event.preventDefault();
				var $target;
				$.address.value(attrs.href.replace('#',''));
				if (idToScroll) {
					$target = $('[id="'+idToScroll.replace('#','')+'"]').last();
				} else {
					$target = $elm;
				}

				$('body, html').animate({scrollTop: $target.offset().top}, 'slow', function(){
					if (idToScroll == '#contact-us') {
						$('body, html').animate({scrollTop: 1}, 0);
					}
				});
			});
		}
	}
});

myApp.directive('scrollAnimations', function() {
	return function(scope, element, attrs) {
		$(window).scroll(function() {
			if(isScrolledIntoView($('#what-we-do'))) {
				$('#what-we-do').addClass('animation-active');
			} else {
				$('#what-we-do').removeClass('animation-active');
			}

			if(isScrolledIntoView($('#clients'))) {
				$('#clients').addClass('animation-active');
			} else {
				$('#clients').removeClass('animation-active');
			}
		});
	}
});

myApp.directive('parallax', function() {
	return function(scope, element, attrs) {
		var delay = parseFloat(element[0].attributes['data-delay'].value);
		var initialX = parseInt(element[0].attributes['data-initialX'].value);
		var initialY = parseInt(element[0].attributes['data-initialY'].value);
		$(element).css('background-position', initialX + 'px ' + initialY + 'px');
		
		// TODO - Aguardando imagens BGs novas e separadas
		// $(window).scroll(function() {
		// 	var offsetTop = $(element).offset().top;
		// 	var scroll = $(window).scrollTop();
		// 	var finalY = ((scroll - offsetTop) + initialY) / delay;
		// 	$(element).css('background-position', initialX + 'px ' + finalY + 'px');
		// });
	}
});

myApp.directive('infiniteScroll', function() {
	return function(scope, element, attrs) {
		var verify = true;
		$(window).scroll(function() {
			if (verify) {
				if(isScrolledIntoView($('#section-four'))) {
					$(window).scrollTop(0);
					verify = false;
				} else if($(window).scrollTop() <= 0) {
					$(window).scrollTop($('#section-four').offset().top);
					verify = false;
				}
			} else {
				setTimeout(function(){ verify = true; }, 100);
			}
		});
	}
});

function isScrolledIntoView(elem){
		
		if ($(elem).length <= 0) {
			return false;
		}

		var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop < docViewTop) || (elemBottom <= docViewBottom));	
}

function setContactUsHeight(){
	$('#section-four .content, #section-five .content').css('min-height', $(window).height() + 10);
	return false;
}