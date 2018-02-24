const boton = document.querySelector('#generar');
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");
const resetear = document.getElementById("resetear");
var count = 0;
var elementoAnterior;

boton.addEventListener('click', function(){
    
    // pronombres aleatorios
    var pronombreRandom;

    var pronombresPersonales = ["I'm ***** myself", "You're ***** yourself", "He's ***** himself", "She's ***** herself", "We're ***** ourselves", "They're ***** themselves"];
    //var pronombresPersonales = ["I'm", "You're", "He's", "She's", "We're", "They're"];
    
    var elementoNuevo = Math.floor(Math.random() * pronombresPersonales.length);

    // Caso en el que el elemento seleccionado aleatoriamene se vuelve a repetir
    if (elementoNuevo == elementoAnterior){
        console.info('se repitio el elemento seleccionado y se seleccionara otro aleatoriamente');
        elementoNuevo = Math.floor(Math.random() * pronombresPersonales.length);
        // Caso en el que el numero aleatorio se repite por tercera vez
        if(elementoNuevo == elementoAnterior){
            console.error('se repitio el elemento seleccionado por tercera vez y se seleccionara otro aleatoriamente');
            elementoNuevo = Math.floor(Math.random() * pronombresPersonales.length);
        }
    }

    var pronombreRandom = pronombresPersonales[elementoNuevo];
    elementoAnterior = elementoNuevo;
    console.log(pronombreRandom);  
    resultado.innerHTML = pronombreRandom;
    resultado.style.color = "black";
    
    // contador
    count += 1;
    console.log(count);
    contador.innerHTML = "# " + count; 
 
})

resetear.addEventListener('click', function(){
    count = 0;
    console.log(count);
    contador.innerHTML = 0;
    resultado.innerHTML = "Haga clic en \"Generar\"";
    resultado.style.color = "gray";
})
