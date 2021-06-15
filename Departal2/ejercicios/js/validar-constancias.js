
var idSeleccionadoParaValidar=0;

function actionRead(){
    $.ajax({
        url: "php/validar-constancias.php",
        method:'GET',
        data: {
          accion: 'Read'
        },
        success: function( resultado ) {
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
                //Mostrar todos los registros de la base de datos en la tabla
                var tabla               = $('#example1').DataTable(); 
                
                for (var constancia of objetoJSON.constancias) 
                {
                  var botones             = '<a class="btn btn-warning btn-block btn-flat" data-toggle="modal" data-target="#modal-accion" onclick="recuperaDatosValidarConstancia('+constancia.id+');" href="#">';
                      botones=botones+'<i class="fas fa-tasks">';
                      botones=botones+'</i>';
                      botones=botones+'</a>';
              
                    tabla.row.add( [
                        constancia.programa,
                        constancia.nombre,
                        constancia.actividad,
                        constancia.horas,
                        botones
                    ] ).node().id = 'renglon_'+constancia.id;
                    
                    tabla.draw( false );
                }
            }else{
                
            }
        }
    });
}

function recuperaDatosValidarConstancia(id) {
  idSeleccionadoParaValidar=id;

  $.ajax({
      url: "php/validar-constancias.php",
      method:'GET',
      data: {
        id: idSeleccionadoParaValidar,
        accion       : 'Read'
      },
      success: function( resultado ) {
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
              document.getElementById("nombre_validar").innerHTML=objetoJSON.nombre;
              $("#actividad_validar").val(objetoJSON.actividad);
              $("#fecha_inicio_validar").val(objetoJSON.fecha_inicio);
              $("#fecha_inicio_fin").val(objetoJSON.fecha_fin);
              $("#horas_validar").val(objetoJSON.horas);
              $("#observaciones_validar").val(objetoJSON.observaciones);
          }else{
              alert(objetoJSON.mensaje);
          }
       
      }
  });
}