/*Controlador*/
var idSeleccionadoParaEliminar = 0;
//var idSeleccionEliminar = 0;
var idSeleccionadoParaActualizar = 0;

function actionCreate(){
        //Referencias
        var tabla                = $('#example1').DataTable();/*Servira como una referencia a nuestra tabla*/

        var eje_tematico_create  = document.getElementById("eje_tematico_create").value;/* Tambien puede ser: $('#txt_alta_1').val */
        var modalidad_create     = document.getElementById("modalidad_create").value;
        var descripcion_create   = document.getElementById("descripcion_create").value;
        var factor_create        = document.getElementById("factor_create").value;
        var ejemplos_create      = document.getElementById("ejemplos_create").value;

        $.ajax({
                url: "php/crud-denominacion.php",
                method: 'POST', //este metodo se utiliza cuando vamos a crear
                data: {
                  eje_tematico : eje_tematico_create,
                  modalidad    : modalidad_create,
                  descripcion  : descripcion_create,
                  factor       : factor_create,
                  ejemplos     : ejemplos_create,
                  accion       : 'Create'  
                },
                success: function( Resultado ) {//Se ejecuta esta funcion hasta que el servidor responda, si se tarda, lo pone en segundo plano
                     var objetoJSON = JSON.parse(Resultado);
                        if(objetoJSON.estado == 1){
                                                             //AGREGAR BOTONES
                                var botones = '<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-lg-actualizar" onclick="recuperaDatosUpdate('+objetoJSON.id+');" href="#">';
                                botones = botones + '<i class="fas fa-pencil-alt">';
                                botones = botones + '</i>';
                                botones = botones + ' Actualizar';
                                botones = botones + '</a>';
                                botones = botones + ' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="idSeleccionEliminar('+objetoJSON.id+');" href="#">';
                                botones = botones + '<i class="fas fa-trash">';
                                botones = botones + '</i>';
                                botones = botones + ' Eliminar';
                                botones = botones + '</a>';

                                tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        eje_tematico_create,
                                        modalidad_create,
                                        descripcion_create,
                                        botones
                                ]).node().id = 'renglon_'+objetoJSON.id;
                                        
                                tabla.draw(false);
                                //La linea 37 se ejecuta antes que la linea 11
                                       
                                alert(objetoJSON.mensaje);
                                $('#modal-lg').modal ('hide'); //hide = ocultar; show = mostrar

                        }else{
                                alert(objetoJSON.mensaje);
                        }

                        alert("Respuesta del servidor: " + Resultado);
                }//Si el servidor tarda en contestar entonces se seguira, ya que este es un sistema asincrono
        });
}

function actionRead(){
        //GET
        $.ajax({
            url: "php/crud-denominacion.php",
            method: 'GET',
                data: {
                accion       : 'Read'
                },
                success: function( Resultado ){
                        var objetoJSON = JSON.parse(Resultado);
                        if(objetoJSON.estado == 1){
                                //mostrar todos los registros de la base de datos en la tabla
                                var tabla         = $('#example1').DataTable();
                                
                                for(var denominacion of objetoJSON.denominaciones){
                                        //AGREGAR BOTONES
                                        var botones = '<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-lg-actualizar" onclick="recuperaDatosUpdate('+denominacion.id+');" href="#">';
                                        botones = botones + '<i class="fas fa-pencil-alt">';
                                        botones = botones + '</i>';
                                        botones = botones + ' Actualizar';
                                        botones = botones + '</a>';
                                        botones = botones + ' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="idSeleccionEliminar('+denominacion.id+');" href="#">';
                                        botones = botones + '<i class="fas fa-trash">';
                                        botones = botones + '</i>';
                                        botones = botones + ' Eliminar';
                                        botones = botones + '</a>';

                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        denominacion.eje_tematico,
                                        denominacion.modalidad,
                                        denominacion.descripcion,
                                        botones
                                        ]).node().id = 'renglon_'+denominacion.id;

                                        tabla.draw(false);
                                }
                        }else{
                                //No nos interesa mostrar nada
                        }
                }
        });
}

