function search_true() {
    $('#sidebar').fadeIn();
    $('.overlay').each(function() {
                $(this).fadeOut();
        });
    $('.results').html("<img class='loading' src='img/loading.gif'/>");
}
function search_false() {
    $('#search_input').animate({margin: '45% 31% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 30% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 31% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 30% 0%'},100,function(){});
}
function sublet_details() {
    $('.sublet').click(function() {
        $('.storage').html($('.results').html());
        $('.results').html("<img class='loading' src='img/loading.gif'/>");
            
            $.getJSON('/sublets.php', {'id': $(this).find('.identifier').text()}, function(data){
                console.log('sublet loaded');
                console.log(data);
                pan_map(data.info.lat,data.info.lon);
                $('.controls .search').toggle();
                $('.controls .back').toggle();
                var crimes = "<div class='crime-box'>";
                for(var i=0;i<data.crime.crimes.length;i++) {
                    var crime = data.crime.crimes[i];
                    crimes += "<div class='crime'><img src='"+crime.type+".png'/>"+crime.address+" at "+crime.time+"</div>";
                }
                crimes += "</div>";
                $('.results').html(
                    "<div class='sublet-detail'>"+
                    "<div class='title'>"+data.info.description+"</div>"+
                    "<div class='crime-data'>"+crimes+"</div>"+
                    "</div>"
                );
            });
        });
}
$(document).ready(function() {
    $('#search_form').submit(function() {
          event.preventDefault();
          search($('#search_input').val());
      });
    $('#search_input').focus();
    $('.controls .search').click(function(){
          $('#search_input').val('');
          $('#sidebar').fadeOut();
          $('.results').text('');
          $('.overlay').each(function(){
              $(this).fadeIn();
          });
    });
    $('.controls .back').click(function(){
          $(this).toggle();
          $('.controls .search').toggle();
          $('.results').html($('.storage').html());
        sublet_details(); 
   });
});