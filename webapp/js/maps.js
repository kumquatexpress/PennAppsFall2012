(function(){

  var map;
  var center_lat = 39.8282;
  var center_long = -98.5795;



  function initialize() {
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(center_lat, center_long),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      backgroundColor: "black"
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);







    eventHandles();

  }

    //handle events
  function eventHandles(){
    //on zoom
    google.maps.event.addListener(map, 'zoom_changed', 
      function() {
        console.log('hi');
        var zoomLevel = map.getZoom();
        map.setCenter(myLatLng);
        infowindow.setContent('Zoom: ' + zoomLevel);
    });
  }


  function generateMarker(latitude, longitude, image_url){
    var location = new google.maps.LatLng(latitude, longitude);

    marker = new google.maps.Marker({
      map:map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: location 
      icon: image
    });

  }




  google.maps.event.addDomListener(window, 'load', initialize);




})();
