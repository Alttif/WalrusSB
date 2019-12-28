$(document).ready(function(){
 
    haeOttelutPyyntö();


  
});




$(function() {

    $(".btn").on("click", function() {
      //hide all sections
      $(".content-section").hide();
      //show the section depending on which button was clicked
      $("#" + $(this).attr("data-section")).show();
    });
  
  });

  function haeOttelutPyyntö(){


    $.ajax({
        method: "get",
        url: '/ottelut/seuraavaOttelu',
        success: function (data) {
            alert(data.vastustaja);
            if(data){

            var strPaiva = data.aika.toString();         
            var muokPaiva = strPaiva.substring(0,10);
            var strAika = data.aika.toString();
            var muokAika = data.aika.substring(11,16);
            var muokkotiVieras = "";
            if(data.kotipeli == "true"){
                muokkotiVieras = "Koti";
            }
            else{
                muokkotiVieras = "Vieras";
            }

            
            var source   = $("#haeSeuraavaOtteluTemplate").html();
            console.log(source);
            var compiledtemplate = Handlebars.compile(source);



            $("#tulevatOttelut").html(compiledtemplate({vastustaja: data.vastustaja, paiva: muokPaiva, aika: muokAika, kotiVieras: muokkotiVieras}));
        }else{
            var source   = $("#haeSeuraavaOtteluTemplate").html();
            console.log(source);
            var compiledtemplate = Handlebars.compile(source);
            $("#tulevatOttelut").html(compiledtemplate({vastustaja: "Ei dataa", paiva: "Ei dataa", aika: "Ei dataa", kotiVieras: "Ei dataa"}));
        }
        }
    })
}