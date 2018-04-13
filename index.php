<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ingles</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <link href="css/main.css" rel="stylesheet" type="text/css">
</head>
<body id="body">

    <div class="container main" >

        <!-- Header -->

        <div class="row">
            <div class="col-xs-12" id="header">
                <h1>Prácticas de Inglés: Traducciones Inversas</h1>
            </div>
        </div>


        <!-- Tema -->

        <div class="row topic">

            <div class="col-sm-2 col-sm-offset-2" >
               <label>Tema:</label>
            </div>

            <div class="col-sm-6">
                <select id="topic_id" class="form-control topic_dropdown">
                    <option value="anything">Anything</option>
                    <option value="presente_continuo">Presente Continuo</option>
                </select>            
            </div>

        </div>



        <!-- Progress bar -->

        <div class="row">
            <div class="col-xs-12 progress_bar_container">        
                    <div id="percent">0%</div>
            </div>
        </div>




        <!-- Pregunta -->
        
        <div class="row">
            <div class="col-xs-12 resultado" id="resultado">        
                <h1>Haga clic en "Generar"</h1>
            </div>
        </div>



        <!-- Answer -->
        
       <div class="row">
            <div class="col-xs-12 alert alert-info alert-dismissible" role="alert" id="answer">                   
            </div>
        </div>



        <!-- Botones -->

       <div class="row">
            <div class="col-xs-12" id="footer" >        
                <button id="generarPregunta" class="btn btn-success buttoms">Generar</button>
                <button id="resetear" class="btn buttoms">Resetear</button>
            </div>
        </div>



        <!-- Notificacion -->

       <div class="row">
            <div class="col-xs-12 alert alert-warning alert-dismissible" role="alert" id="notification"> 
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>   
                    <p>Se han terminado las preguntas</p>        
            </div>
        </div>



        <!-- Tips -->

       <div class="row">
            <div class="col-xs-12  col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"  id="help">  

                <h5>Tips:</h5>
                <ul>
                    <li>Presione "Enter" para Generar</li>
                    <li>Presione "1" para Mostrar/Ocultar la respuesta</li>
                    <li>Presione "0" para Resetear</li>
                </ul>

            </div>
        </div>                

    </div>  

    <script src="js/main.js"></script>

</body>
</html>