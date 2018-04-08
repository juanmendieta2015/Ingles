const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");
const resetear = document.getElementById("resetear");
const btnGenerarPregunta = document.getElementById("generarPregunta");
const notification = document.getElementById("notification");
const body = document.getElementById("body");
const answer = document.getElementById("answer");

var count = 0;

// Base de Datos de preguntas
preguntas_anything = [
    ["¿Quieres algo?", "Do you want anything?"],
    ["¿Vas a decirme algo?", "Are you going to tell me anything?"],
    ["¿Quieren algo?", "Do they want anything?"],
    ["¿Él quiere algo de la tienda?", "Does he want anything from the shop?"],
    ["¿Hay algo en la mesa?", "Is there anything on the table?"],
    ["¿Harás algo esta noche?", "Are you doing anything tonight?"],
    ["¿Hay algo en el piso?", "Is there anything on the floor?"],
    ["¿Tienes algo en tu bolsillo?", "Do you have anything in your pocket?"],
    ["¿Hay algo en tu vaso?", "Is there anything in your glass?"],
    ["¿Necesitan algo del supermercado?", "Do they need anything from the supermarket?"],
    ["¿Tienes algo en tu cartera?",   "Do you have anything in your wallet?"], 
    ["¿Harás algo este fin de semana?", "Are you doing anything this weekend?"]
];

preguntas = preguntas_anything;

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
    notification.style.display = "none";
    resetearPreguntas();

})


btnGenerarPregunta.addEventListener('click', function(){
    generarPreguntas();
})


body.addEventListener('keydown', function(){
    var x = event.keyCode;
    if (x == 97) {  // 97 is the 1 key
        if (answer.style.display === "none") {
            answer.style.display = "block";
        } else{
            answer.style.display = "none";
        }
    }    

    if (x == 13) {  // 13 is the intro key
        generarPreguntas();
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

/**
 * funcion principal, Genera las preguntas 
 */

function generarPreguntas(){
    if(disponibles.length>0){
        let item = generarAleatorio();
        let itemPreguntas = disponibles[item];
        console.log(preguntas[itemPreguntas][0]);
 
        resultado.innerHTML = preguntas[itemPreguntas][0];
        resultado.style.color = "black";  

        // Prepara la respuesta para que el usuario la muestre/oculte
        answer.innerHTML = preguntas[itemPreguntas][1];
        answer.style.display = "none";

        // contador
        count += 1;
        contador.innerHTML =  count + "/" + preguntas.length + " preguntas";  
 
        eliminarElemento(item);

    } else{
        console.warn("no existen más preguntas");
        notification.style.display = "block";
    }
}