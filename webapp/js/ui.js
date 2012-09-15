$(document).ready(function() {
    $('#search_form').submit(function() {
          event.preventDefault();
          search($('#search_input').val());
          $('.overlay').each(function() {
                        $(this).fadeOut();
                });
          $('#map_canvas').animate({width: "75%"},2000,function(){
                $('#sidebar').css('z-index','1');
          });
      });
    $('#search_input').focus();
    $('.sublet').hover(function() {
        $(this).toggleClass('hovered');
        $(this).animate({height: "100px"},300);
    }, function(){
        $(this).animate({height: "60px"},300,function() {
            $(this).toggleClass('hovered');
        });
    });
});