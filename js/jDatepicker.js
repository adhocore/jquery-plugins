/**
 * jQuery Plugin - Enables to pick date in BikramSambat and gives equivalent English Date
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 *
 */
;(function($) {
  $.fn.jDatepicker = function(options){
    options = $.extend({separator:'-', format: 'yyyy-mm-dd', ADelm:'', ADformat:'yyyy-mm-dd'}, options || {});
    $ref = new Date();
    var dpElm = this,
      adElm = null,
      $ADbase = [1944, 1, 1, 7],
      $BSbase = [2000, 1, 1, 4],
      $ADtoBS = [2000, 9, 16, 6],
      $BStoAD = [1943, 4, 13, 3],
      nepaliDates = [[2,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,2,1,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,2],[3,4,3,4,3,2,2,2,1,2,1,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,3,4,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,3,1,2,2,1,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,2],[3,4,3,4,3,2,2,2,1,2,1,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,2],[3,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,3,4,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,2,2,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[2,4,3,4,3,3,1,2,1,2,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,1,3],[3,3,4,3,3,3,2,1,2,1,2,2],[3,3,4,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,1,2,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,2],[3,4,3,4,3,2,2,2,1,2,1,3],[3,3,3,4,3,3,2,1,2,1,2,2],[3,3,4,3,3,3,2,1,2,1,2,2],[3,4,3,4,3,2,2,2,1,1,2,2],[3,3,4,4,3,2,2,2,1,2,2,2],[2,4,3,4,3,2,2,2,1,2,2,2],[3,3,4,3,3,2,2,2,1,2,2,2],[3,3,4,3,3,2,2,2,1,2,2,2],[3,4,3,4,2,3,2,2,1,2,2,2],[2,4,3,4,3,2,2,2,1,2,2,2],[3,3,4,3,3,3,2,2,1,2,2,2],[2,3,4,4,2,3,2,2,1,2,2,2],[2,4,3,4,3,2,2,2,1,2,2,2],[2,4,3,4,3,2,2,2,1,2,2,2]],
      monthNames  = "&#2330;&#2376;&#2340;&#2381;&#2352;&#45;&#2348;&#2376;&#2358;&#2366;&#2326;&#45;&#2332;&#2375;&#2359;&#2381;&#2336;&#45;&#2310;&#2359;&#2366;&#2338;&#45;&#2358;&#2381;&#2352;&#2366;&#2357;&#2339;&#45;&#2349;&#2366;&#2342;&#2381;&#2352;&#45;&#2310;&#2358;&#2381;&#2357;&#2367;&#2344;&#45;&#2325;&#2366;&#2352;&#2381;&#2340;&#2367;&#2325;&#45;&#2350;&#2306;&#2360;&#2367;&#2352;&#45;&#2346;&#2380;&#2359;&#45;&#2350;&#2366;&#2328;&#45;&#2347;&#2366;&#2354;&#2381;&#2327;&#2369;&#2344;&#45;&#2330;&#2376;&#2340;&#2381;&#2352;".split('&#45;'),
      dayNames  = "&#2358;&#45;&#2310;&#45;&#2360;&#2379;&#45;&#2350;&#45;&#2348;&#2369;&#45;&#2348;&#2367;&#45;&#2358;&#2369;&#45;&#2358;".split('&#45;'),
      lngDayNames = "&#2358;&#2344;&#2367;&#2348;&#2366;&#2352;&#45;&#2310;&#2311;&#2340;&#2348;&#2366;&#2352;&#45;&#2360;&#2379;&#2350;&#2348;&#2366;&#2352;&#45;&#2350;&#2306;&#2327;&#2354;&#2348;&#2366;&#2352;&#45;&#2348;&#2369;&#2343;&#2348;&#2366;&#2352;&#45;&#2348;&#2367;&#2361;&#2367;&#2348;&#2366;&#2352;&#45;&#2358;&#2369;&#2325;&#2381;&#2352;&#2348;&#2366;&#2352;&#45;&#2358;&#2344;&#2367;&#2348;&#2366;&#2352;".split('&#45;');
      defaults  = _toBS($ref.getFullYear(), $ref.getMonth()+1, $ref.getDate()),
      uid     = Math.ceil(Math.random() * 10000),
      dpuid   = '.jDp-'+uid;

    $('<div class="jDatepicker-div jDp-' + uid + '">').appendTo('body');

    if (options.ADelm) {
      adElm = options.ADelm.replace(/^[#]+/, '');
      if ($('#' + adElm).length < 1) {
        $('<input type="text" style="display:none;"/>').attr('name', adElm).attr('id', adElm).data('elmID', uid).insertAfter(dpElm);
      };
      adElm = $('#'+adElm);
    };

    $(dpuid).html( _dpTbl() );
    dpElm.data('elmID', uid).addClass('jDatepicker-element');
    _rFmt();

    dpElm.focus(function(){
      dpuid = '.jDp-'+$(this).data('elmID');
      $(dpuid).css('top', ( Math.ceil(dpElm.offset().top) +  Math.ceil(dpElm.height()) + parseInt(dpElm.css('marginTop')) + 5 ) + 'px').css('left', ( Math.ceil(dpElm.offset().left) + parseInt(dpElm.css('marginLeft')) - 3) + 'px' ).css('position', ( (dpElm.css('position') == 'fixed') ? 'fixed' : 'absolute') ).attr('elmID', uid);
      if ($(dpuid).is(':hidden')) $(dpuid).html( _dpTbl() ).show();
    });

    $(dpuid).delegate('.jDatepicker-click', 'click', function(){

      var t = $('.jDatepicker-table', $(dpuid));
        y = t.data('year'), m = t.data('month'), d = $(this).data('day')
        ad = _toAD(y, m, d);
      dpElm.val( y + options.separator + m + options.separator + d);
      adElm.val(ad[0] + options.separator + ad[1] + options.separator + ad[2]);
      $(dpuid).hide();
    });

    $(dpuid).delegate('.jDatepicker-div', 'mouseenter', function(){
      dpuid = '.np-dp-'+$(this).data('elmID');
    });

    $(dpuid).delegate('.jDatepicker-click', 'mouseenter', function(){
      $(this).addClass('jDatepicker-hover');
    });

    $(dpuid).delegate('.jDatepicker-click', 'mouseleave', function(){
      $(this).removeClass('jDatepicker-hover');
    });

    $(dpuid).delegate('.jDatepicker-next', 'click', function(){
      var y = _gAttr()[0],  m = _gAttr()[1];
        m = m + 1;
      if (m > 12) {
        m = 1;  y = y + 1;
      };
      $(dpuid).html( _dpTbl(y, m) );
    });

    $(dpuid).delegate('.jDatepicker-prev', 'click', function(){
      var y = _gAttr()[0],  m = _gAttr()[1];
        m = m - 1;
      if (m < 1) {
        m = 12; y = y - 1;
      };
      $(dpuid).html( _dpTbl(y, m) );
    });

    $(dpuid).delegate('.jDatepicker-nextyear', 'click', function(){
      $(dpuid).html( _dpTbl(_gAttr()[0]+1, _gAttr()[1]) );
    });

    $(dpuid).delegate('.jDatepicker-prevyear', 'click', function(){
      $(dpuid).html( _dpTbl(_gAttr()[0]-1, _gAttr()[1]) );
    });

    $(document).click(function(event){
      if ($(dpuid).is(':visible')) {
        target = event.target || event.srcElement ||  event.currentTarget;
        if ( $(dpuid).find(target).length < 1) {
          if ( $(target).hasClass('jDatepicker-controls') || $(target).hasClass('jDatepicker-element'))
            $.noop();
          else $(dpuid).hide();
        };
      };
    });

  function _dpTbl($y, $m){
    if (f = _cFmt()) {
      $yy = f[0];
      $mm = f[1];
      $dd = f[2];
    } else {
      $yy = parseInt(defaults[0], 10);
      $mm = parseInt(defaults[1], 10);
      $dd = parseInt(defaults[2], 10);
    };

    if (!$y) $y = $yy;
    if (!$m) $m = $mm;

    $fd = _dpFd($y, $m) - 1;
    $max = (nepaliDates[$y - 2000][$m-1] + 28);
    $limit = ($fd + $max > 35) ? 42 : 35;

    $out = '<div class="jDatepicker-nav">\
      <div class="jDatepicker-prevnav"><span class="jDatepicker-controls '+ (($y <= 2001) ? 'disabled':'jDatepicker-prevyear') +'">&laquo;</span>\
      <span class="jDatepicker-controls '+ (($y == 2001 && $m <= 1) ? 'disabled':'jDatepicker-prev') +'">&lsaquo;</span></div>\
      <div class="jDatepicker-label">'+ _dpNp($y) + ' ' + monthNames[$m] + '</div><div class="jDatepicker-nextnav"><span class="jDatepicker-controls '+ (($y >= 2090) ? 'disabled':'jDatepicker-nextyear') +'">&raquo;</span>\
      <span class="jDatepicker-controls '+ (($y == 2090 && $m >= 12) ? 'disabled':'jDatepicker-next') +'">&rsaquo;</span></div>\
    </div>';

    $out += '<table class="jDatepicker-table" data-year="' + $y + '" data-month="' + (($m.length == 1 || $m < 10) ? '0'+$m : $m) + '" cellpadding="1" cellspacing="1">';
    $out += '<thead><tr class="jDatepicker-days">';

    $i = 0;
    while ($i++ < 7) {
      $out +=  "<th title='"+ lngDayNames[$i] +"'> " + dayNames[$i] + " </th>";
    };

    $out += '</tr></thead><tbody>';

    for ( $i = 0, $j=0; $i < $limit; $i++) {
      $tr_start = false;
      if ($i % 7 == 0) {
        $tr_start = true;
        $out +=  '<tr>';
      }
      if ($i == $fd) $j = 1;
      $out +=  "<td class='" + (($j == $dd && $m == $mm && $y == $yy) ? 'jDatepicker-selected ' : '' ) + ($j ? 'jDatepicker-click ' : '') + "' data-day='" + (($j.length == 1 || $j < 10) ? '0'+$j : $j) + "'>"+ (($j > 0 && $j <= $max) ? _dpNp($j) : '')  + '</td>';
      if ($j > 0) $j++;
      if ($j == $max + 1) $j = 0;
      if ($i % 7 == 0 && ! $tr_start) {
        $out +=  '</tr>';
      };
    };

    $out +=  '</tbody></table>';

    return $out;
  };

  function _dpFd(y, $m){
    var $days = 0;
    $y = y - 2000;

    while ( 1 ) {
      if ($y == 0 && $m == 1) break;
      if ($m-- < 1) {
        $m = 12;
        $y--;
      };

      if ($m > 0) $days = ($days + 28 + nepaliDates[$y][$m-1]);
    };

    return (($days + 4) % 7 != 0) ? ($days + 4) % 7 : 7;
  };

  function _dpNp(n){
    var r  = ['&#2406;', '&#2407;', '&#2408;', '&#2409;', '&#2410;', '&#2411;', '&#2412;', '&#2413;', '&#2414;', '&#2415;'],
      n  = n+'',
      nep = '';
    for (var k=0; k < n.length; k++) {
      d = n.substr(k, 1);
      nep += (d == '0' || parseInt(d, 10) < 10) ? r[d] : d;
    };

    return nep;
  };

  function _rFmt(){
    f = _cFmt();
    if (f) dpElm.val(f[0]  + options.separator + (f[1] < 10 ? '0'+f[1] : f[1]) + options.separator + (f[2] < 10 ? '0'+f[2] : f[2]) );
  };

  function _cFmt(){
    var v = dpElm.val();
    if (v && /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[012])$/.test(v)) {
      var vv  = v.split(/[\/\-]/);
        $yy = parseInt(vv[0], 10),
        $mm = parseInt(vv[1], 10),
        $dd = parseInt(vv[2], 10);

        return [$yy, $mm, $dd];
    }

    return false;
  };

  function _gAttr(){
    var t = $('.jDatepicker-table', $(dpuid));
    return [parseInt(t.data('year'), 10), parseInt(t.data('month'), 10)];
  };

  function _toBS($y, $m, $d) {
    //    if ( $y < 1944 || $y > 2090 ) return [0000,0,0,0];
    $engDays = $d;
    $return = [];
    for ($year = $ADbase[0], $month = $ADbase[1] ; ; $month++) {
      if ($y == $year && $m == $month) break;
      if ($month > 12) {
        $month = 1;   $year += 1;
        if ($y == $year && $m == $month) break;
      }

      $engDays = parseInt($engDays, 10) + _npEDys($year, $month);
    }

    $numDay = ( $ADtoBS[3] + $engDays ) % 7 == 0 ? 7 : ( $ADtoBS[3] + $engDays ) % 7;

    for ( $year = $ADtoBS[0], $month = $ADtoBS[1], $day = $ADtoBS[2]; ; $engDays--, $day++ ) {
      if ( $day >  _npNDys($year, $month) ) {
        $day = 1;   $month = parseInt($month, 10) + 1;
      }
      if ( $month > 12 ) {
        $month = 1;   $year = parseInt($year, 10) + 1;
      }
      if ($engDays == 0 ) break;
    }

    $return[0] = $year;
    $return[1] = ($month < 10) ? '0' + $month : $month;
    $return[2] = ($day < 10) ? '0' + $day : $day;
    $return[3] = $numDay;

    return $return;

  };

  function _toAD($y, $m, $d){
   //  if ( $y < 2001 || $y > 2090 ) return [0000,0,0,0];
    var $return = [], $nepDays = $d;

    for ($year = $BSbase[0], $month = $BSbase[1]; ; $month++) {
      if ($y == $year && $m == $month) break;
      if ($month > 12) {
        $month = 1;   $year = parseInt($year, 10) + 1;
        if ($y == $year && $m == $month) break;
      }
      $nepDays = parseInt($nepDays, 10) + _npNDys($year, $month);
    }

    $numDay = ($BStoAD[3] + $nepDays) % 7 == 0 ? 7 : ($BStoAD[3] + $nepDays) % 7;

    for ($year = $BStoAD[0], $month = $BStoAD[1], $day = $BStoAD[2]; ; $nepDays--, $day++) {
      if ($day >  _npEDys($year, $month) ) {
        $day = 1;   $month = parseInt($month, 10) + 1;
      }
      if ($month > 12) {
        $month = 1;   $year = parseInt($year, 10) + 1;
      }
      if ($nepDays == 0 ) break;
    };

    $return[0] = $year;
    $return[1] = ($month < 10) ? '0' + $month : $month;
    $return[2] = ($day < 10) ? '0' + $day : $day;
    $return[3] = $numDay;

    return $return;

  };

  function _npEDys($y, $m){
    $max = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ( $m < 1 || $m > 12 ) return 0;
    if ( $m == 2 && _isLeap($y) ) return 29;
    return $max[$m - 1];
  };

  function _npNDys($y, $m){
    return 28 + nepaliDates[$y-2000][$m-1];
  };

  function _isLeap($y) {
    return ( ($y % 100 != 0 || $y % 400 == 0) && $y % 4 == 0 );
  };

  return dpElm; // chaining
};
})(jQuery);


