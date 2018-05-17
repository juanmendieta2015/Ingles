const resultado             = document.getElementById("resultado");
const contador              = document.getElementById("contador");
const resetear              = document.getElementById("resetear");
const btnShowHideAnswer     = document.getElementById("btnShowHideAnswer");
const btnGenerarPregunta    = document.getElementById("generarPregunta");
const notification          = document.getElementById("notification");
const body                  = document.getElementById("body");
const answer                = document.getElementById("answer");
const percent               = document.getElementById("percent");
const topic_title           = document.getElementById("topic_title");
const cbmTopicId            = document.getElementById("topic_id");
const frmContact            = document.getElementById("form_contact");

//Mensajes
const ERROR_EMAIL           = "Por favor verifique su E-mail, esta incorrecto.";
const ERROR_MESSAGE         = "Ha ocurrido un error, su mensaje no se ha enviado. Por favor intente de nuevo.";
const SUCCESS_MESSAGE       = "¡Gracias por escribirme!. Analizaremos tu petición. :)";
const ERROR_VALIDATION      = "Ha ocurrido un error de validacion, por favor verifique sus datos.";
const ERROR_SERVIDOR        = "No se ha podido establecer conexión con el servidor.";

var count = 0;
var new_percent = 0;
var btnDismissHTML =    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                        '</button>';

// Oculta la respuesta
answer.style.display = "none";  

// Oculta el formuario de contacto
frmContact.style.display = "none"; 



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


// Boton Mostrar/Ocultar Respuesta

btnShowHideAnswer.addEventListener('click', function(){
    showHideAnswer();
})



// Captura eventos keydown

body.addEventListener('keydown', function(){
    var x = event.keyCode;
    if (x == 97 || x == 49) {  // 97 is the 1 key
        showHideAnswer();
    }    

    if (x == 13) {  // 13 is the intro key
        generarPreguntas();
    }     

    if (x == 96 || x == 48) {  // 96 is the 0 key
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
        answer.innerHTML = /*btnDismissHTML +*/ preguntas[itemPreguntas]["answer"] ;

        // Mantiene/Anula la configuracion de usuario mostrar/ocultar respuesta
        // answer.style.display = "block";

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


    $.ajax({
        async:true,
        type: "POST",
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        url:"services/log_generar.php"
    });

    return false;



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
    answer.innerHTML =  /*btnDismissHTML +*/ "<h4>No hay datos para mostrar</h4>";
    answer.style.color = "#738E9B";
}

// Muestra/Oculta la respuesta
function showHideAnswer(){
    if (answer.style.display === "none") {
        answer.style.display = "block";
    } else{
        answer.style.display = "none";
    }
}

var x;
x = $(document);
x.ready(inicializar);  

function inicializar(){
    let btnSendMessage = $("#btnSendMessage");
    btnSendMessage.click(sendMessage);

    $("#showHideContact").click(function(){
        $("#form_contact").toggle('fast');
    });
}

function sendMessage(){

    var name            = $("#name").val();
    var email           = $("#email").val();
    var message         = $("#message").val();


    if ( validateEmail(email) == false ) {

        let response = '<div class="alert alert-danger alert-dismissible" role="alert">' + 
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' + 
                            '</button>' +
                            '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> ' +
                            '<strong>Error! </strong>' + ERROR_EMAIL +
                        '</div>';
        $("#resultadoSendMessage").html(response);         
        return false;
    }

    $.ajax({
        async:true,
        type: "POST",
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        url:"services/send_email.php",
        data:
            "name=" + name + 
            "&email=" + email + 
            "&message=" + message,
        beforeSend:inicioEnvio,
        success: llegada,
        error: problemas
    });


    // Limpia todos los campos de formulario
    document.getElementById("form_contact").reset();

    return false;

}

// Preloader

function inicioEnvio()
{
    $("#loader").addClass("loader"); 
}      



// Muestra confirmacion/error al usuario      

function llegada(datos)
{

    switch(datos) {
        
        // 0: Error de envio de tipo interno, falla con SENGRID, servidor, etc.

        case '0':
            var response = '<div class="alert alert-danger alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> ' +
                                '<strong>Error! </strong>' + ERROR_MESSAGE +
                            '</div>';

            $("#resultadoSendMessage").html(response); 
            break;


        // 1: Envio satisfactorio

        case '1':
            var response = '<div class="alert alert-success alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' +
                                SUCCESS_MESSAGE +
                            '</div>';

            $("#resultadoSendMessage").html(response);
            break;    


        // 2: Error de validacion, datos invalidos proporcionado por el usuario
        
        case '2':
            var response = '<div class="alert alert-danger alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> ' +
                                '<strong>Error! </strong>' + ERROR_VALIDATION +
                            '</div>';

            $("#resultadoSendMessage").html(response);
            break;

    }

    $("#loader").removeClass("loader");    

}

// Problemas estableciendo conexion con el servidor                   

function problemas()
{
    var response_success = '<div class="alert alert-danger alert-dismissible" role="alert"> ' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> ' +
                                '<strong>Error! </strong>' + ERROR_SERVIDOR +
                            '</div>';
    $("#resultadoSendMessage").html(response_success)  
}            


function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
