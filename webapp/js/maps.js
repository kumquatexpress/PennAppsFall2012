(function(){

  var map;
  var center_lat = 39.8282;
  var center_long = -98.5795;
  var center = new google.maps.LatLng(center_lat, center_long)

  //viewport corners
  var viewport_ne;
  var viewport_sw; 

  function initialize() {
    var mapOptions = {
      zoom: 5,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      backgroundColor: "black"
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    eventHandles();
    generateAllCrimes();

  }

    //handle events
  function eventHandles(){
    //on zoom
    google.maps.event.addListener(map, 'zoom_changed', 
      function() {
        //update viewport corners 
        viewport_ne = map.getBounds().getNorthEast();
        viewport_sw = map.getBounds().getSouthWest();
      
        console.log(viewport_ne);
        console.log(viewport_sw);

        getCrimes();

        console.log('hi');
        var zoomLevel = map.getZoom();
        //infowindow.setContent('Zoom: ' + zoomLevel);
    });
  }


  function generateMarker(latitude, longitude, image_url){
    var location = new google.maps.LatLng(latitude, longitude);

    marker = new google.maps.Marker({
      map:map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: location,
      icon: image_url
    });

  }


  function generateAllCrimes(){
    var data = [{"lat":39.99,"lon":-75.11,"url":"http:\/\/www.sidefx.com\/docs\/houdini9.5\/icons\/medium\/SOP\/circle.png"},{"lat":39.98,"lon":-75.17,"url":"http:\/\/www.sidefx.com\/docs\/houdini9.5\/icons\/medium\/SOP\/circle.png"},{"lat":39.976,"lon":-75.15,"url":"http:\/\/www.sidefx.com\/docs\/houdini9.5\/icons\/medium\/SOP\/circle.png"},{"lat":39.97,"lon":-75.16,"url":"http:\/\/www.sidefx.com\/docs\/houdini9.5\/icons\/medium\/SOP\/circle.png"}]

    /*
    jQuery.getJSON('http://maps.hulce.net/crime_points.php',{},function(data){
      console.log(data); 
    });
    */
    for(point in data) {
        console.log(data[point]);
        generateMarker(data[point].lat,data[point].lon,data[point].url);
    }
  }


  function getCrimes(){
    data = 
    {
      "max_lat": viewport_ne.lat(),
      "min_lat": viewport_sw.lat(),
      "max_lon": viewport_ne.lng(),
      "min_lon": viewport_sw.lng()
    }
    $.getJSON("http://maps.hulce.net/crime_points.php", data, function(data){
      console.log(data);
    });

  }




  google.maps.event.addDomListener(window, 'load', initialize);




})();
