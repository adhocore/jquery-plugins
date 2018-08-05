<?php

$u = explode('/', $_SERVER['REQUEST_URI']);
$s = isset($_REQUEST['start']) ? $_REQUEST['start'] : $u[count($u)-2];
$l = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : $u[count($u)-1];

$o = '';
$t = 105;

for ($i = $s + 1, $j = 0; $j < $l && $i <= $t; $i++, $j++){
    $o .= "<div class=\"item\">ajax loaded item {$i}</div> \n";
}

echo $o;
