/** 
 * jQuery plugin - jFloatTop | simulates CSS float:top;
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 *
*/


;(function($) {

	$.fn.jFloatTop= function(options){
			
		options  = $.extend({itemClass: 'box', col: 4,	gap: 4 }, options || {});
		var wrap = $(this), hh = [], minH = 0, boxes = wrap.find('.'+options.itemClass); box = $(boxes[0]),
			minW = Math.floor(((int(wrap.width()) - (offsetWidth(wrap) / 2 ) - (options.gap - int(box.css('marginLeft')) - int(box.css('marginRight'))) * (options.col-1)) / options.col) - offsetWidth(box));
		
		function int(int){
			return Math.ceil(parseInt(int,10));
		};		
		
		function offsetWidth(el){
			return ( int(el.css('marginLeft')) + int(el.css('marginRight')) + int(el.css('paddingRight')) + int(el.css('paddingLeft')) + int(el.css('borderLeftWidth')) + int(el.css('borderRightWidth')) );
		};
		
		wrap.css('position', 'relative');
	
		boxes.each(function(i,e){
		
			$(this).width(minW);
			h = int($(this).outerHeight());
			j = i % options.col;
		
			if (i == 0) {
				m = h;
				for (k = 0; k < options.col ; k++)
					hh.push(0);
			} else m = hh.min(); 
			
			minH = (minH == 0) ? m : Math.min(m, minH);
		
			if ( (hh.max() - m) > minH ) {
				j = hh.mini();
			};
			
			$(this).css({
					'top': 	hh[j], 
					'left': j * ($(this).outerWidth() + options.gap),
					'position': 'absolute'
				});
				
			hh[j] += h + options.gap; 
			
		});
	
		wrap.height(int(hh.max()));	
		$(window).resize(function(){
			wrap.floattop(options);
		});
		return wrap; // chaining
	}
})(jQuery);

/* Array functions */
	
	Array.prototype.max = function(){
		return Math.max.apply( Math, this );
	};
	 
	Array.prototype.min = function(){
		return Math.min.apply( Math, this );
	};

	Array.prototype.maxi = function(){
		return this.indexOf(this.max());
	};
	 
	Array.prototype.mini = function(){
		return this.indexOf(this.min());
	};
	
	
	