

var upload_image;
var storageService = firebase.storage();
var storageRef = storageService.ref();

function readURL(input) {
   if (input.files && input.files[0]) {
     var reader = new FileReader();
     reader.onload = function (e) {
       $('#uploaded-image')
         .attr('src', e.target.result)
     };
     upload_image = input.files[0];
     reader.readAsDataURL(input.files[0]);
  }
}


function uploadImageData() {
    $.ajax({
      type: 'GET',
      data: {"message" : document.getElementById("post-comment").innerHTML, "category_id":"don't know yet" },
      url: 'http://localhost:3000/uploadSubPostMessage',
      dataType: 'json'
    })
    .done(function(response) {
      var subpost_id = response.data;
      console.log("yes")
      // storageRef.child('sports/' + subpost_id).put(upload_image);
    })

}
