// JavaScript Document

$('#general_editar_form').submit(function(e) {
	e.preventDefault();
  	var data = $(this).serializeArray();
	var foto_general = $("#foto_general").val();
	var foto_satelital = $("#foto_satelital").val();
	//console.log(data);
	
	editarInforme(data);
	
	
});

var llenarInfo = function (){
	informe = JSON.parse(sessionStorage.getItem("informe"));
	//console.log(informe);
	
	document.getElementById("aseguradora_e").value = informe.aseguradora;
	document.getElementById("ciudad_e").value = informe.ciudad;
	document.getElementById("consecutivo_visita_e").value = informe.aseguradora;
	document.getElementById("tipo_riesgo_e").value = informe.ciudad;
	document.getElementById("cliente_e").value = informe.aseguradora;
	document.getElementById("intermediario_e").value = informe.ciudad;
	document.getElementById("fecha_asignacion_e").value = informe.fecha_asignacion;
	document.getElementById("fecha_inspeccion_e").value = informe.fecha_inspeccion;
	document.getElementById("ordenado_por_e").value = informe.ordenado_por;
	document.getElementById("inspector_e").value = informe.inspector;
	
	document.getElementById("asegurado_e").value = informe.asegurado;
	document.getElementById("nit_e").value = informe.nit;
	document.getElementById("direccion_e").value = informe.direccion;
	document.getElementById("estrato_e").value = informe.estrato;
	document.getElementById("ciudad_riesgo_e").value = informe.ciudad_riesgo;
	document.getElementById("departamento_e").value = informe.departamento;
	document.getElementById("telefono_e").value = informe.telefono;
	document.getElementById("persona_contacto_e").value = informe.persona_contacto;
	document.getElementById("cargo_e").value = informe.cargo;
	document.getElementById("tipo_actividad_e").value = informe.tipo_actividad;
	document.getElementById("descripccion_e").value = informe.descripccion;
	
	document.getElementById("numero_bloques_e").value = informe.numero_bloques;
	document.getElementById("numero_pisos_bloque_e").value = informe.numero_pisos_bloque;
	document.getElementById("numero_apartamentos_e").value = informe.numero_apartamentos;
	document.getElementById("numero_parqueaderos_e").value = informe.numero_parqueaderos;
	document.getElementById("numero_sotanos_e").value = informe.numero_sotanos;
	document.getElementById("descripccion_parqueaderos_e").value = informe.descripccion_parqueaderos;
	
	document.getElementById("latitud_e").value = informe.latitud;
	document.getElementById("longitud_e").value = informe.longitud;
	document.getElementById("altitud_e").value = informe.altitud;
	document.getElementById("descripcion_ubicacion_e").value = informe.descripcion_ubicacion;
	
	document.getElementById("lindero_norte_e").value = informe.lindero_norte;
	document.getElementById("lindero_sur_e").value = informe.lindero_sur;
	document.getElementById("lindero_oriente_e").value = informe.lindero_oriente;
	document.getElementById("lindero_occidente_e").value = informe.lindero_occidente;
	
	document.getElementById("grupo_construccion").value = informe.grupo_construccion;
	document.getElementById("edad_constructiva_e").value = informe.edad_constructiva;
	document.getElementById("norma_sismoresistencia_e").value = informe.norma_sismoresistencia;
	document.getElementById("material_cubierta_estructura_e").value = informe.material_cubierta_estructura;
	document.getElementById("materiales_fachada_e").value = informe.materiales_fachada;
	document.getElementById("materiales_escalera_e").value = informe.materiales_escalera;
	document.getElementById("materiales_entrepisos_e").value = informe.materiales_entrepisos;
	document.getElementById("materiales_pisos_e").value = informe.materiales_pisos;
	document.getElementById("irregularidad_altura_e").value = informe.irregularidad_altura;
	document.getElementById("irregularidad_planta_e").value = informe.irregularidad_planta; 
	document.getElementById("cerramiento_e").value = informe.cerramiento;
	document.getElementById("observaciones_tipo_construccion_e").value = informe.observaciones_tipo_construccion;
	
	informe.bbq == "on" ? document.getElementById("bbq_e").checked = true: document.getElementById("bbq_e").checked = false;
	informe.senderos_peatonales == "on" ? document.getElementById("senderos_peatonales_e").checked = true: document.getElementById("senderos_peatonales_e").checked = false;
	informe.vias_vehiculares == "on" ? document.getElementById("vias_vehiculares_e").checked = true: document.getElementById("vias_vehiculares_e").checked = false;
	informe.porteria == "on" ? document.getElementById("porteria_e").checked = true: document.getElementById("porteria_e").checked = false;
	informe.lobby == "on" ? document.getElementById("lobby_e").checked = true: document.getElementById("lobby_e").checked = false;
	informe.banos_porteria == "on" ? document.getElementById("banos_porteria_e").checked = true: document.getElementById("banos_porteria_e").checked = false;
	informe.cuarto_basura == "on" ? document.getElementById("cuartos_basuras_e").checked = true: document.getElementById("cuartos_basuras_e").checked = false;
	informe.oficina_admin == "on" ? document.getElementById("oficina_admin_e").checked = true: document.getElementById("oficina_admin_e").checked = false;
	informe.canchas_deportivas == "on" ? document.getElementById("canchas_deportivas_e").checked = true: document.getElementById("canchas_deportivas_e").checked = false;
	informe.salon_comunal == "on" ? document.getElementById("salon_comunal_e").checked = true: document.getElementById("salon_comunal_e").checked = false;
	informe.zona_humeda == "on" ? document.getElementById("zona_humeda_e").checked = true: document.getElementById("zona_humeda_e").checked = false;
	informe.juegos_infantiles == "on" ? document.getElementById("juegos_infantiles_e").checked = true: document.getElementById("juegos_infantiles_e").checked = false;
	informe.tanques_agua_sub == "on" ? document.getElementById("tanques_agua_sub_e").checked = true: document.getElementById("tanques_agua_sub_e").checked = false;
	informe.tanques_agua_aereos == "on" ? document.getElementById("tanques_agua_aereos_e").checked = true: document.getElementById("tanques_agua_aereos_e").checked = false;
	informe.transformador_electrico == "on" ? document.getElementById("transformador_electico_e").checked = true: document.getElementById("transformador_electico_e").checked = false;
	informe.planta_electrica == "on" ? document.getElementById("planta_electrica_e").checked = true: document.getElementById("planta_electrica_e").checked = false;
	informe.ascensores == "on" ? document.getElementById("ascensores_e").checked = true: document.getElementById("ascensores_e").checked = false;
	informe.cuartos_maquina_bombeo == "on" ? document.getElementById("cuartos_maquina_bombeo_e").checked = true: document.getElementById("cuartos_maquina_bombeo_e").checked = false;
	informe.equipos_bombeo == "on" ? document.getElementById("equipos_bombeo_e").checked = true: document.getElementById("equipos_bombeo_e").checked = false;
	informe.gimnasio == "on" ? document.getElementById("gimnasio_e").checked = true: document.getElementById("gimnasio_e").checked = false;
	
	
};


$(document).ready(function(){
	
	llenarInfo();
	
	
	$("#descripccion_grupo").hide();
	
    $('#grupo_construccion').on('change', function() {
	  $("#descripccion_grupo").show();
      if ( this.value == 1)
      {
        $("#descripccion_grupo").text("Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1Descripccion GRupo 1");
      }
      else if(this.value == 2)
      {
        $("#descripccion_grupo").text("Descripccion GRupo 2");
      }else if(this.value == 3)
      {
        $("#descripccion_grupo").text("DescripccionGRupo 3");
      }else if(this.value == 4)
      {
        $("#descripccion_grupo").text("Descripccion GRupo 4");
      }else if(this.value == 5)
      {
        $("#descripccion_grupo").text("Descripccion GRupo 5");
      }else if(this.value == 6)
      {
        $("#descripccion_grupo").text("Descripccion GRupo 6");
      }else{
		  $("#descripccion_grupo").text("");
	  }
    });
});



