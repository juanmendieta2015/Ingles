<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ingles</title>
    <link href="css/main.css" rel="stylesheet" type="text/css">
</head>
<body id="body">

    <div id="main">
        <div id="header">
            <h1>Prácticas de Inglés: Traducciones Inversas</h1>
        </div>

        <div class= "topic">
            Tema:
            <span>
                <select id="topic_id" class="topic topic_dropdown">
                    <option value="anything">Anything</option>
                    <option value="presente_continuo">Presente Continuo</option>
                </select>            
            </span>
            <!-- <span id="topic_title"></span> -->
        </div>
        
        <div class="progress_bar_container">
            <div id="percent">0%</div>
        </div>

        <div id="resultado" class= "resultado">Haga clic en "Generar"</div>
        
        <div id="answer">
        </div>

        <div id="footer">
            <button id="generarPregunta" class="buttoms">Generar</button>
            <button id="resetear" class="buttoms">Resetear</button>
        </div>
        <div id="notification">
            <p>Se han terminado las preguntas</p>        
        </div>
        <div id="help">
            <h4>Tips:</h4>
            <ul>
                <li>Presione "Enter" para Generar</li>
                <li>Presione "1" para Mostrar/Ocultar la respuesta</li>
                <li>Presione "0" para Resetear</li>
            </ul>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>