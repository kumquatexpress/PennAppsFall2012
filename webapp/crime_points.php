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
//=================
//CRIME INFORMATION
//=================
$query = "SELECT * FROM crimes WHERE $q_lat AND $q_lon AND `date` > '2012-06' ORDER BY `lat` DESC, `long` DESC";
$q = mysql_query($query,$conn) or die(mysql_error());
$points = array();
while($point = mysql_fetch_assoc($q)) {
    switch($point['crime_type']) {
        case "Shooting":
            $weight = 500;
            break;
        case "Assault":
            $weight = 100;
            break;
        case "Arrest":
            $weight = 50;
            break;
        case "Burglary":
            $weight = 30;
            break;
        case "Robbery":
            $weight = 5;
            break;
        case "Theft":
            $weight = 1;
            break;
        default:
            $weight = 0.1;
            break;
    }
        $points[] = array(
            'lat'=>$point['lat'],
            'lon'=>$point['long'],
            'level'=>$weight
            );
}
//==================
//SUBLET INFORMATION
//==================
$query_sub = "SELECT * FROM houses WHERE $q_lat AND $q_lon AND price > 0 ORDER BY (1 / `level` / `price`) DESC, `lat` DESC, `long` DESC";
$q_sub = mysql_query($query_sub,$conn) or die(mysql_error());
$sublets = array();
while($sublet = mysql_fetch_assoc($q_sub)) {
        if($sublet['level'] > 450) {
            $img = "20.png";
        }
        elseif($sublet['level'] > 350) {
            $img = "40.png";
        }
        elseif($sublet['level'] > 175) {
            $img = "60.png";
        }
        elseif($sublet['level'] > 50) {
            $img = "80.png";
        }
        else {
            $img = "100.png";
        }
        $sublets[] = array(
            'id' => $sublet['id'],
            'price' =>$sublet['price'],
            'size' => strtoupper($size),
            'description' =>$sublet['listing_header'],
            'location'=> $sublet['address'],
            'url' => $sublet['listing_url'],
            'image' => 'img/32/'.$img,
            'lat' => $sublet['lat'],
            'lon' => $sublet['long'],
        );
}
echo json_encode(array('points'=>$points,'sublets'=>$sublets));
?>
