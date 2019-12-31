
$(document).ready(function(){
    //Haetaan tiedot sivun ladatessa
    haeOttelutPyyntö();
    haePelaajatPyyntö();
    haeOtteluPyyntö();  
});



//Datasection hallinta
$(function() {
    $(".btn").on("click", function() { 
      $(".content-section").hide();
      $("#" + $(this).attr("data-section")).show();
    }); 
});

//Seuraavan ottelun haku 
function haeOttelutPyyntö(){
    $.ajax({
        method: "get",
        url: '/ottelut/seuraavaOttelu',
        success: function (data) {
            if(data){
                var strPaiva = data.aika.toString();         
                var muokPaiva = strPaiva.substring(0,10);
                var muokAika = data.aika.substring(11,16);
                var muokkotiVieras = "";
                if(data.kotipeli == "true"){
                    muokkotiVieras = "Koti";
                }else {
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

//Pelaajien haku tableen
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

//Otteluiden haku tableen
function haeOtteluPyyntö(){
    var ottelut = [];

    $.ajax({
        method: "get",
        url: '/ottelut/otteluHaku',
        success: function (data) {
                for (var i = 0; i < data.length; i++) {      
                    var dt = data[i].aika;
                    var pva = dt.substring(8,10);
                    var kk = dt.substring(5,7);
                    var vuosi = dt.substring(0,4);
                    var tunnit = dt.substring(11,13);
                    var min = data[i].aika.substring(14,16);
                    muokAika = pva + "." + kk + "." + vuosi + " klo " + tunnit+ ":" + min;
                    var muokkotiVieras = "";
                    if(data[i].kotipeli == "on"){
                        muokkotiVieras = "Koti";
                    }
                    else{
                        muokkotiVieras = "Vieras";
                    }              
                    ottelut.push({vastustaja: data[i].vastustaja, aika: muokAika, kotipeli: muokkotiVieras, lopputulos: data[i].lopputulos});
                }                 
            var source   = $("#ottelutTableTemplate").html();
            var compiledtemplate = Handlebars.compile(source);
            $("#ottelut").html(compiledtemplate(ottelut));
        }
    })
}

//Kuvanlisäys jos omaa kuvaa ei löydy
function imgError(id) {
    document.getElementById(id).src = "./images/pelaajat/eikuvaa.jpg"
}