function actionDelete(){
        //DELETE
        $.ajax({
                url: "php/crud-denominacion.php",
                method: 'POST',
                    data: {
                    id: idSeleccionadoParaEliminar,
                    accion: 'Delete'
                    },
                    success: function( Resultado ){
                            var objetoJSON = JSON.parse(Resultado);
                            if(objetoJSON.estado==1){
                                    
                                //REFERENCIA
                                    var tabla = $('#example1').DataTable();
                                //ELIMINAR DE LA TABLA EL RENGLON
                                tabla.row( "#renglon_"+idSeleccionadoParaEliminar).remove().draw();
                            }
                            alert(objetoJSON.mensaje); 
                            $('#modal-default').modal ('hide'); //hide = ocultar; show = mostrar
                    }
                });
}

function actionUpdate(){
        //PUT
        //var tabla                = $('#example1').DataTable();/*Servira como una referencia a nuestra tabla*/
        var eje_tematico_update  = document.getElementById("eje_tematico_update").value;/* Tambien puede ser: $('#txt_alta_1').val */
        var modalidad_update     = document.getElementById("modalidad_update").value;
        var descripcion_update   = document.getElementById("descripcion_update").value;
        var factor_update        = document.getElementById("factor_update").value;
        var ejemplos_update      = document.getElementById("ejemplos_update").value;

        $.ajax({
                url: "php/crud-denominacion.php",
                method: 'POST',
                data: {
                        id :  idSeleccionadoParaActualizar,
                        eje_tematico : eje_tematico_update ,
                        modalidad    : modalidad_update ,
                        descripcion  : descripcion_update ,
                        factor       : factor_update ,
                        ejemplos     : ejemplos_update ,
                        accion       : 'Update'  
                      },
                    success: function( resultado ){
                            var objetoJSON = JSON.parse(resultado);
                            if(objetoJSON.estado==1){
                                alert(objetoJSON.mensaje);
                                //Debemos de actualizar el renglon de la tabla
                                //refererncia a la tabla
                                var tabla = $('#example1').DataTable();/*Servira como una referencia a nuestra tabla*/

                                //obtengo en un temporal todos los datos del renglon
                                var renglon = tabla.row("#renglon_"+idSeleccionadoParaActualizar).data();

                                //actualizo en el temporal los datos del renglon
                                renglon[0]=eje_tematico_update;
                                renglon[1]=modalidad_update;
                                renglon[2]=descripcion_update;
                                //renglon[3]=botones;

                                //regreso el temporal a la tabla
                                tabla.row("#renglon_"+idSeleccionadoParaActualizar).data(renglon);

                                $('#modal-lg-actualizar').modal ('hide'); //hide = ocultar; show = mostrar
                            }else{
                                alert(objetoJSON.mensaje);
                            }
                }
        });
}

function recuperaDatosUpdate(id){
        idSeleccionadoParaActualizar=id;
        $.ajax({
                url: "php/crud-denominacion.php",
                method: 'GET',
                    data: {
                    id: idSeleccionadoParaActualizar,
                    accion       : 'Read'
                    },
                    success: function( resultado ){
                            var objetoJSON = JSON.parse(resultado);
                            if(objetoJSON.estado==1){
                                //mostrar en los campos los datos
                                //document.getElementById("eje_tematico_update").value=objetoJSON.eje_tematico; //ESTA ES OTRA FORMA DE OPTENER EL DATO
                                $("#eje_tematico_update").val(objetoJSON.eje_tematico); //ESTA ES OTRA FORMA DE OPTENER EL DATO
                                $("#modalidad_update").val(objetoJSON.modalidad);
                                $("#descripcion_update").val(objetoJSON.descripcion);
                                $("#factor_update").val(objetoJSON.factor);
                                $("#ejemplos_update").val(objetoJSON.ejemplos);

                            }else{
                                alert(objetoJSON.mensaje);
                            }
                }
        });
}

function idSeleccionEliminar(id){
        idSeleccionadoParaEliminar = id;
        //necesitamos guardar el id que se selecciono para eliminar
}
