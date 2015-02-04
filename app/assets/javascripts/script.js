
$(document).ready(function(){

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
      newPhoto.append("<div class='delete'>X</div>");
      newPhoto.append("<img src=" + url + " style='height: 100px; width: 100px'>");
      newPhoto.append("<h3>" + caption + "</h3>");
      newPhoto.append("<p>taken at " + location + "</p>");
      newPhoto.hide();
      $("#photos").append(newPhoto);
      newPhoto.fadeIn();
    });
  });


  $(document).on("click", ".delete", function(){
    var photo = $(this).parent();
    var id = photo.attr("data-id");
    console.log(id);
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


  // photo enlarges
  $('.image-container img').hover(
    // Mouse In
    function(){
      $(this).animate({width: 500, height: 500}, 1000);
      $(this).css('border', '5px solid black');
    },
    // Mouse Out
    function(){
        $(this).animate({width: 100, height: 100}, 1000);
    });

});
