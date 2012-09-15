function search_true() {
    $('#sidebar').fadeIn();
    $('.overlay').each(function() {
                $(this).fadeOut();
        });
}
function search_false() {
    $('#search_input').animate({margin: '45% 31% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 30% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 31% 0%'},100,function(){});
    $('#search_input').animate({margin: '45% 30% 0%'},100,function(){});
}
function sublet_details() {
    $('.sublet').click(function() {
            $.getJSON('/sublets.php', {'id': $(this).find('.identifier').text()}, function(data){
                console.log('sublet loaded');
                console.log(data);
                $('.controls .search').toggle();
                $('.controls .back').toggle();
                $('.storage').html($('.results').html());
                $('.results').html(
                    "<div class='title'>"+data.info.description+"</div>"
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
    });
    $('.controls .back').click(function(){
          $(this).toggle();
          $('.controls .search').toggle();
          $('.results').html($('.storage').html());
        sublet_details(); 
   });
});