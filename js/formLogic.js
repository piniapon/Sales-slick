var dptosLocs = {
	Artigas: ["Artigas", "Bella Unión"],
	Canelones: ["Canelones", "Santa Lucía"],
	Montevideo: ["Montevideo"],
	Salto: ["Salto", "Daymán", "Arapey"],
};

var inputDpto = document.querySelector("#inputDepartamento");
var inputLocalidad = document.querySelector("#inputLocalidad");
var inputName = document.querySelector("#inputName");
var send = document.querySelector("#send");

for (index in dptosLocs) {
	inputDpto.options[inputDpto.options.length] = new Option(index);
}

function changeDepartamento() {
	while (inputLocalidad.options.length > 1) {
		inputLocalidad.remove(1);
	}
	var loc = dptosLocs[inputDpto.value];
	console.log(loc);
	for (index in loc) {
		inputLocalidad.options[inputLocalidad.options.length] = new Option(
			loc[index]
		);
	}
}

function validateLength(inputName, minlength) {
	if (inputName.length >= minlength) {
		return true;
	} else {
		return false;
	}
}

function validateEmail(emailInput) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(emailInput).toLowerCase());
}

function validateLocalidad(inputDpto, inputLocalidad) {
	return inputDpto.value && inputLocalidad.value;
}

function validateCedula(ci) {
	if (!ci) return false;
	//Inicializo los coefcientes en el orden correcto
	var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
	var suma = 0;
	//Para el caso en el que la CI tiene menos de 8 digitos
	//calculo cuantos coeficientes no voy a usar
	var difCoef = parseInt(arrCoefs.length - ci.length);
	//recorro cada digito empezando por el de más a la derecha
	//o sea, el digito verificador, el que tiene indice mayor en el array
	for (var i = ci.length - 1; i > -1; i--) {
		//Obtengo el digito correspondiente de la ci recibida
		var dig = ci.substring(i, i + 1);
		//Lo tenía como caracter, lo transformo a int para poder operar
		var digInt = parseInt(dig);
		//Obtengo el coeficiente correspondiente al ésta posición del digito
		var coef = arrCoefs[i + difCoef];
		//Multiplico dígito por coeficiente y lo acumulo a la suma total
		suma = suma + digInt * coef;
	}
	var result = false;
	// si la suma es múltiplo de 10 es una ci válida
	if (suma % 10 === 0) {
		result = true;
	}
	console.log(result);
	return result;
}

function validateCheck(checkInput) {
	var checkInput = document.forms["form"]["check"];
	return checkInput.checked;
}

function validateForm() {

	var nameInput = document.forms["form"]["name"].value;
	var lstNameInput = document.forms["form"]["lstName"].value;
	var emailInput = document.forms["form"]["mail"].value;
	var ci = document.forms["form"]["cedula"].value;
	let validForm = false;
	const validName = validateLength(nameInput, 2);
	const validLstname = validateLength(lstNameInput, 2);
	const validMail = validateEmail(emailInput);
	const validLocalidad = validateLocalidad(inputDpto, inputLocalidad);
	const validCedula = validateCedula(ci);
	const validCheck = validateCheck();
	var nameHelper = document.querySelector("#nameHelper");
	var lstNameHelper = document.querySelector("#lstNameHelper");
	var cedulaHelper = document.querySelector("#cedulaHelper");
	var localidadHelper = document.querySelector("#localidadHelper");
	var departamentoHelper = document.querySelector("#departamentoHelper");
	var checkHelper = document.querySelector("#checkHelper");
	var mailHelper = document.querySelector("#mailHelper");
	var nameContainer = document.querySelector("#nameContainer");
	var lstNameContainer = document.querySelector("#lstNameContainer");
	var mailContainer = document.querySelector("#mailContainer");
	var departamentoContainer = document.querySelector("#departamentoContainer");
	var localidadContainer = document.querySelector("#localidadContainer");
	var cedulaContainer = document.querySelector("#cedulaContainer");





	if (!validName) {
		nameHelper.textContent = "nombre invalido";
		nameContainer.classList.add("danger")
	} else {
		nameContainer.classList.remove("danger")
		nameHelper.textContent = ""
	}

	if (!validLstname) {
		lstNameHelper.textContent = "apellido invalido";
		lstNameContainer.classList.add("danger")
	} else {
		lstNameContainer.classList.remove("danger")
		lstNameHelper.textContent = ""
	}

	if (!validMail) {
		mailHelper.textContent = "correo invalido";
		mailContainer.classList.add("danger")
	} else {
		mailContainer.classList.remove("danger")
		mailHelper.textContent = ""
	}
	if (!validLocalidad) {
		if (!inputDpto.value) {
			departamentoHelper.textContent = "debe seleccionar una opcion";
			departamentoContainer.classList.add("danger")

		} else {
			departamentoContainer.classList.remove("danger")
			departamentoHelper.textContent = ''
		}
		if (!inputLocalidad.value) {
			localidadHelper.textContent = "debe seleccionar una opcion";
			localidadContainer.classList.add("danger")
		} else {
			localidadContainer.classList.remove("danger")
			localidadHelper.textContent = ''
		}
	}
	if (!validCedula) {
		cedulaHelper.textContent = "numero de cedula invalido";
		cedulaContainer.classList.add("danger")

	} else {
		cedulaContainer.classList.remove("danger")
		cedulaHelper.textContent = ''
	}
	if (!validCheck) {
		checkHelper.textContent = "debe leer los terminos y condiciones";
	} else {
		checkHelper.textContent = "";
	}
	validForm =
		validName &&
		validLstname &&
		validMail &&
		validLocalidad &&
		validCedula &&
		validCheck;
	return validForm;
}
