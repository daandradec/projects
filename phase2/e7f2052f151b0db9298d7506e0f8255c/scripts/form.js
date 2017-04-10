function FormValidate() {
    document.getElementById("puto").innerHTML="asdasasdasd";
    console.log("plox");
    var inpObj = document.getElementById("budget");
    if (inpObj.checkValidity() == false) {
        document.getElementById("demo").innerHTML = inpObj.validationMessage;
    } else {
        document.getElementById("demo").innerHTML = "Input OK";
    }
}
