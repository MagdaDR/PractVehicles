// Funcionament general --------------------------------------------
let plate = <HTMLInputElement>document.getElementById("plateId");
let brand = <HTMLInputElement>document.getElementById("brandId");
let color = <HTMLInputElement>document.getElementById("colorId");
let wheelValidate: boolean = false;
let errWheel = <HTMLInputElement>document.getElementById("errWheelId");
let myCar:Car;
let myWheel: Wheel;

// Funcionament Botó Cotxes --------------------------------------------
function carSubmit(){

    
    let plate = <HTMLInputElement>document.getElementById("plateId");
    let brand = <HTMLInputElement>document.getElementById("brandId");
    let color = <HTMLInputElement>document.getElementById("colorId");
    let matriculaOk: Boolean = validarMatricula(plate.value);

    let errPlate = <HTMLInputElement>document.getElementById('errPlateId');
    let errBrand = <HTMLInputElement>document.getElementById('errBrandId');
    let errColor = <HTMLInputElement>document.getElementById('errColorId');

    
    if (plate.value && brand.value && color.value && matriculaOk) {
        errPlate.innerHTML = "";
        errBrand.innerHTML = "";
        errColor.innerHTML = "";
        document.getElementById('wheelsId').style.display = "block"; //torna visible form Rodes
        document.getElementById('carId').style.display = "none";     //fer desapareixer form cotxe
                
        myCar=new Car(plate.value,color.value,brand.value); 
        mostrarCotxe();       // mostrar info cotxe

    }else {
        if (matriculaOk) {
            errPlate.innerHTML = "";
        } else {
            errPlate.innerHTML = "format de matrícula incorrecte"; 
        }
        if (!brand.value) {
            errBrand.innerHTML = "la marca no pot quedar buida";
        }else{
            errBrand.innerHTML = "";
        }
        if (!color.value) {
            errColor.innerHTML = "el color no pot quedar buit";
        }else{
            errColor.innerHTML = "";
        }    
    }
    

}

function validarMatricula(plate: any){
    const RegExp = /^\d{4}-?[a-z]{3}$/i;
    let okPlate = RegExp.test(plate);   //The test() method returns true if it finds a match
    
    return okPlate;

}


// Funcionament botó Rodes --------------------------------------------
function wheelsSubmit(){

    let wheelsFormId = <HTMLInputElement>document.getElementById("wheelsFormId");
    var i = 1;  
    let wheelBrand: any = "";
    let wheelDiameter: any = "";

    for (var i = 1; i <= 4; i++) {

        wheelBrand    = <HTMLInputElement>document.getElementById("brand" + i +"Id");
        wheelDiameter = <HTMLInputElement>document.getElementById("wheel" + i +"Id");
        //document.getElementById('wheelsId').style.display = "none";     //fer desapareixer form rodes        
        
        //validar camps buits a les rodes        
        validarRodes(wheelBrand.value, wheelDiameter.value);
        
        if (!wheelValidate) {
            wheelValidate = false;
            errWheel.innerHTML = "no es pot deixar el camp buit";

            break;
        }
        // diameter validation
        let valDiamResult =  validarDiametreRodes(Number(wheelDiameter.value));
        if (!valDiamResult) {
            wheelValidate = false;
            errWheel.innerHTML = "el diàmetre ha de ser entre 0.4 i 4";

            break;
        }

        


    }
    
    // si tot ok carregar dades a la classe  
    if (valDiamResult && wheelValidate){ 
        errWheel.innerHTML = ""
        for (var i = 1; i <= 4; i++){
            wheelBrand    = <HTMLInputElement>document.getElementById("brand" + i +"Id");
            wheelDiameter = <HTMLInputElement>document.getElementById("wheel" + i +"Id");
            myWheel = new Wheel(Number(wheelDiameter.value), String(wheelBrand.value));  //instanciar
            myCar.addWheel(myWheel); // afegir marca i diametre 
        }
        document.getElementById('wheelsId').style.display = "none"; //torna invisible form Rodes 
        mostraRodes();      // mostrar dades entrades de rodes

    

    }
    

}

function validarRodes(wheelBrand: any, wheelDiameter: any) {

    if ( wheelBrand != "" && wheelDiameter != ""  ) {  //&& !(/\s/.test(wheelBrand)) && !(/\s/.test(wheelDiameter)) si volem controlar espais en blanc
        errWheel.innerHTML = "";

        return wheelValidate = true;
        
    } else {

        errWheel.innerHTML = "no es pot deixar el camp buit";
        return wheelValidate = false;
    }
}

function validarDiametreRodes(diameterValue: number):boolean {

    if ((diameterValue > 0.4) && (diameterValue < 4)) {
        return true;
    } else {
        return false; 
    }
}


function mostrarCotxe() {

    let escriureCotxe = <HTMLInputElement>document.getElementById('carInfo');
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
    let mostrarInfo: string = "";
    let escriureRodes = <HTMLInputElement>document.getElementById("wheelsInfo");
      
    for (var i = 0; i <= 3; i++) {
        let roda: string = myCar.wheels[i].brand;
        mostrarInfo += 
            "<tr><td>" + roda + "</td> " +
            "<td>" + myCar.wheels[i].diameter + "</td></tr>";
    }
    escriureRodes.innerHTML =
        "<table class='table table-striped table-hover'>" +
        "<thead><tr><th>Marca</th><th>Diametre</th></thead>" +
        "<tbody>" + mostrarInfo + "</tbody></table>";
   
}

