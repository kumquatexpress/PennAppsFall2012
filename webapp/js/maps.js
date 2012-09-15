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









/*



      var map, infoBubble;
      function init() {
        var mapCenter = new google.maps.LatLng(-35.397, 150.644);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: mapCenter,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(-35, 150),
          draggable: true
        });

        var contentString = '<div id="content">'+
        '<h1>Uluru</h1>'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>';

        infoBubble = new InfoBubble({
          maxWidth: 300
        });

        infoBubble2 = new InfoBubble({
          map: map,
          content: '<div class="phoneytext">Some label</div>',
          position: new google.maps.LatLng(-35, 151),
          shadowStyle: 1,
          padding: 0,
          backgroundColor: 'rgb(57,57,57)',
          borderRadius: 4,
          arrowSize: 10,
          borderWidth: 1,
          borderColor: '#2c2c2c',
          disableAutoPan: true,
          hideCloseButton: true,
          arrowPosition: 30,
          backgroundClassName: 'phoney',
          arrowStyle: 2
        });

        infoBubble.open(map, marker);
        infoBubble2.open();

        var div = document.createElement('DIV');
        div.innerHTML = 'Hello';


        google.maps.event.addListener(marker, 'click', function() {
          if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);
          }
          });

        google.maps.event.addDomListener(document.getElementById('update'),
            'click', updateStyles);
        google.maps.event.addDomListener(document.getElementById('open'),
            'click', function() {
            infoBubble2.open();
        });
        google.maps.event.addDomListener(document.getElementById('close'),
            'click', function() {
          infoBubble2.close();
        });

      }
      google.maps.event.addDomListener(window, 'load', init);

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



*/
