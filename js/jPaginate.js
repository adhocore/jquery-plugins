/**
 * jQuery plugin - jPaginate | paginates preloaded items or lazy ajax loaded ones
 *
 * @author	adhocore | Jitendra Adhikari
 * @email	jiten.adhikary@gmail.com
*/

;(function($) {

	$.fn.jPaginate = function(option) {
		
		var defaults = {
			itemClass: 'item',
			offset: 0,
			startPage: 1,
			perPage: 10,
			ajax: {
				baseurl: '',
				format: '?currpage&offset&perpage',
				total: 0,
				offset: 'offset', // get variable name
				perpage: 'perpage', // get variable name
				currpage: 'currpage' // get variable name
			},
			
			nextLabel: 'Next &rsaquo;',
			prevLabel: '&lsaquo; Prev',
			navPos: 'bottom',
			navLinks: 'max',
			showCurrent: false,
			maxPageLinks: 0,
			navTitle: {
				prev: 'go to previous page',
				next: 'go to next page',
				first: 'go to first page',
				last: 'go to last page',
				page: 'go to page %i',
				current: 'current page %i'
			}
		};
		
		option = option || {};
		option.offset = 0;
		option.ajax = $.extend(defaults.ajax, option.ajax);
		
		var	handle = $(this),
			isAjax = (typeof(option.ajax) == 'object' && option.ajax.baseurl != '' && option.ajax.total > 0),
			option = $.extend(defaults, option),
			numPages,
			currPage,			
			count;
		
		if (option.itemClass=='') { handle.append('<p class="jq-pagination-error">itemClass not defined</p>'); return false;}
		
		if (isAjax) { 
			option.ajax.baseurl = option.ajax.baseurl.replace(/[\/]+$/, '') + '/';
			count = option.ajax.total;
			
		} else {
			
			var items = handle.find('.' + option.itemClass);
				count = items.length;			
			
			if (count == 0) { handle.append('jQueryPagination error: items with class "'+ option.itemClass + '" not found.'); return false;}
						
			items.wrapAll('<div class="jq-pagination-wrap"></div>');
			wrap = $('.jq-pagination-wrap', handle);
							
			if (option.navPos == 'top') wrap.before('<div class="jq-pagination-nav"></div>');
					
			else {
				if (option.navPos == 'both') {
					wrap.before('<div class="jq-pagination-nav"></div>');
					wrap.after('<div class="jq-pagination-nav"></div>');
				} else {
					wrap.after('<div class="jq-pagination-nav"></div>');
				};
			};
					
		};
		
		numPages = Math.ceil(count/option.perPage);
		
		if (option.startPage > 0 && option.startPage < Math.ceil(count/option.perPage)) {
			
			option.offset = (option.startPage - 1) * option.perPage;

		};
		
		render();
		
		$(handle).delegate('.jq-pagination-prev-key', 'click', function(){
			option.offset -= (option.perPage);
			render();
		});
		
		$(handle).delegate('.jq-pagination-next-key', 'click', function(){
			option.offset += (option.perPage);
			render();
		});
		
		$(handle).delegate('.jq-pagination-nav-key', 'click', function(){
			option.offset = parseInt($(this).data('pageoffset'));
			render();
		});
	
		function render(){
			
			currPage = Math.floor(option.offset - option.perPage) / option.perPage + 2;
			
			if (isAjax) {
					
				$.ajax({
					type: 'GET',
					url: option.ajax.baseurl + parseFormat(option.ajax.format),
					success: function(res){
						(handle.find('.jq-pagination-wrap').length < 1) 
							? handle.append(res): handle.find('.jq-pagination-wrap').html(res);
						items = handle.find('.' + option.itemClass);			
						if (items.length == 0) { handle.append('<p class="jq-pagination-error">jPaginate error: items with class "'+ option.itemClass + '" not found.</p>'); return false;}
						if (handle.find('.jq-pagination-wrap').length < 1) {
							items.wrapAll('<div class="jq-pagination-wrap"></div>');
							wrap = $('.jq-pagination-wrap', handle);
							if (option.navPos == 'top') wrap.before('<div class="jq-pagination-nav"></div>');
							else {
								if (option.navPos == 'both') {
									wrap.before('<div class="jq-pagination-nav"></div>');
									wrap.after('<div class="jq-pagination-nav"></div>');
								} else {
									wrap.after('<div class="jq-pagination-nav"></div>');
								};
							};
						};
						navLinks();
					},
					error: function(res) {
						handle.append('<p class="jq-pagination-error">Error Loading Content.</p>');
					}
				});
			} 
			
			else {	
				navLinks();
				items.each(function() {
					($(this).index() < option.offset || $(this).index() > (option.offset + option.perPage - 1)) ?
						$(this).hide() : $(this).show();
				});
			};
		};
		
		function navLinks() {
	
			nav = $('.jq-pagination-nav', handle);
				nav.empty();
				
			if (option.navLinks != 'min' && currPage!= 1) {
				nav.append('<a class="jq-pagination-nav-key" title="' +option.navTitle.first+ '" data-pageoffset="0" >&laquo; First</a>');
			};
			
			if (option.offset > 0) 
				nav.append('<a class="jq-pagination-prev-key" title="' + option.navTitle.prev + '">' + option.prevLabel+ '</a>');
				
			if (option.showCurrent && (option.navLinks == 'min' || option.navLinks == 'mod')) {
				
				title = (option.navTitle.current).replace('%i', currPage);
				nav.append('<a class="jq-pagination-current-key" title="' +title+ '" data-pageoffset="'+currPage+'">' + currPage + '</a>');							
			
			};
			
			if (option.navLinks == 'max') {
				
				if (option.maxPageLinks==0 || numPages <= option.maxPageLinks) {
					
					for (i = 0, j=1; i < count; i += option.perPage, j++) {
						if (i==option.offset) {
							
							title = (option.navTitle.current).replace('%i', j);
							nav.append('<a class="jq-pagination-current-key" title="' +title+ '" data-pageoffset="">' + j + '</a>');		
						} else {
							
							title = (option.navTitle.page).replace('%i', j);
							nav.append('<a class="jq-pagination-nav-key" title="' +title+ '" data-pageoffset="'+i+'" >' + j + '</a>');
						};
					};
					
				} else {
					maxlc = Math.ceil(option.maxPageLinks/2);
					maxlf = Math.floor(option.maxPageLinks/2);
					left = (currPage - maxlf) > 0 ? currPage - maxlf : 1;
					right = (currPage + maxlc) < numPages ? currPage + maxlc - 1 : numPages;
					
					for (i = left; i <= right; i++) {
						if (i==currPage) {
							
							title = (option.navTitle.current).replace('%i', i);
							nav.append('<a class="jq-pagination-current-key" title="' +title+ '" data-pageoffset="">' + i + '</a>')							
						
						} else {
							
							title = (option.navTitle.page).replace('%i', i);
						nav.append('<a class="jq-pagination-nav-key" title="' +title+ '" data-pageoffset="'+((i - 1) * option.perPage)+'" >' + i + '</a>');
						};
						
					};
				};
			};
			
			if (option.offset < (count - option.perPage)) 
				nav.append('<a class="jq-pagination-next-key" title="' + option.navTitle.next + '" data-pageoffset="" >' + option.nextLabel+ '</a>');
				
			if (option.navLinks != 'min' && currPage!= numPages) {
				
				nav.append('<a class="jq-pagination-nav-key" title="' +option.navTitle.last+ '" data-pageoffset="'+ ((numPages - 1) * option.perPage) +'" >Last &raquo;</a>');
			};
	
		};
		
		function parseFormat(format){
			format = format.replace(/^[\/]+/, '');
			if (format.indexOf('&') > -1 && format[0] != '?') format = '?' + format;
			
			var isget = format.indexOf('&') > -1 && format.indexOf('/') == -1,
				os = (option.ajax.offset && isget) ? option.ajax.offset + '=' + option.offset : option.offset,
				ps = (option.ajax.perpage && isget) ? option.ajax.perpage + '=' + option.perPage : option.perPage,
				cs = (option.ajax.currpage && isget) ? option.ajax.currpage + '=' + currPage : currPage;
			
			return format.replace('offset', os).replace('perpage', ps).replace('currpage', cs);
		};
	
	}; 
	
	
	
})(jQuery);
