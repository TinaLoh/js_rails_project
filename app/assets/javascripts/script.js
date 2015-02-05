$(document).ready(function(){

  $('textarea').on('keypress', function(event) {
    if(event.charCode == 13) {
      event.preventDefault();
      var comment = $(this).val();
      $.ajax({
        url: "/photos/:photo_id/comments",
        type: "post",
        data: {comment: comment}
      })
    }
  })


  $("form").submit(function(event){
    event.preventDefault();
    var url = $("#url").val();
    var caption = $("#caption").val();
    var location = $("#location").val();
    $.ajax({
      url: "/create",
      type: "post",
      data: {photo: {url: url, caption: caption, location: location}}
    })
    .done(function(data){
      var id = data.id;
      var newPhoto = $("<div class='image-container'></div>");
      newPhoto.attr("data-id", id);
      newPhoto.append("<div class='delete pull-right'>X</div>");
      newPhoto.append("<img src=" + url + " style='height: 100px; width: 100px'>");
      newPhoto.append("<h3>" + caption + "</h3>");
      newPhoto.append("<p>taken at " + location + "</p>");
      newPhoto.append("<textarea></textarea>");
      newPhoto.hide();
      $("#photos").append(newPhoto);
      newPhoto.fadeIn();
    });
  });


  $(document).on("click", ".delete", function(){
    var photo = $(this).parent();
    var id = photo.attr("data-id");
    $.ajax({
      url: "/destroy",
      type: "delete",
      data: {id: id}
    })
    .done(function(){
      photo.fadeOut(300, function(){
        photo.remove();
      });
    });
  });

  // animate on click
  $('.image-container img').on('click', function(){
    $(this).animate({width: 500, height: 500}, 1000);
  })

  // de-animate on mouseleave
  $('.image-container img').on('mouseleave', function(){
    $(this).animate({width: 100, height: 100}, 1000);
  })


  // show shadow on hover
  $('.image-container').hover(
    // Mouse In
    function(){
      $(this).children('img').css('box-shadow', '4px 4px 10px rgba(0,0,0,.5)');
    },
    // Mouse Out
    function(){
      $(this).children('img').css('box-shadow', 'none');
    });

});
