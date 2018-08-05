/**
 * jQuery plugin - jFloatTop | simulates CSS float:top;
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */
Array.prototype.max = function() {
  return Math.max.apply(Math, this);
};
Array.prototype.min = function() {
  return Math.min.apply(Math, this);
};
Array.prototype.maxi = function() {
  return this.indexOf(this.max());
};
Array.prototype.mini = function() {
  return this.indexOf(this.min());
};

(function($) {
  'use strict';
  $.fn.jFloatTop = function(opts) {
    opts = $.extend({
      itemClass: 'box',
      col: 4,
      gap: 4
    }, opts || {});

    var wrap = $(this),
      hh = [],
      minH = 0,
      boxes = wrap.find('.' + opts.itemClass),
      box = $(boxes[0]),
      minW = Math.floor(
        (
          (
            num(wrap.width()) - (offsetWidth(wrap) / 2) -
            (opts.gap - num(box.css('marginLeft')) - num(box.css('marginRight')))
            * (opts.col - 1)
          ) / opts.col
        )
        - offsetWidth(box)
      );

    function num(n) {
      return parseInt(n, 10);
    };

    function offsetWidth(el) {
      return (num(el.css('marginLeft')) + num(el.css('marginRight')) + num(el.css('paddingRight')) + num(el.css('paddingLeft')) + num(el.css('borderLeftWidth')) + num(el.css('borderRightWidth')));
    };

    wrap.css('position', 'relative');

    boxes.each(function(i, e) {
      $(this).width(minW);

      var h = num($(this).outerHeight());
      var j = i % opts.col, m = 0;

      if (i == 0) {
        m = h;
        for (var k = 0; k < opts.col; k++) {
          hh.push(0);
        }
      } else {
        m = hh.min();
      }

      minH = minH == 0 ? m : Math.min(m, minH);

      if ((hh.max() - m) > minH) {
        j = hh.mini();
      };

      $(this).css({
        top: hh[j],
        left: j * ($(this).outerWidth() + opts.gap),
        position: 'absolute'
      });

      hh[j] += h + opts.gap;
    });

    wrap.height(num(hh.max()));

    $(window).resize(function() {
      wrap.floattop(opts);
    });

    return wrap; // chaining
  }
})(jQuery);
