<?php
error_reporting(E_ALL);
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
$max_lat = $_GET['max_lat'];
$min_lat = $_GET['min_lat'];
$max_lon = $_GET['max_lon'];
$min_lon = $_GET['min_lon'];
$q_lat = "`lat` >= '$min_lat' AND `lat` <= '$max_lat'";
$q_lon = "`long` >= '$min_lon' AND `long` <= '$max_lon'";
$query = "SELECT * FROM points WHERE $q_lat AND $q_lon ORDER BY `lat` DESC, `long` DESC";
$q = mysql_query($query,$conn) or die(mysql_error());
$points = array();
$skip_val = (mysql_num_rows($q) > 100) ? round(mysql_num_rows($q) / 100) : 1;
$i=0;
while($point = mysql_fetch_assoc($q)) {
    if($i % $skip_val == 0) {
        if($point['level'] >= 80) {
            $url = "img/32/100.png";
        }
        elseif($point['level'] >= 60) {
            $url = "img/32/80.png";
        }
        elseif($point['level'] >= 40) {
            $url = "img/32/60.png";
        }
        elseif($point['level'] >= 20) {
            $url = "img/32/40.png";
        }
        else {
            $url = "img/32/20.png";
        }
        $points[] = array('lat'=>$point['lat'],'lon'=>$point['long'],'url'=>$url);
    }
    $i += 1 + round(rand(0, .8));
}
echo json_encode($points);
?>
