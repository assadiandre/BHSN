
    function getData(id) {
      $.ajax({
        type: 'GET',
        data: {"id" :  id },
        url: 'https://bhsn.herokuapp.com/ajaxcall',
        dataType: 'json'
      })
      .done(function(response) {
        $(".overlay").css("display","initial");
        $("body").css("overflow","hidden");
        console.log(response)
        $(".description-header-name").html(response.data.header);

      })
    }

    function closeOverlay() {
      $(".overlay").css("display","none");
      $("body").css("overflow","auto");
    }
