var form = document.getElementById("form-validation");
 form.addEventListener("submit", function(event) {          
      if ( document.getElementById("password").value != document.getElementById("password2").value ) {
          alert("Salasanat ei täsmää!");
          event.preventDefault();
          event.stopPropagation();
      }
      else if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);