
$(document).ready(function(){
 
    haeOttelutPyyntö();
    haePelaajatPyyntö();
    haeOtteluPyyntö();

  
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
            var compiledtemplate = Handlebars.compile(source);



            $("#tulevatOttelut").html(compiledtemplate({vastustaja: data.vastustaja, paiva: muokPaiva, aika: muokAika, kotiVieras: muokkotiVieras}));
        }else{
            var source   = $("#haeSeuraavaOtteluTemplate").html();
            var compiledtemplate = Handlebars.compile(source);
            $("#tulevatOttelut").html(compiledtemplate({vastustaja: "Ei dataa", paiva: "Ei dataa", aika: "Ei dataa", kotiVieras: "Ei dataa"}));
        }
        }
    })
}

function haePelaajatPyyntö(){
    var pelaaja = [];
    $.ajax({
        method: "get",
        url: '/pelaaja/pelaajaHaku',
        success: function (data) {
                for (var i = 0; i < data.length; i++) {
      pelaaja.push({nimi: data[i].nimi, pelinumero: data[i].pelinumero, katisyys: data[i].katisyys, pelipaikka: data[i].pelipaikka, motto: data[i].motto});
                  }

  
            var source   = $("#pelaajatTemplate").html();

            var compiledtemplate = Handlebars.compile(source);



            $("#pelaajat").html(compiledtemplate(pelaaja));

        }
    })
}
function haeOtteluPyyntö(){
    var ottelut = [];
    $.ajax({
        method: "get",
        url: '/ottelut/otteluHaku',
        success: function (data) {
                for (var i = 0; i < data.length; i++) {
       
                    var muokAika = data[0].aika.substring(0,16);
                    var muokkotiVieras = "";
                    if(data[i].kotipeli == "on"){
                    muokkotiVieras = "Koti";
                     }
                    else{
                    muokkotiVieras = "Vieras";
                    }
              
                    ottelut.push({vastustaja: data[i].vastustaja, aika: muokAika, kotipeli: muokkotiVieras, lopputulos: data[i].lopputulos});
                  }

                  alert(ottelut);
            var source   = $("#ottelutTableTemplate").html();
            var compiledtemplate = Handlebars.compile(source);




            $("#ottelut").html(compiledtemplate(ottelut));

        }
    })
}