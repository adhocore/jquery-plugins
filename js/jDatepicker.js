/**
 * jQuery Plugin - Enables to pick date in BikramSambat and gives equivalent English Date
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */
;
(function($) {
  // 'use strict';
  $.fn.jDatepicker = function(opts) {
    opts = $.extend({
      separator: '-',
      format: 'yyyy-mm-dd',
      ADelm: '',
      ADformat: 'yyyy-mm-dd'
    }, opts || {});

    var ref = new Date(),
      dpElm = this,
      adElm = null,
      ADbase = [1944, 1, 1, 7],
      BSbase = [2000, 1, 1, 4],
      ADtoBS = [2000, 9, 16, 6],
      BStoAD = [1943, 4, 13, 3],
      npDates = [
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 4, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 3, 1, 2, 2, 1, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 4, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [2, 4, 3, 4, 3, 3, 1, 2, 1, 2, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 1, 3],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 1, 2, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3],
        [3, 3, 3, 4, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 1, 2, 1, 2, 2],
        [3, 4, 3, 4, 3, 2, 2, 2, 1, 1, 2, 2],
        [3, 3, 4, 4, 3, 2, 2, 2, 1, 2, 2, 2],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 2, 2],
        [3, 3, 4, 3, 3, 2, 2, 2, 1, 2, 2, 2],
        [3, 3, 4, 3, 3, 2, 2, 2, 1, 2, 2, 2],
        [3, 4, 3, 4, 2, 3, 2, 2, 1, 2, 2, 2],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 2, 2],
        [3, 3, 4, 3, 3, 3, 2, 2, 1, 2, 2, 2],
        [2, 3, 4, 4, 2, 3, 2, 2, 1, 2, 2, 2],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 2, 2],
        [2, 4, 3, 4, 3, 2, 2, 2, 1, 2, 2, 2]
      ],
      npNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
      monthNames = ['चैत्र', 'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'],
      dayNames = ['श', 'आ', 'सो', 'म', 'बु', 'बि', 'शु', 'श'],
      lngDayNames = ['शनिबार', 'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
      defaults = toBS(ref.getFullYear(), ref.getMonth() + 1, ref.getDate()),
      uid = Math.ceil(Math.random() * 10000),
      dpuid = '.jDp-' + uid
    ;

    $('<div class="jDatepicker-div jDp-' + uid + '">').appendTo('body');

    if (opts.ADelm) {
      adElm = opts.ADelm.replace(/^[#]+/, '');
      if ($('#' + adElm).length < 1) {
        $('<input type="text" style="display:none;"/>')
          .attr('name', adElm).attr('id', adElm)
          .data('elmID', uid).insertAfter(dpElm);
      };
      adElm = $('#' + adElm);
    };

    $(dpuid).html(calendar());
    dpElm.data('elmID', uid).addClass('jDatepicker-element');
    reFmt();

    dpElm.focus(function() {
      dpuid = '.jDp-' + $(this).data('elmID');
      $(dpuid).css('top', (num(dpElm.offset().top) + num(dpElm.height()) + num(dpElm.css('marginTop')) + 5) + 'px')
        .css('left', (num(dpElm.offset().left) + num(dpElm.css('marginLeft')) - 3) + 'px')
        .css('position', dpElm.css('position') == 'fixed' ? 'fixed' : 'absolute')
        .attr('elmID', uid);
      if ($(dpuid).is(':hidden')) $(dpuid).html(calendar()).show();
    });

    $(dpuid).delegate('.jDatepicker-click', 'click', function() {
      var t = $('.jDatepicker-table', $(dpuid)),
        y = t.data('year'),
        m = t.data('month'),
        d = $(this).data('day')
      ad = toAD(y, m, d), sep = opts.separator;
      dpElm.val(y + sep + m + sep + d);
      adElm.val(ad[0] + sep + ad[1] + sep + ad[2]);
      $(dpuid).hide();
    });

    $(dpuid).delegate('.jDatepicker-div', 'mouseenter', function() {
      dpuid = '.np-dp-' + $(this).data('elmID');
    });

    $(dpuid).delegate('.jDatepicker-click', 'mouseenter', function() {
      $(this).addClass('jDatepicker-hover');
    });

    $(dpuid).delegate('.jDatepicker-click', 'mouseleave', function() {
      $(this).removeClass('jDatepicker-hover');
    });

    $(dpuid).delegate('.jDatepicker-next', 'click', function() {
      var a = attr();
      y = a[0], m = a[1], m = m + 1;
      if (m > 12) {
        m = 1;
        y = y + 1;
      };
      $(dpuid).html(calendar(y, m));
    });

    $(dpuid).delegate('.jDatepicker-prev', 'click', function() {
      var a = attr();
      y = a[0], m = a[1], m = m - 1;
      if (m < 1) {
        m = 12;
        y = y - 1;
      };
      $(dpuid).html(calendar(y, m));
    });

    $(dpuid).delegate('.jDatepicker-nextyear', 'click', function() {
      var a = attr();
      $(dpuid).html(calendar(a[0] + 1, a[1]));
    });

    $(dpuid).delegate('.jDatepicker-prevyear', 'click', function() {
      var a = attr();
      $(dpuid).html(calendar(a[0] - 1, a[1]));
    });

    $(document).click(function(event) {
      if ($(dpuid).is(':visible')) {
        target = event.target || event.srcElement || event.currentTarget;
        if ($(dpuid).find(target).length < 1) {
          if ($(target).hasClass('jDatepicker-controls') || $(target).hasClass('jDatepicker-element'))
            $.noop();
          else $(dpuid).hide();
        };
      };
    });

    function num(n) {
      return parseInt(n, 10);
    }

    function pad(n) {
      if (n < 10) {
        return '0' + n;
      }

      return n + '';
    }

    function calendar(y, m) {
      var f = dtFmt(),
        yy = f[0] || num(defaults[0]),
        mm = f[1] || num(defaults[1]),
        dd = f[2] || num(defaults[2]);

      if (!y) y = yy;
      if (!m) m = mm;

      $fd = _dpFd(y, m) - 1;
      max = (npDates[y - 2000][m - 1] + 28);
      $limit = ($fd + max > 35) ? 42 : 35;

      out = '<div class="jDatepicker-nav">\
        <div class="jDatepicker-prevnav"><span class="jDatepicker-controls ' + (y <= 2001 ? 'disabled' : 'jDatepicker-prevyear') + '">&laquo;</span>\
        <span class="jDatepicker-controls ' + (y == 2001 && m <= 1 ? 'disabled' : 'jDatepicker-prev') + '">&lsaquo;</span></div>\
        <div class="jDatepicker-label">' + npNum(y) + ' ' + monthNames[m] + '</div><div class="jDatepicker-nextnav"><span class="jDatepicker-controls ' + ((y >= 2090) ? 'disabled' : 'jDatepicker-nextyear') + '">&raquo;</span>\
        <span class="jDatepicker-controls ' + (y == 2090 && m >= 12 ? 'disabled' : 'jDatepicker-next') + '">&rsaquo;</span></div>\
      </div>';

      out += '<table class="jDatepicker-table" data-year="' + y + '" data-month="' + ((m.length == 1 || m < 10) ? '0' + m : m) + '" cellpadding="1" cellspacing="1">';
      out += '<thead><tr class="jDatepicker-days">';

      var i = 0,
        tr = false;
      while (i++ < 7) {
        out += "<th title='" + lngDayNames[i] + "'> " + dayNames[i] + " </th>";
      };

      out += '</tr></thead><tbody>';

      for (i = 0, j = 0; i < $limit; i++) {
        tr = false;
        if (i % 7 == 0) {
          tr = true;
          out += '<tr>';
        }
        if (i == $fd) j = 1;
        out += "<td class='" + ((j == dd && m == mm && y == yy) ? 'jDatepicker-selected ' : '') + (j ? 'jDatepicker-click ' : '') + "' data-day='" + ((j.length == 1 || j < 10) ? '0' + j : j) + "'>" + ((j > 0 && j <= max) ? npNum(j) : '') + '</td>';
        if (j > 0) j++;
        if (j == max + 1) j = 0;
        if (i % 7 == 0 && !tr) {
          out += '</tr>';
        };
      };

      out += '</tbody></table>';

      return out;
    };

    function _dpFd(y, m) {
      var days = 0;
      y = y - 2000;

      while (1) {
        if (y == 0 && m == 1) break;
        if (m-- < 1) {
          m = 12;
          y--;
        };

        if (m > 0) days = (days + 28 + npDates[y][m - 1]);
      };

      return ((days + 4) % 7 != 0) ? (days + 4) % 7 : 7;
    };

    function npNum(n) {
      var n = n + '',
        nep = '';
      for (var k = 0; k < n.length; k++) {
        d = n.substr(k, 1);
        nep += (d == '0' || num(d) < 10) ? npNums[d] : d;
      };

      return nep;
    };

    /** Reformat date with 0 padding and separator */
    function reFmt() {
      var f = dtFmt(),
        sep = opts.separator;
      if (f.length) dpElm.val(f[0] + sep + pad(f[1]) + sep + pad(f[2]));
    };

    /** Format date */
    function dtFmt() {
      var v = dpElm.val();
      if (v && /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[012])$/.test(v)) {
        var vv = v.split(/[\/\-]/);

        return [num(vv[0]), num(vv[1]), num(vv[2])];
      }

      return [];
    };

    function attr() {
      var t = $('.jDatepicker-table', $(dpuid));

      return [num(t.data('year')), num(t.data('month'))];
    };

    function toBS(y, m, d) {
      // if ( y < 1944 || y > 2090 ) return [0000,0,0,0];
      var enDays = d,
        nDay = 0;
      for (var year = ADbase[0], month = ADbase[1];; month++) {
        if (y == year && m == month) break;
        if (month > 12) {
          month = 1;
          year += 1;
          if (y == year && m == month) break;
        }

        enDays = num(enDays) + enMonDays(year, month);
      }

      nDay = (ADtoBS[3] + enDays) % 7;
      nDay = nDay == 0 ? 7 : nDay;

      for (year = ADtoBS[0], month = ADtoBS[1], day = ADtoBS[2];; enDays--, day++) {
        if (day > npMonDays(year, month)) {
          day = 1;
          month = num(month) + 1;
        }
        if (month > 12) {
          month = 1;
          year = num(year) + 1;
        }
        if (enDays == 0) break;
      }

      return [year, pad(month), pad(day), nDay];
    };

    function toAD(y, m, d) {
      //  if ( y < 2001 || y > 2090 ) return [0000,0,0,0];
      var npDays = d,
        nDay = 0;

      for (year = BSbase[0], month = BSbase[1];; month++) {
        if (y == year && m == month) break;
        if (month > 12) {
          month = 1;
          year = num(year) + 1;
          if (y == year && m == month) break;
        }
        npDays = num(npDays) + npMonDays(year, month);
      }

      nDay = (BStoAD[3] + npDays) % 7;
      nDay = nDay == 0 ? 7 : nDay;

      for (year = BStoAD[0], month = BStoAD[1], day = BStoAD[2];; npDays--, day++) {
        if (day > enMonDays(year, month)) {
          day = 1;
          month = num(month) + 1;
        }
        if (month > 12) {
          month = 1;
          year = num(year) + 1;
        }
        if (npDays == 0) break;
      };

      return [year, pad(month), pad(day), nDay];
    };

    function enMonDays(y, m) {
      var max = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (m < 1 || m > 12) return 0;
      if (m == 2 && isLeap(y)) return 29;

      return max[m - 1];
    };

    function npMonDays(y, m) {
      return 28 + npDates[y - 2000][m - 1];
    };

    function isLeap(y) {
      return (y % 100 != 0 || y % 400 == 0) && y % 4 == 0;
    };

    return dpElm; // chaining
  };
})(jQuery);
