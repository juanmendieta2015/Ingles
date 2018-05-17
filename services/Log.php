<?php

    // Clase auxiliar
    class Log
    {
        private $date;
        private $ip_address ;
        private $browser;
        private $text; 

       public function __construct() 
       { 
            date_default_timezone_set('America/Guayaquil');
            $this->date       = date("Y-m-d H:i:s");
            $this->ip_address = $_SERVER['REMOTE_ADDR'];
            $this->browser    = $_SERVER['HTTP_USER_AGENT'];
            $this->text = 
"
Fecha\t\t\t\t: {$this->date}
Direccion Ip\t\t: {$this->ip_address}
Browser\t\t\t\t: {$this->browser}
";          
       }        

      
        // Guarda un archivo de log
        public function save($file_name = "log.txt")
        {
            $myfile = fopen($file_name, "a") or die("Unable to open file!");
            fwrite($myfile, $this->text);
            fclose($myfile);
            return true;        
        } 


    }

?>