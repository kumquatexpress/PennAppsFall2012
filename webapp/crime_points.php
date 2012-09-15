<?php
error_reporting(E_ALL);
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
$q = mysql_query("SELECT * FROM crimes",$conn) or die(mysql_error());

var_dump($results);
?>
