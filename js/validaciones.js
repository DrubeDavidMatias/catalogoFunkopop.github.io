function validarCodigo(codigo) {
    if (codigo.value.trim() != '' && !isNaN(codigo.value)) {
        codigo.className = "form-control is-valid";
        return true;
    } else {
        codigo.className = "form-control is-invalid";
        return false;
    }
}

function validarNombre(nombre) {
    if (nombre.value.trim() == "") {
        nombre.className = "form-control is-invalid";
        return false;
    } else {
        nombre.className = "form-control is-valid";
        return true;
    }
}

function validarNumSerie(numSerie) {
    if (numSerie.value.trim() == "") {
        numSerie.className = "form-control is-invalid";
        return false;
    } else {
        numSerie.className = "form-control is-valid";
        return true;
    }
}

function validarCategoria(categoria) {
    if (categoria.value.trim() == "") {
        categoria.className = "form-control is-invalid";
        return false;
    } else {
        categoria.className = "form-control is-valid";
        return true;
    }
}

function validarDescripcion(descripcion) {
    if (descripcion.value.trim != "" && descripcion.value.length >= 10) {
        descripcion.className = 'form-control is-valid';
        return true;
    } else {
        descripcion.className = 'form-control is-invalid';
        return false;
    }
}

function validarImagen(imagen) {
    if (imagen.value.trim() == "") {
        imagen.className = "form-control is-invalid";
        return false;
    } else {
        imagen.className = "form-control is-valid";
        return true;
    }
}

function validarGeneral(e) {
    console.log('desde la funcion validar general');
    //aqui tengo que validar todo
    if (validarCodigo(document.getElementById('codigo')) == true &&
        validarNombre(document.getElementById('nombre')) == true &&
        validarNumSerie(document.getElementById('numSerie')) == true &&
        validarCategoria(document.getElementById('categoria')) == true &&
        validarDescripcion(document.getElementById('descripcion')) == true &&
        validarImagen(document.getElementById('imagen'))) {

        alert('datos correctos');
    } else {
        alert('Debe corregir los datos mal cargados');

    }
}