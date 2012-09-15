<?php
error_reporting(E_ALL);
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
$max_lat = $_GET['max_lat'];
$min_lat = $_GET['min_lat'];
$max_lon = $_GET['max_lon'];
$min_lon = $_GET['min_lon'];
$q_lat = "`lat` > '$min_lat' AND `lat` < '$max_lat'";
$q_lon = "`long` > '$min_lon' AND `long` < '$max_lon'";
$query = "SELECT * FROM points WHERE $q_lat AND $q_lon";
$q = mysql_query($query,$conn) or die(mysql_error());
//while($point = mysql_fetch_assoc($q)) {
//    var_dump($point);
//}
$test = array();
$test[] = array('lat'=>39.99,'long'=>-75.11,'url'=>"http://www.sidefx.com/docs/houdini9.5/icons/medium/SOP/circle.png");
$test[] = array('lat'=>39.98,'long'=>-75.17,'url'=>"http://www.sidefx.com/docs/houdini9.5/icons/medium/SOP/circle.png");
$test[] = array('lat'=>39.976,'long'=>-75.15,'url'=>"http://www.sidefx.com/docs/houdini9.5/icons/medium/SOP/circle.png");
$test[] = array('lat'=>39.97,'long'=>-75.16,'url'=>"http://www.sidefx.com/docs/houdini9.5/icons/medium/SOP/circle.png");
echo json_encode($test);
?>
