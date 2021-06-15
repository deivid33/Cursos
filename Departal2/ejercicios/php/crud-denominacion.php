<?php
    include("conexion.php");
    /*Modelo de datos = MVC = Modelo-Vista-Controlador
    Modelo = .PHP
    Vista = .HTML
    Controlador = .JS
    CRUD = CREAR = POST, 
    LEER = GET, 
    ACTUALIZAR = PUT  
    ELIMINAR = DELETE
    */

    //Estos son los datos extraidos del documento js
    if(isset($_POST['accion']))
    $accion          = $_POST['accion'];
    if(isset($_GET['accion']))
    $accion          = $_GET['accion'];

    switch ($accion){
        case 'Create':
            accionCreatePHP($conexion);
            break;
        case 'Read':
            accionReadPHP($conexion);
            break;
        case 'Delete':
            accionDeletePHP($conexion);
            break;
        case 'Update':
            accionUpdatePHP($conexion);
            break;
    }

    
    function accionCreatePHP($conexion){
    $eje_tematico    = $_POST['eje_tematico'];
    $modalidad       = $_POST['modalidad'];
    $descripcion     = $_POST['descripcion'];
    $factor          = $_POST['factor'];
    $ejemplos        = $_POST['ejemplos'];

    //En el query tenemos que es la misma consulta la que crea un nuevo registro dentro de la base de datos con ayuda del INSERT INTO
    $query    = "INSERT INTO denominacion (id, eje_tematico, modalidad, descripcion, factor, ejemplos) VALUES (NULL, '".$eje_tematico."', '".$modalidad."', '".$descripcion."', ".$factor.", '".$ejemplos."')";

    $resultado = mysqli_query($conexion,$query);//Esta instruccion crea el registro en la base de datos
    
    $respuesta = array();
//JSON es para formalizar el envio y recepcion de datos
    if($resultado >= 1){
        //todo bien
        $respuesta["estado"]=1;
        $respuesta["mensaje"]="la informacion se guardo correctamente";
        $respuesta["id"]=mysqli_insert_id($conexion);
        echo json_encode($respuesta);
    }
    else{
        //no todo bien
        $respuesta["estado"]=0;
        $respuesta["mensaje"]="ocurrio un error desconocido";
        $respuesta["id"]=-1;
        echo json_encode($respuesta);
    }
    mysqli_close($conexion);

    }
    function accionReadPHP($conexion)
    {   
        $respuesta = array();//arreglo1
        if(isset($_GET['id'])){
            $id=$_GET['id'];

            $query = "SELECT * FROM denominacion WHERE id=".$id;

            $resultado = mysqli_query($conexion,$query);
            $numeroRegistros = mysqli_num_rows($resultado);

            if($numeroRegistros>=1){
                $Registros=mysqli_fetch_array($resultado);
                
                $respuesta["estado"] = 1;
                $respuesta["mensaje"] = "Si hay registros";

                $respuesta["id"]           = $Registros["id"];
                $respuesta["eje_tematico"] = $Registros["eje_tematico"];
                $respuesta["modalidad"]    = $Registros["modalidad"];
                $respuesta["descripcion"]  = $Registros["descripcion"];
                $respuesta["factor"]       = $Registros["factor"];
                $respuesta["ejemplos"]     = $Registros["ejemplos"];

            }else{
                $respuesta["estado"] = 0;
                $respuesta["mensaje"] = "NO hay registros";
            }

        }else{
            $query = "SELECT * FROM denominacion";
        }

        $query = "SELECT * FROM denominacion";
        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);
        if($numeroRegistros >= 1){
            $respuesta["estado"]         = 1;
            $respuesta["mensaje"]        = "Si hay registros";
            $respuesta["denominaciones"] = array();//arreglo2
            
            while($row = mysqli_fetch_array($resultado)){
                $objetoDenominacion = array();//arreglo3
                 
                $objetoDenominacion["id"]           = $row["id"];
                $objetoDenominacion["eje_tematico"] = $row["eje_tematico"];
                $objetoDenominacion["modalidad"]    = $row["modalidad"];
                $objetoDenominacion["descripcion"]  = $row["descripcion"];
                $objetoDenominacion["factor"]       = $row["factor"];
                $objetoDenominacion["ejemplos"]     = $row["ejemplos"];

                array_push($respuesta["denominaciones"],$objetoDenominacion);
            }
        }
        else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "NO hay registros";
        }
        echo json_encode($respuesta);
        mysqli_close($conexion);
    }
    function accionDeletePHP($conexion){
        $respuesta = array();
        $id =$_POST["id"];
        $query = "DELETE FROM denominacion WHERE denominacion.id = ".$id;

        mysqli_query($conexion,$query);
        $numeroRegistros=mysqli_affected_rows($conexion);

        if($numeroRegistros >=1){
            $respuesta["estado"]         = 1;
            $respuesta["mensaje"]        = "El registro se elimino correctamente";
        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "Ocurrio un error desconocido";
        }

        echo json_encode($respuesta);
        mysqli_close($conexion);
        
    }
    
function accionUpdatePHP($conexion){
    $Respuesta = array();
    
    $id              = $_POST["id"];

    $eje_tematico    = $_POST['eje_tematico'];
    $modalidad       = $_POST['modalidad'];
    $descripcion     = $_POST['descripcion'];
    $factor          = $_POST['factor'];
    $ejemplos        = $_POST['ejemplos'];

    $query=" UPDATE denominacion ";
    $query=$query." SET eje_tematico='".$eje_tematico."', modalidad='".$modalidad."', descripcion='".$descripcion."', factor=".$factor.", ejemplos='".$ejemplos."' ";
    $query=$query." WHERE id=".$id;

    mysqli_query($conexion,$query);
    $numeroRegistros=mysqli_affected_rows($conexion);

    if($numeroRegistros>=1){
        $respuesta["estado"]         = 1;
        $respuesta["mensaje"]        = "El registro se actualizo correctamente";
    }else{
        $respuesta["estado"] = 0;
        $respuesta["mensaje"] = "Ocurrio un error desconocido";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
}

?>
