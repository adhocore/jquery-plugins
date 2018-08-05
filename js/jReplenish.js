/**
 * jQuery plugin - jReplenish | Replenishes the form with relevant data, made for testers ;)
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */
;
(function($) {
  'use strict';
  $.fn.jReplenish = function(options) {
    options = $.extend({
      allFields: true,
      minLen: 10,
      maxLen: 25,
      dashDot: true
    }, options || {});

    var form = this,
      toFill = form.find('input, textarea').not(':submit, :button, :reset'),
      toSelect = form.find('select'),
      number = '0123456789',
      alpha = 'abcdefghijklmnopqrstuvwxyz',
      upalpha = alpha.toUpperCase(),
      dashdot = '.-_';

    if (!options.allFields) {
      toFill = toFill.filter(function() {
        var reqd = $(this).attr('required');
        return $(this).hasClass('required') || (typeof reqd !== 'undefined' && reqd !== false);
      });
      toSelect = toSelect.filter(function() {
        var reqd = $(this).attr('required');
        return $(this).hasClass('required') || (typeof reqd !== 'undefined' && reqd !== false);
      });
    };

    if (toFill.length + toSelect.length > 0) {
      var undoBtn = form.find('input[type="reset"]');
      form.find('input:submit').before('<input type="button" value="Fill" class="replenish-form-btn"/>');

      if (undoBtn.length < 1) {
        form.find('input:submit').after('<input style="display:none;" type="reset" value="Undo Fill" class="undo-form-replenish replenish-undo-btn"/>');
      } else {
        undoBtn.addClass('undo-form-replenish').attr('title', 'Undo Fill');
      }
    }

    function doFill() {
      toFill.each(function(i, e) {
        var minLen = $(this).attr('minlength'),
          maxLen = $(this).attr('maxlength'),
          itype = $(this).attr('type');
        minLen = (typeof minLen !== 'undefined' && minLen !== false) ?
          minLen : options.minLen;
        maxLen = (typeof maxLen !== 'undefined' && maxLen !== false && maxLen != -1 &&
          maxLen != 524288 && maxLen != 2147483647) ? maxLen : options.maxLen;

        if ($(this).hasClass('date') || itype == 'date') {
          $(this).val(date());
        } else if ($(this).hasClass('url') || itype == 'url') {
          $(this).val(url(minLen));
        } else if ($(this).hasClass('email') || itype == 'email') {
          $(this).val(email(minLen));
        } else if ($(this).hasClass('number') || itype == 'number') {
          $(this).val(val('number', false, minLen, maxLen));
        } else {
          $(this).val(val('alphanum', true, minLen, maxLen));
        };
      });

      toSelect.each(function(i, e) {
        var j = 1;
        if ($(this).find('option[value!=""]').length == (optCount = $(this).find('option').length)) {
          j = 0;
        }
        $(this).find('option').eq(rand(j, optCount - 1)).attr('selected', true);
      });
    };

    $('.replenish-form-btn', form).click(function() {
      doFill();
      $(this).val('Refill');
      $('.undo-form-replenish', form).show();
    });

    $('.undo-form-replenish', form).click(function() {
      if ($(this).hasClass('replenish-undo-btn')) $(this).hide();
      $('.replenish-form-btn', form).val('Fill');
    });

    function val(type, dash, min, max) {
      var ret = '',
        pool = '',
        len = rand(min, max);

      if (!type) type = 'alphanum';
      if (type == 'alphanum') pool = number + alpha + upalpha;
      if (type == 'alpha') pool = alpha;
      if (type == 'upalpha') pool = alpha + upalpha;
      if (type == 'number') pool = number;
      if (options.dashDot && pool != number && dash) pool += dashdot;

      while (ret.length < len) {
        ret += pool[Math.floor(Math.random() * pool.length)];
      };

      return ret;
    };

    function email(min) {
      return val('alpha', true, 5, min) + '@' + val('alpha', false, min - 5, min - 5) + '.' + val('alpha', false, 3, 4);
    };

    function url(min) {
      return 'https://' + val('alpha', false, min - 3, min) + '.' + val('alpha', false, 3, 4);
    };

    function date() {
      var m = rand(1, 12),
        d = rand(1, 28);
      if (m < 10) m = '0' + m;
      if (d < 10) d = '0' + d;

      return rand(1900, 2100) + '-' + m + '-' + d;
    };

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + parseInt(min, 10);
    };

    return form; // chaining
  }
})(jQuery);
