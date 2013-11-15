<?php 
	
	$offset = isset($_REQUEST['off_set']) ? $_REQUEST['off_set'] : 0;
	$perpage = isset($_REQUEST['per_page']) ? $_REQUEST['per_page'] : 10;
	
	$output = '';
	for ($i = $offset+1; ; $i++) {
		if ($perpage-- == 0) break;
		$output .=  '<p class="item">' .$i. '</p>';
	}
	
	echo $output;

?>