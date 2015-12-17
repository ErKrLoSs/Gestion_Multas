window.addEventListener("load",inicio,false);

var oGestorMultas = new GestorMultas();

function inicio(){
    document.getElementById("cli").addEventListener('click',mostrarFomularioCliente,false);
    document.getElementById("altaCliente").addEventListener('click',mostrarAltaCliente,false);
    document.getElementById("enviar").addEventListener("click",clienteN,false);
    
}
//-----------------Funciones para ocultar formularios-------------------------//
function ocultarTipoCliente(){
    var oTipoAnual = document.getElementById("grupoTarifaMiembro");
    var oTipoMes = document.getElementById("grupoTarifaMes");
    oTipoAnual.style.display = "none";
    oTipoMes.style.display = "none";
}
//-----------------Funciones para mostrar formularios y mensajes--------------//
//Funcion para mostrar los mensajes
function mensaje(sMensaje){         
    //modificar para quitar el texcontent
//    var oTextoMensaje =document.getElementById("textoMensaje");
//    var oTextoInsertar = document.createTextNode(sMensaje);
//    //oTextoMensaje.textContent = sMensaje;    
//    oTextoMensaje.appendChild(oTextoInsertar);
//    var oCapaMensaje = document.getElementById("mensajes");
//    oCapaMensaje.style.display = "block";
//    var oCapaTransparente = document.getElementById("capaTransparente");
//    oCapaTransparente.style.zIndex = 1;
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "3000",
        "timeOut": "3000",
        "extendedTimeOut": "3000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        
    };
    if(sMensaje == "Cliente dado de alta")
        toastr["success"](sMensaje, "Mensaje");
    else
        toastr["error"](sMensaje, "Mensaje");
}
//Funcion para ocultar los mensajes
//function ocultarMensaje(){
//    var oTextoMensaje =document.getElementById("textoMensaje");
//    oTextoMensaje.removeChild(oTextoMensaje.firstChild);
//    var oCapaMensaje = document.getElementById("mensajes");
//    oCapaMensaje.style.display = "none";
//    var oCapaTransparente = document.getElementById("capaTransparente");
//    oCapaTransparente.style.zIndex = -1;
//}

function mostrarFomularioCliente(){
    var oMenu = document.getElementById("menu");
    var oUsu = document.getElementById("cliente");
    oMenu.style.display = "none";
    oUsu.style.display = "block";
}

function mostrarAltaCliente(){
    var oAlta = document.getElementById("cliente");
    var oFormularioAlta = document.altaCli;
    oAlta.style.display = "none";
    oFormularioAlta.style.display = "block";
}
//--------------------------Funciones de alta---------------------------------//
function clienteN(){
    var sNombre,sApellido,sNif,oCliente;  
    sNombre = document.altaCli.nombre.value;
    sApellido = document.altaCli.ape.value;   
    sNif = document.altaCli.nif.value;
    if(validarUsuario() == true){
        oCliente = new Cliente(sNif,sNombre,sApellido);
        mensaje(oGestorMultas.altaCliente(oCliente));
    }
}
//--------------------------Funciones de validacion---------------------------//
function validarUsuario(){
    //var oE = oEvento || window.event;
    var bValido = true;
    var sErrores = "";
    var oCliente;	       
        //Validacion del nombre
    var sNombre = document.altaCli.nombre.value.trim();
    document.altaCli.nombre.value = document.altaCli.nombre.value.trim();

    var oExpReg = /[a-zA-Z\s]{3,40}/;

    if (oExpReg.test(sNombre) == false){
        if(bValido == true){
            bValido = false;		
            document.altaCli.nombre.focus();		
        }
        sErrores += "Nombre incorrecto<br>";
        document.altaCli.nombre.className = "form-control error";//Marcaciones de error, si entra lo marcara, si pasa por el else lo desmarca.
    }else{
        document.altaCli.nombre.className = "form-control";	
    }
        
	//Validacion del apellido
    var sApellido = document.altaCli.ape.value.trim();
    document.altaCli.ape.value = document.altaCli.ape.value.trim();
               
    if (oExpReg.test(sApellido) == false){

        if(bValido == true){
            bValido = false;		
            document.altaCli.ape.focus();		
        }
        sErrores += "Apellidos incorrecto<br>";
        document.altaCli.ape.className = "form-control error";

    }
    else {
        document.altaCli.ape.className = "form-control";	
    }
        
        //validacion del campo nif
    var sNif = document.altaCli.nif.value.trim();
    document.altaCli.nif.value = document.altaCli.nif.value.trim();
        
    var oExpRegNif = /[0-9]{7}[A-Z]/;

    if (oExpRegNif.test(sNif) == false){
        if(bValido == true){
            bValido = false;		
            document.altaCli.nif.focus();		
        }
        sErrores += "Nif incorrecto<br>";
        document.altaCli.nif.className = "form-control error";	
    }
    else {
        document.altaCli.nif.className = "form-control";	
    }
    
    if(document.altaCli.tipoCli[0].checked){
        var formulario = document.getElementById("grupoTarifaMiembro");
        formulario.style.display = "block";
    }
                
    //Condicion para enviar formulario solo si todos los datos son correctos
    if (bValido == false){
        mensaje(sErrores);
    }
    return bValido;
}
