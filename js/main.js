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



// Carga Banco de preguntas desde Archivo JSON

var preguntasJSON = {};
var preguntas = {};

$.getJSON('js/data.json', function(data, status) { 
    preguntasJSON = data;

    // Seteo del tema por default
    // preguntas = preguntasJSON.preguntas_anything; 
    preguntas = preguntasJSON.translation_list_41_imperativos; 

    resetearPreguntas();
})



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
            // preguntas = preguntas_anything;
            preguntas = preguntasJSON.preguntas_anything;
            break;

        case 'presente_continuo':
            preguntas = preguntasJSON.presente_continuo;
            break;

        case 'class_121_verbos_terminan_ch':
            preguntas = preguntasJSON.class_121_verbos_terminan_ch;
            break;

        case 'translation_list_38':
            preguntas = preguntasJSON.translation_list_38;
            break;

        case 'class_120_to_take_off_and_to_put_on':
            preguntas = preguntasJSON.class_120_to_take_off_and_to_put_on;
            break;

        case 'class_119_to_take_out_and_to_put_into':
            preguntas = preguntasJSON.class_119_to_take_out_and_to_put_into;
            break;

        case 'translation_list_41_imperativos':
            preguntas = preguntasJSON.translation_list_41_imperativos;
            break;

        case 'translation_list_42':
            preguntas = preguntasJSON.translation_list_42;
            break;

    }    

    disponibles=[];
    resetearPreguntas();    

})



// Seleccion aleatoria de un elemento en disponibles[]

function generarAleatorio(){
    var item = Math.floor(Math.random() * disponibles.length);
    return item;
}



// Elimina de disponible[] la pregunta generada actualmente
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



// Genera preguntas a partir de las que quedan disponibles
// (las que aun no se han elejigo) 

function generarPreguntas(){ 

    // Si existen mas preguntas disponibles

    if(disponibles.length>0){
        let item = generarAleatorio();
        let itemPreguntas = disponibles[item];
        
        // Muestra la pregunta
        resultado.innerHTML = preguntas[itemPreguntas]["question"];
        resultado.style.color = "black";  

        // Prepara la respuesta para que el usuario la muestre/oculte
        answer.innerHTML = btnDismissHTML + preguntas[itemPreguntas]["answer"] ;

        // Mantiene/Anula la configuracion de usuario mostrar/ocultar respuesta
        answer.style.display = "block";

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
        resetearPreguntas();
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
    answer.style.color = "#B7B9BF";
}