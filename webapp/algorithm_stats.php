<?php
error_reporting(E_ALL);
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
$query = "SELECT * FROM points";
$q = mysql_query($query,$conn) or die(mysql_error());
$points = array();
while($point = mysql_fetch_assoc($q)) {
    $points[] = $point['level'];
}
echo "Sum: " . array_sum($points) . "<br>";
echo "Average: " . array_sum($points) / count($points) . "<br>";
$sorted = sort($points);
echo "Median: " . $points[round(count($points)/2)] . "<br>";
echo "LQ: " . $points[round(count($points)/4)] . "<br>";
echo "UQ: " . $points[round(count($points)/4*3)] . "<br>";
?>
