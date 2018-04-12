const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");
const resetear = document.getElementById("resetear");
const btnGenerarPregunta = document.getElementById("generarPregunta");
const notification = document.getElementById("notification");
const body = document.getElementById("body");
const answer = document.getElementById("answer");
const percent = document.getElementById("percent");
const topic_title = document.getElementById("topic_title");
const cbmTopicId = document.getElementById("topic_id");

var count = 0;
var new_percent = 0;
var btnDismissHTML =    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                        '</button>';

// Oculta la respuesta
answer.style.display = "none";              

// Almacena los indices de las preguntas que van quedando disponibles
// para su seleccion aleatoria
disponibles=[];


// Banco de preguntas por Temas


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

preguntas_presente_coninuo = [
    ["¿Qué estas haciendo?", "What are you doing?"],
    ["¿Dónde irás esta noche?", "What are you going tonight?"],
    ["¿Qué harás el viernes en la noche?", "What are you doing on Friday night?"],
    ["¿Qué harás en navidad?", "What are you doing for Christmans?"],
    ["¿Que harás en Halloween?", "What are you doing for Halloween?"],
    ["No haré nada especial", "I'm not doing anything special"],
    ["¿Qué harás mañana por la noche?", "What are you doing tomorrow night?"],
    ["¿Qué harás en verano?", "What are you doing for summer?"],
    ["¿Qué harás esta noche?", "What are you doing tonight?"],
];

// Banco de preguntas por default
preguntas = preguntas_anything;            

resetearPreguntas();


// Boton Resetear 

resetear.addEventListener('click', function(){
    resetearPreguntas();
})


// Boton Generar

btnGenerarPregunta.addEventListener('click', function(){
    generarPreguntas();
})


// Captura eventos keydown

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

    if (x == 96) {  // 96 is the 0 key
        resetearPreguntas();
    }  
    
})


// Dropdown de temas

cbmTopicId.addEventListener('change', function(){

    switch (cbmTopicId.value) {

        case 'anything':
            preguntas = preguntas_anything;
            // topic_title.innerHTML = "Anything";
            break;

        case 'presente_continuo':
            preguntas = preguntas_presente_coninuo;
            // topic_title.innerHTML = "Presente Contínuo";
    }    

    disponibles=[];
    resetearPreguntas();    

})



// Selecciona aleatoriamente un elemento del array disponibles[]

function generarAleatorio(){
    var item = Math.floor(Math.random() * disponibles.length);
    return item;
}



// Elimina del array disponible[] la pregunta generada actualmente
// para que no se vuelva ha repetir de la seleccion

function eliminarElemento(item){
    if (item > -1) {
        disponibles.splice(item, 1);
    } 
}



// Resetea el array disponibles[]

function resetearPreguntasDisponibles(){
    disponibles = [];
    preguntas.forEach(function(element, index){
        disponibles[index] = index;
    });
}



// Genera preguntas 

function generarPreguntas(){    
    if(disponibles.length>0){
        let item = generarAleatorio();
        let itemPreguntas = disponibles[item];
        
        // Muestra la pregunta
        resultado.innerHTML = preguntas[itemPreguntas][0];
        resultado.style.color = "black";  

        
        // Prepara la respuesta para que el usuario la muestre/oculte
        answer.innerHTML = btnDismissHTML + "<h2>" + preguntas[itemPreguntas][1] + "</h2>";
        

        // contador
        count += 1;
        

        // Actualiza el porcentaje
        new_percent = Math.round( (count / preguntas.length) * 100 );

        percent.style.width = new_percent + "%";
        percent.innerHTML = new_percent + "%";

        eliminarElemento(item);

    } else{
        console.warn("No existen más preguntas");
        notification.style.display = "block";
    }
}



// Reinicia la generacion de las preguntas 
 
function resetearPreguntas(){
    count = 0;
    resultado.innerHTML = "Haga clic en \"Generar\"";
    resultado.style.color = "gray";
    notification.style.display = "none";
    resetearPreguntasDisponibles();
    percent.style.width = "0%";
    percent.innerHTML = "0%";
    answer.innerHTML =  btnDismissHTML + "<h4>No hay datos para mostrar</h4>";
    answer.style.color = "grey";
}