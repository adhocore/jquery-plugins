<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>JavaScript jQuery plugin Demos | Adhocore &raquo; Jitendra Adhikari</title>



<link rel="stylesheet" href="css/style.css" media="all" />
<link rel="stylesheet" href="css/jDatepicker.css" media="all" />
</head>

<body>
<div id="ground">
	<h2>Click on the title to expand or collapse block</h2>
	
	<div id="pagination">
	<fieldset>
	<legend class="slide">jPagination Demo</legend>
		<div class="toggle">
			<fieldset>
			<legend class="slide">1. without ajax</legend>
				<div id="pager" class="toggle">
				<?php 
					for ($i = 1; $i < 106; $i++) 
						echo "<div class=\"item\">static item {$i}</div> \n";
				?>
				</div>
			</fieldset>
			
			<fieldset>
			<legend class="slide">2. with ajax </legend>
				<div id="pager-ajax" class="toggle">
				</div>
			</fieldset>
		</div>
	</fieldset>
	</div>

	<div id="datepicker">
		<fieldset>
		<legend class="slide">Nepali(BS) jDatepicker Demo</legend>
		<div class="toggle">
			<div class="input"><span class="label">Nepali Date: </span><input id="np-datepicker" type="text"/> </div>
			<div class="input"><span class="label">English Date: </span><input id="dateAD" type="text" readonly="readonly" placeholder="filled by jDatepicker"/> </div>
		</div>
		</fieldset>
	</div>

	<div id="replenish">
	<fieldset>
	<legend class="slide">Replenish Demo</legend>
		<div class="toggle">
			<fieldset>
			<legend class="slide">1. without HTML5</legend>
				<form id="fill" class="toggle">
					<div class="input"><span class="label"> Text </span> <input type="text" class="required" /> </div>
					<div class="input"><span class="label">URL</span> <input type="text" class="url required"/> </div>
					<div class="input"><span class="label">Date </span><input type="text" class="date required"/> </div> 
					<div style="clear:both"></div>
					<div class="input"><span class="label">Email</span> <input type="text" class="email required"/> </div>
					<div class="input"><span class="label">Number</span> <input type="text" class="number required" /> </div>
					<div class="input"><span class="label">Combo</span> <select class="required">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option></select>
					</div>
					<div style="clear:both"></div>
					<span class="label"> Textarea  </span><textarea class="required" rows="4" style="width:99%"></textarea>
					<br/>
					<input type="submit" value="Submit" />
				</form>
			</fieldset>
			
			<fieldset>
			<legend class="slide">2. with HTML5</legend>
				<form id="fill1" class="toggle">
					<div class="input"><span class="label"> Text </span> <input type="text" required="required" /> </div>
					<div class="input"><span class="label">URL </span><input type="url" required="required"/> </div>
					<div class="input"><span class="label">Date </span><input type="date" required="required"/> </div>
					<div style="clear:both"></div>
					<div class="input"><span class="label">Email </span><input type="email" required="required"/> </div>
					<div class="input"><span class="label">Number</span> <input type="number" required="required" /> </div>
					<div class="input"><span class="label">Combo </span><select required="required">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option></select>
					 </div>
					<div style="clear:both"></div>
					<span class="label">Textarea </span><textarea required="required" rows="4" style="width:99%"></textarea>
					<br/>
					<input type="submit" value="Submit"/>
				</form>
			</fieldset>
		</div>
	</fieldset>
	</div>
	
	<div id="float-top">
	<fieldset>
	<legend class="slide-not">FloatTop Demo</legend>
		<div class="toggle">
		<h4>The boxes for this demo are dynamically generated (by PHP script) and have varying heights</h4>
			<div class="boxwrap">
				<?php 
					$pool = 'abcdefghijklmnopqrstuvwxyz';
					for ($i = 1; $i < 15; $i++): ?>
					<div class="box">
					<?php
						$str = '';
						$len = mt_rand(80, 360);
						
						while ( $len > strlen($str) )
							$str .= substr($pool, mt_rand(0, 25), 1) . " ";
						
						echo "<span> {$str} </span>";
					?>		
					</div>
				<?php endfor;?>
			</div>
			<br/> 
			<div style="clear: both;"></div>
		<input type="button" id="toggle-float" value="Remove floatTop" />
</div>
	</fieldset>
	</div>
	
	<h3>&copy; 2012 - 2013 &mdash; adhocore | Jitendra Adhikari</h3>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/jReplenish.js" type="text/javascript"></script>
<script src="js/jFloatTop.js" type="text/javascript"></script>
<script src="js/jPaginate.js" type="text/javascript"></script>
<script src="js/jDatepicker.js" type="text/javascript"></script>

<script>
$(function(){
	
	$('.slide').click(function(){
		$(this).parent().children('.toggle').slideToggle('slow');
	});
	
	$('#np-datepicker').jDatepicker({separator: '-', ADelm: 'dateAD'});
	
	$('#fill').jReplenish();

	$('#fill1').jReplenish();
	
	$('#pager').jPaginate({startPage: 3, perPage: 12});
	
	
	$('#pager-ajax').jPaginate({
		perPage: 12,
		maxPageLinks: 15,
		ajax: {
			baseurl: 'paging-ajax-demo.php',
			format: 'offset&perpage',
			total: 105,
			offset: 'start',
			perpage: 'limit',
			currpage: 'page'
			}
	});

	$('.boxwrap').jFloatTop({
		itemClass:'box',
		col: 4, gap: 10
	});

	$('#toggle-float').click(function(){
		$(this).toggleClass('added');	
		if ($(this).hasClass('added')){
		    $('.boxwrap .box').each(function(j, a){
				$(this).attr('style', 'float: left; width: 20%;');
		    });
		    $(this).val('Add floatTop');
		} else {
			$('.boxwrap').jFloatTop({
				itemClass:'box',
				col: 4, gap: 10
			});
			$(this).val('Remove floatTop');
		}	    
	});

});
</script>
</body>
</html>
