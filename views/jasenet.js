
var muokkaPelaajaPelinumero;
var muokkaOtteluId;

$(document).ready(function(){
 
    //Haetaan sivun latautuessa pelaajat ja ottelut
    haePelaajatPyyntö();
    haeOtteluPyyntö(); 
    
        //Kun pelaajan muokkaus aukeaa
        $("#pelaajanMuokkausModal").bind("show.bs.modal", function (event){
            $.ajax({
                method: "get",
                url: "../pelaaja/muokkaaPelaaja/" + muokkaPelaajaPelinumero,
                success: function(data){
                    $(".modal-body #nimi").val(data[0].nimi);
                    $(".modal-body #pelinumero").val(data[0].pelinumero);
                    if(data[0].katisyys == "Vasen"){
                        $(".modal-body #katisyys1").prop("checked", true);
                    }else{
                        $(".modal-body #katisyys2").prop("checked", true);
                    }
                    if(data[0].pelipaikka == "Maalivahti"){
                        $(".modal-body #val4").attr("selected", "selected");
                    }
                    else if(data[0].pelipaikka == "Puolustaja"){
                        $(".modal-body #val3").attr("selected", "selected");
                    }
                    else if(data[0].pelipaikka == "Hyökkääjä"){
                        $(".modal-body #val2").attr("selected", "selected");
                    } else{
                        $(".modal-body #val1").attr("selected", "selected");
                    }
                    $(".modal-body #motto").val(data[0].motto);             
                },
                error: function(){
                    alert("Virhe Muokkauksessa!");
                }
            })
        });

         //Kun ottelun muokkaus aukeaa
         $("#ottelunMuokkausModal").bind("show.bs.modal", function (event){
            $.ajax({
                method: "get",
                url: "../ottelut/muokkaaOttelu/" + muokkaOtteluId,
                success: function(data){
                    $(".modal-body #vastustaja").val(data.vastustaja);
                    $(".modal-body #aika").val(data.aika);
                    if(data.kotipeli == "on"){
                        $(".modal-body #kotipeli").prop("checked", true);
                    }               
                    $(".modal-body #lopputulos").val(data.lopputulos);             
                },
                error: function(){
                    alert("Virhe Muokkauksessa!");
                }
            })
        });

   
    
});



//Pelaajanmuokkaus modal avaus
function muokkaaPelaaja(pelinumero){
    muokkaPelaajaPelinumero = pelinumero;
    $("#pelaajanMuokkausModal").modal();    
}

//Ottelunmuokkaus modal avaus
function muokkaaOttelu(id){
    muokkaOtteluId = id;
    $("#ottelunMuokkausModal").modal();    
}
//Pelaajan poisto
function poistaPelaaja(pelinumero){
    $.ajax({
        method: "post",
        url: "../pelaaja/poistaPelaaja/" + pelinumero,
        success: function(data){
            haePelaajatPyyntö();
            alert("pelaaja poistettu");
        }
    })
}

//Datasection hallintaa
$(function() {
    $(".btn").on("click", function() {
      //hide all sections
      $(".content-section").hide();
      //show the section depending on which button was clicked
      $("#" + $(this).attr("data-section")).show();
    });  
});

  
//Pelaajien haku tableen
function haePelaajatPyyntö(){
    var pelaaja = [];
    $.ajax({
        method: "get",
        url: '../pelaaja/pelaajaHaku',
        success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    pelaaja.push({_id: data[i]._id, nimi: data[i].nimi, pelinumero: data[i].pelinumero, katisyys: data[i].katisyys, pelipaikka: data[i].pelipaikka, motto: data[i].motto});
                  }
            var source   = $("#pelaajatTableTemplate").html();
            var compiledtemplate = Handlebars.compile(source);
            $("#pelaajat").html(compiledtemplate(pelaaja));
        }
    })
}

//Otteluiden haku tableen
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
                    ottelut.push({_id: data[i]._id, vastustaja: data[i].vastustaja, aika: muokAika, kotipeli: muokkotiVieras, lopputulos: data[i].lopputulos});
                  }
            var source   = $("#ottelutTableTemplate").html();
            var compiledtemplate = Handlebars.compile(source);
            $("#ottelut").html(compiledtemplate(ottelut));
        }
    })
}