/* 
* jQuery plugin - jReplenish | Replenishes the form with relevant data, made for testers ;)
*
* @author adhocore | Jitendra Adhikari
* @email jiten.adhikary@gmail.com
*
*/


;(function($) {

		$.fn.jReplenish	 = function(options){
		
		   options 	= $.extend({
								allFields: true,
								minLen: 10,
								maxLen: 25,
								dashDot: true
							}, options || {});

		var form 	 = this,
			toFill 	 = form.find('input, textarea').not(':submit, :button, :reset'),
			toSelect = form.find('select');
			
		var number	 = '0123456789',
			alpha	 = 'abcdefghijklmnopqrstuvwxyz',
			upalpha  = alpha.toUpperCase();
			dashdot  = '.-_';	
		
		
		
		if (!options.allFields) {
			toFill 	 = toFill.filter(function () {
							var reqd = $(this).attr('required');
							return $(this).hasClass('required') || (typeof reqd !== 'undefined' && reqd !== false);
						});
			toSelect = toSelect.filter(function () {
							var reqd = $(this).attr('required');
							return $(this).hasClass('required') || (typeof reqd !== 'undefined' && reqd !== false);
						});
		};
		if (toFill.length + toSelect.length > 0) {
			form.find('input:submit').before('<input type="button" value="Fill" class="replenish-form-btn"/>');
			
			if ((undoBtn = form.find('input[type="reset"]')).length < 1)
				form.find('input:submit').after('<input style="display:none;" type="reset" value="Undo Fill" class="undo-form-replenish replenish-undo-btn"/>');
			else undoBtn.addClass('undo-form-replenish').attr('title','Undo Fill');
		}
		
		function _fill() {
			toFill.each(function(i,e){
				
				var minLen = $(this).attr('minlength'),
					maxLen = $(this).attr('maxlength');
					minLen = (typeof minLen !== 'undefined' && minLen !== false) ?
								minLen : options.minLen;
					maxLen = (typeof maxLen !== 'undefined' && maxLen !== false && maxLen != -1 
								&& maxLen != 524288 && maxLen != 2147483647 ) ?	maxLen : options.maxLen;
				
				if ($(this).hasClass('date') || $(this).attr('type') == 'date') {
					$(this).val(_date());
				}
				
				else if ($(this).hasClass('url') || $(this).attr('type') == 'url') {
					$(this).val(_url(minLen));
				}
				
				else if ($(this).hasClass('email') || $(this).attr('type') == 'email') {
					$(this).val(_email(minLen));
				} 			
									
				else if ($(this).hasClass('number') || $(this).attr('type') == 'number'){
					$(this).val(_get('number', false, minLen, maxLen));
				} 
				
				else {
					$(this).val(_get('alphanum', true, minLen, maxLen));
				};
			});
			
			toSelect.each(function(i,e){
				var j = 1;
				if ($(this).find('option[value!=""]').length == (optCount = $(this).find('option').length) ) {
					j = 0;
				} 
				$(this).find('option').eq(_rand(j, optCount - 1)).attr('selected',true);
			});
		};
		
		$('.replenish-form-btn', form).click(function(){
			_fill();
			$(this).val('Refill');
			$('.undo-form-replenish', form).show();
		});
		
		$('.undo-form-replenish', form).click(function(){
			if ($(this).hasClass('replenish-undo-btn')) $(this).hide();
			$('.replenish-form-btn', form).val('Fill');
		});
		
		function _get(type, dash, min_, max_){
			
			if (!type) type = 'alphanum';
				
			var ret = '',
				len = _rand(min_, max_);
			
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
		
		
		function _email(min_){
			return _get('alpha', true, 5 , min_) + '@' + _get('alpha', false, min_ - 5 , min_ - 5) + '.' +  _get('alpha', false, 3 , 4);
		};
		
		function _url(min_){
			return 'http://' + _get('alpha', false, min_ - 3 , min_) + '.' +  _get('alpha', false, 3 , 4);	
		};
		
		function _date(){
			var m = _rand(1, 12),
				d = _rand(1, 28);
			if (m < 10) m = '0' + m;
			if (d < 10) d = '0' + d;
				
			return _rand(1900, 2100) + '-' + m + '-' + d;
		};
		
		function _rand(min_, max_){
			
			return Math.floor(Math.random() * (max_ - min_ + 1)) + parseInt(min_);
		};
		
		return form; // chaining
	}
})(jQuery);
