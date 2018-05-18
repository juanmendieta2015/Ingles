<?php
    date_default_timezone_set('America/Guayaquil');
    include_once("services/Conexion.php");
    include_once("services/config.inc.php");

    $conn = new Conexion(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    $link = $conn->connect();

    $date       = date("Y-m-d H:i:s");
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $browser    = $_SERVER['HTTP_USER_AGENT'];

    $sql = "INSERT INTO log_home (fecha, ip_address, browser)
    VALUES ('{$date}',  '{$ip_address}', '{$browser}')";

    if ($link->query($sql) === TRUE) {
        // echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $link->error;
    }

    $link->close();

    $topic_id = $_GET['topic_id'] ;
    // echo $topic_id;

?>
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

    <!-- Publicidad -->
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-8187489503971577",
        enable_page_level_ads: true
      });
    </script>

</head>
<body id="body">

    <div class="container main" >

        <!-- Header -->

        <div class="row">
            <div class="col-xs-12" id="header">
                <h3>Inglés Traducciones Inversas</h3>
            </div>
        </div>


        <!-- Select de Temas -->

        <div class="row topic ">

            <div class="col-xs-12 col-sm-3 col-md-2 col-md-offset-2 " >
               <label>Tema:</label>
            </div>

            <div class="col-xs-12 col-sm-9 col-md-6 ">
                <select id="topic_id" class="form-control topic_dropdown">
                    <option value="anything">Anything</option>
                    <option value="presente_continuo" selected="selected">Presente Continuo</option>
                    <option value="class_119_to_take_out_and_to_put_into">Class # 119: To take out (of) / To put into</option>
                    <option value="class_120_to_take_off_and_to_put_on">Class # 120: To take off / To put on</option>
                    <option value="class_121_verbos_terminan_ch">Class # 121: Verbos terminados en "ch"</option>
                    <option value="translation_list_38">Translation List # 38</option>
                    <option value="translation_list_41_imperativos">Translation List # 41 - Imperativos</option>
                    <option value="translation_list_42">Translation List # 42</option>
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
            <div class="col-xs-12 alert alert-info alert-dismissible " role="alert" id="answer">                   
            </div>
        </div>


        <!-- Botones -->

       <div class="row" id="footer">
            <!-- <div class="col-xs-12 col-md-10 col-md-offset-1" >         -->
                <button id="generarPregunta" class="btn btn-success buttoms">Generar</button>
                <button id="btnShowHideAnswer" class="btn buttoms">Mostrar Respuesta</button>

                <!-- Posiblemente eiminarlo -->
                <!-- <button id="resetear" class="btn buttoms">Resetear</button> -->
            <!-- </div> -->
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
            <div class="col-xs-12  col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 visible-lg hidden-sm"  id="help">  

                <h5>Tips:</h5>
                <ul>
                    <li>Presione "Enter" para Generar</li>
                    <li>Presione "1" para Mostrar/Ocultar la respuesta</li>
                    <li>Presione "0" para Resetear</li>
                </ul>

            </div>
        </div>   


        <div class="row">


                <!-- Formulario de Contacto -->

                <div class="col-xs-12 col-md-8 col-md-offset-2">
                    <div class="row">
                        <div class="col-xs-12">
                            <br>
                            <a id="showHideContact" class="btn btn-info btn-xs">Sugerencias</a>
                            <br>
                            <br>

                            <form id="form_contact" method="post" class="text-left">        

                                <legend>Sugerencias y Comentarios</legend>

                                <!-- Informacion al usuario -->
                                <div class="alert alert-info" role="alert">
                                  <div class="alert-info"> 
                                    <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                    Puedes contactarme en juanmsn@live.com
                                  </div>
                                </div>                                  

                                <!-- Nombre -->
                                <div class="form-group">
                                    <label class="sr-only">Name:</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder="Sus Nombres" required>
                                </div>      

                                <!-- Email -->
                                <div class="form-group">
                                    <label class="sr-only">E-mail: </label>
                                    <input type="email" name="email" id="email" class="form-control" placeholder="Su E-mail" required>
                                </div>      
 

                                <!-- Mensaje -->
                                <div class="form-group">
                                    <label class="sr-only">Message: </label>
                                    <textarea name="message" id="message" class="form-control" placeholder="Su Mensaje" cols="40" rows="7" required></textarea> 
                                </div>


                                <!-- Mensaje de confirmacion     -->
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div id="resultadoSendMessage"></div> 
                                    </div>      
                                </div>                              


                                <!-- Boton "Enviar Mensaje" -->
                                <div class="row">
                                    <div class="col-xs-6">
                                        <button id="btnSendMessage" class="btn btn-success"> <i class="far fa-paper-plane"></i> Enviar Mensaje</button>       
                                    </div>      
                                    <div class="col-xs-6">
                                        <div id="loader"></div>     
                                    </div>  
                                </div>   

                            </form>     
                        </div>  <!-- /.col-xs-12 -->
                    </div>  <!-- /.row -->
        
                </div>

            </div>  <!-- ./row -->

            <div class="row">
                <div class="col-xs-12">
                    <div class="ads">publicidad</div>
                </div>
            </div>

   
    </div>  

    <script src="js/main.js"></script>

</body>
</html>
