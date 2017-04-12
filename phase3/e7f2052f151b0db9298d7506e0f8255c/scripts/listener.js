//listeners
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#police_check').addEventListener('change', policeHandler);
      document.querySelector('#librarie_check').addEventListener('change', librarieHandler);
      document.querySelector('#clinic_check').addEventListener('change', clinicHandler);
      document.querySelector('#fire_check').addEventListener('change', fireHandler);
      document.querySelector('#house_check').addEventListener('change', houseHandler);
      document.getElementById("search").addEventListener("click", search);
    //  document.getElementById("boton").addEventListener("click", funcion);
});
