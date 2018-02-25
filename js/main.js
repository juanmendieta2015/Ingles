const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");
const resetear = document.getElementById("resetear");
const btnGenerarPregunta = document.getElementById("generarPregunta");

var count = 0;

// Base de Datos de preguntas
preguntas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

/**
* Almacena los indices que van quedando "disponibles"  del array preguntas[], 
* esto es para evitar seleccionar dos veces una misma pregunta, se usa de modo 
* "auxiliar", ya que se aplica una funcion sobre al array disponibles[] para escoger 
* de manera aleatoria un elemento (el cual contienen los indices de preguntas[] es decir de 0 a N)
*/
disponibles=[];
resetearPreguntas();
console.log(preguntas);




resetear.addEventListener('click', function(){
    count = 0;
    console.log(count);
    contador.innerHTML = 0;
    resultado.innerHTML = "Haga clic en \"Generar\"";
    resultado.style.color = "gray";

    resetearPreguntas();

})



btnGenerarPregunta.addEventListener('click', function(){
    //console.log("btnGenerarPregunta...");
    if(disponibles.length>0){
        let item = generarAleatorio();
        let itemPreguntas = disponibles[item];
        console.log(preguntas[itemPreguntas]);

        //var pronombreRandom = pronombresPersonales[elementoNuevo];
        //console.log(pronombreRandom);  
        resultado.innerHTML = preguntas[itemPreguntas];
        resultado.style.color = "black";  

        // contador
        count += 1;
        //console.log(count);
        contador.innerHTML =  count + "/" + preguntas.length;        

        eliminarElemento(item);

    } else{
        console.warn("no existen más preguntas");
    }

  
})



/** 
* Selecciona aleatoriamente un elemento del array disponibles[]
*/

function generarAleatorio(){
    //console.log("generarAleatorio()...");
    var item = Math.floor(Math.random() * disponibles.length);
    return item;
}



/**
 * Borra un elemento en el array disponibles[], cuyo elemento
 * ya haya sido utilizado al mostrar la pregunta.
 * Esto para evitar repetir una pregunta al seleccionarla aleatoriamente 
 * mas adelante
 */
function eliminarElemento(item){
    //console.log("eliminarElemento()...");
    let value = disponibles[item];
    if (item > -1) {
        disponibles.splice(item, 1);
    } 
}


/**
 * Resetea el array disponibles[]
 */

function resetearPreguntas(){
    disponibles = [];
    preguntas.forEach(function(element, index){
        disponibles[index] = index;
    });
}