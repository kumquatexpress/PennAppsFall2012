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
echo $query;
$q = mysql_query($query,$conn) or die(mysql_error());
while($point = mysql_fetch_assoc($q)) {
    var_dump($point);
}
?>
