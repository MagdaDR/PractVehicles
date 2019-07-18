"use strict";
// Funcionament general --------------------------------------------
var plate = document.getElementById("plateId");
var brand = document.getElementById("brandId");
var color = document.getElementById("colorId");
var wheelValidate = false;
var errWheel = document.getElementById("errWheelId");
var myCar;
var myWheel;
// Funcionament Botó Cotxes --------------------------------------------
function carSubmit() {
    var plate = document.getElementById("plateId");
    var brand = document.getElementById("brandId");
    var color = document.getElementById("colorId");
    var matriculaOk = validarMatricula(plate.value);
    var errPlate = document.getElementById('errPlateId');
    var errBrand = document.getElementById('errBrandId');
    var errColor = document.getElementById('errColorId');
    if (plate.value && brand.value && color.value && matriculaOk) {
        errPlate.innerHTML = "";
        errBrand.innerHTML = "";
        errColor.innerHTML = "";
        document.getElementById('wheelsId').style.display = "block"; //torna visible form Rodes
        document.getElementById('carId').style.display = "none"; //fer desapareixer form cotxe
        myCar = new Car(plate.value, color.value, brand.value);
        mostrarCotxe(); // mostrar info cotxe
    }
    else {
        if (matriculaOk) {
            errPlate.innerHTML = "";
        }
        else {
            errPlate.innerHTML = "format de matrícula incorrecte";
        }
        if (!brand.value) {
            errBrand.innerHTML = "la marca no pot quedar buida";
        }
        else {
            errBrand.innerHTML = "";
        }
        if (!color.value) {
            errColor.innerHTML = "el color no pot quedar buit";
        }
        else {
            errColor.innerHTML = "";
        }
    }
}
function validarMatricula(plate) {
    var RegExp = /^\d{4}-?[a-z]{3}$/i;
    var okPlate = RegExp.test(plate); //The test() method returns true if it finds a match
    return okPlate;
}
// Funcionament botó Rodes --------------------------------------------
function wheelsSubmit() {
    var wheelsFormId = document.getElementById("wheelsFormId");
    var i = 1;
    var wheelBrand = "";
    var wheelDiameter = "";
    for (var i = 1; i <= 4; i++) {
        wheelBrand = document.getElementById("brand" + i + "Id");
        wheelDiameter = document.getElementById("wheel" + i + "Id");
        //document.getElementById('wheelsId').style.display = "none";     //fer desapareixer form rodes        
        //validar camps buits a les rodes
        validarRodes(wheelBrand.value, wheelDiameter.value);
        if (!wheelValidate) {
            wheelValidate = false;
            errWheel.innerHTML = "no es pot deixar el camp buit";
            break;
        }
        //check diameter validation
        var valDiamResult = validarDiametreRodes(Number(wheelDiameter.value));
        if (!valDiamResult) {
            wheelValidate = false;
            errWheel.innerHTML = "el diàmetre ha de ser entre 0.4 i 4";
            break;
        }
        // si tot ok carregar dades a la classe
        if (wheelBrand.value && wheelDiameter.value && valDiamResult && wheelValidate) {
            myWheel = new Wheel(Number(wheelDiameter.value), String(wheelBrand.value)); //instanciar
            myCar.addWheel(myWheel); // afegir marca i diametre 
            errWheel.innerHTML = "";
        }
    }
    // si tot ok carregar dades a la classe   
    document.getElementById('wheelsId').style.display = "none"; //torna invisible form Rodes 
    mostraRodes(); // mostrar dades entrades de rodes
}
function validarRodes(wheelBrand, wheelDiameter) {
    if (wheelBrand != "" && wheelDiameter != "") {
        errWheel.innerHTML = "";
        return wheelValidate = true;
    }
    else {
        errWheel.innerHTML = "no es pot deixar el camp buit";
        return wheelValidate = false;
    }
}
function validarDiametreRodes(diameterValue) {
    if ((diameterValue > 0.4) && (diameterValue < 4)) {
        return true;
    }
    else {
        return false;
    }
}
// display car data input to user in a table
function mostrarCotxe() {
    var escriureCotxe = document.getElementById('carInfo');
    escriureCotxe.innerHTML =
        "<table class='table-sm table-striped table-hover '>" +
            "<thead><tr><th>Matrícula</th><th>Marca</th><th>Color</th></tr></thead>" +
            " <tbody><tr>" +
            "<td>" + plate.value + "</td> " +
            "<td>" + brand.value + "</td>" +
            " <td>" + color.value + "</td></tr></tbody>" +
            "</table>";
}
function mostraRodes() {
    var mostrarInfo = "";
    var escriureRodes = document.getElementById("wheelsInfo");
    for (var i = 0; i <= 3; i++) {
        var roda = myCar.wheels[i].brand;
        mostrarInfo +=
            "<tr><td>" + roda + "</td> " +
                "<td>" + myCar.wheels[i].diameter + "</td></tr>";
    }
    escriureRodes.innerHTML =
        "<table class='table table-striped table-hover'>" +
            "<thead><tr><th>Marca</th><th>Diametre</th></thead>" +
            "<tbody>" + mostrarInfo + "</tbody></table>";
}
