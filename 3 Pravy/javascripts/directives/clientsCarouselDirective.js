"use strict";

angular.module('pravyApp').directive("clientsCarousel", function () {
  function link(scope, element) {

    var carouselItem = element.find('#item-1');

    updateCarousel(element, carouselItem, false);

    // Navigation
    element.find('.c-navigation').on('click', function(e){
      e.preventDefault();

      var newItem, oldItem;

      oldItem = element.find('.item.actived');

      if ($(this).hasClass('prev')) {
        newItem = oldItem.prev();

        if (!newItem.hasClass('item')) {
          newItem = element.find('.item').last();
        }
      } else {
        newItem = oldItem.next();

        if (!newItem.hasClass('item')) {
          newItem = element.find('.item').first();
        }
      }
      
      updateCarousel(element, newItem, oldItem);
    });

    // Pagination
    element.find('.c-pagination a').on('click', function(e){
      e.preventDefault();
      
      var newItem, oldItem;

      if (!$(this).hasClass('actived')) {
        newItem = element.find($(this).attr('href'));
        oldItem = element.find($('.c-pagination a.actived').attr('href'));
        updateCarousel(element, newItem, oldItem);
      }
    });
  }

  function updateCarousel(carousel, newItem, oldItem){
    var tween;

    if (oldItem) {
      tween = new TimelineMax()
            .staggerTo(oldItem.find('img'), 0.1, {opacity: '0', x: -20}, 0.02)
            .staggerTo(newItem.find('img'), 0.1, {opacity: '1', x: 0}, 0.02);
      oldItem.removeClass('actived');
    } else {
      tween = new TimelineMax()
            .staggerTo(newItem.find('img'), 0.1, {opacity: '1', x: 0}, 0.02);
    }
    newItem.addClass('actived');

    carousel.find('.c-pagination a.actived').removeClass('actived');
    carousel.find('.c-pagination a.' + newItem.attr('id')).addClass('actived');
  }

  return {
    link: link
  };
});