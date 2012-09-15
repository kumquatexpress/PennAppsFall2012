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
      draggable:false,
      animation: google.maps.Animation.DROP,
      position: location,
      icon: image_url
    });

    //add mouseover event

    console.log("HIWHFUWHEIFUEWIFH");
    google.maps.event.addListener(marker, 'mouseover',
      function(){

        //alert('hi');

    });

    generateInfo(marker);

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



  function generateInfo(marker){

        var contentString = '<div class="marker-info">hihi</div>';

        infoBubble = new InfoBubble({
          maxWidth: 300,
          content: contentString,
          disableAutoPan: true,
          hideCloseButton: true
        });

        var div = document.createElement('DIV');
        div.innerHTML = 'Hello';


        google.maps.event.addListener(marker, 'mouseover', function() {
          if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);
            updateStyles();
          }
        });
         google.maps.event.addListener(marker, 'mouseout', function() {
          if (infoBubble.isOpen()) {
            infoBubble.close(map, marker);
          }
        });
        

        google.maps.event.addDomListener(document.getElementById('update'),
            'click', updateStyles);
        google.maps.event.addDomListener(document.getElementById('open'),
            'click', function() {
        });
        google.maps.event.addDomListener(document.getElementById('close'),
            'click', function() {
        });

      }

      function updateStyles() {
        var shadowStyle = document.getElementById('shadowstyle').value;
        infoBubble.setShadowStyle(shadowStyle);

        var padding = document.getElementById('padding').value;
        infoBubble.setPadding(padding);

        var borderRadius = document.getElementById('borderRadius').value;
        infoBubble.setBorderRadius(borderRadius);

        var borderWidth = document.getElementById('borderWidth').value;
        infoBubble.setBorderWidth(borderWidth);

        var borderColor = document.getElementById('borderColor').value;
        infoBubble.setBorderColor(borderColor);

        var backgroundColor = document.getElementById('backgroundColor').value;
        infoBubble.setBackgroundColor(backgroundColor);

        var maxWidth = document.getElementById('maxWidth').value;
        infoBubble.setMaxWidth(maxWidth);

        var maxHeight = document.getElementById('maxHeight').value;
        infoBubble.setMaxHeight(maxHeight);

        var minWidth = document.getElementById('minWidth').value;
        infoBubble.setMinWidth(minWidth);

        var minHeight = document.getElementById('minHeight').value;
        infoBubble.setMinHeight(minHeight);

        var arrowSize = document.getElementById('arrowSize').value;
        infoBubble.setArrowSize(arrowSize);

        var arrowPosition = document.getElementById('arrowPosition').value;
        infoBubble.setArrowPosition(arrowPosition);

        var arrowStyle = document.getElementById('arrowStyle').value;
        infoBubble.setArrowStyle(arrowStyle);
      }
  

})();








