import { Funko } from './funkoClass.js';


let listaFunkopop = [];

//esto lo tengo que hacer por la modificacion de bootstrap y abrir la ventana modal desde aqui y no desde el html
const modalProducto = new bootstrap.Modal(document.getElementById('modalFunkopop'));

//variable bandera que me ayuda a decidir cuando tengo que modificar y cuando tengo que crear un nuevo funkopop
//modificarFunkopop = true estoy modificando un producto, modificarFunkopop = false estoy agregando un nuevo funkopop
let modificarFunkopop = false;

let btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener('click', function() {
    limpiarFormulario(); //para que aparezca el formulario vacio si antes use el btn Editar
    modalProducto.show();
})

//llamar a la funcion que lee datos del local storage
leerDatos();


function agregarFunkopop() {
    //aca tengo que poner un if para crear el funkopop si se da la validacion general
    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let numSerie = document.getElementById('numSerie').value;
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = document.getElementById('imagen').value;

    let nuevoFunkopop = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen);
    listaFunkopop.push(nuevoFunkopop);
    console.log(nuevoFunkopop);
    //guardar lista de funkopop en localstorage
    localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
    //limpiar el fourmulario
    limpiarFormulario();
    //mostrar mensaje al usuario que el producto fue creado
    Swal.fire(
        'Nuevo Funkopop',
        'El Funkopop se agrego correctamente',
        'success'
    )
    leerDatos(); //para que se muestre lo que acabo de cargar
    //cerrar la ventana modal
    modalProducto.hide();
}

function limpiarFormulario() {
    document.getElementById('formFunkopop').reset();
    modificarFunkopop = false; //para dejar la variable bandera en el valor original
}

function leerDatos() {
    //esta funcion se encargara de leer los datos del localstorage
    if (localStorage.length > 0) {
        //traer los datos del localstorage
        let _listaFunkopop = JSON.parse(localStorage.getItem('listaFunkoKey'));
        console.log(_listaFunkopop);
        //pregunhtar si mi arreglo listaFunkopop tiene datos
        if (listaFunkopop.length === 0) {
            listaFunkopop = _listaFunkopop;
        }
        dibujarDatosEnTabla(_listaFunkopop);
    }

}

function dibujarDatosEnTabla(_listaFunkopop) {
    //esta funcion se encargara de agregar los datos del localstorage en cada fila de la tabla
    let tabla = document.getElementById('tablaFunkopop');
    //borramos las filas extras para cargar lo que corresponde
    tabla.innerHTML = '';
    let filas;
    //for (let i = 0; i < _listaFunkopop.length; i++) {}
    //otra forma de for para recorrer todo un arreglo
    for (let i in _listaFunkopop) {
        filas = `<tr>
        <td>${_listaFunkopop[i].codigo}</td>
        <td>${_listaFunkopop[i].nombre}</td>
        <td>${_listaFunkopop[i].numSerie}</td>
        <td>${_listaFunkopop[i].categoria}</td>
        <td>${_listaFunkopop[i].descripcion}</td>
        <td>${_listaFunkopop[i].imagen}</td>
        <td>
            <button class="btn btn-warning" onclick="prepararFunkopop(this)" id="${_listaFunkopop[i].codigo}">Editar</button>
            <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id="${_listaFunkopop[i].codigo}">Borrar</button>
        </td>
    </tr>`;
        //agregar la fila al padre
        tabla.innerHTML += filas;
        //tabla.innerHTML = tabla.innerHTML + filas; ES LO MISMO QUE LA LINEA ANTERIOR
    }
}

//uso window para llamar eventos desde el html
window.eliminarFunkopop = function(boton) {
    console.log(boton.id);
    Swal.fire({
        title: '¿Esta seguro de eliminar el Funkopop?',
        text: "No puedes volver atras de elimiar un Funkopop",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            //agregar la logica para eliminar el funkopop
            let funkopopFiltrado = listaFunkopop.filter((producto) => producto.codigo != boton.id); //funcion flecha
            //guardar los datos en local storage
            localStorage.setItem('listaFunkoKey', JSON.stringify(funkopopFiltrado));
            //cargar los nuevos datos
            leerDatos();
            Swal.fire(
                'Funkopop eliminado',
                'El Funkopop seleccionado fue eliminado',
                'success'
            )
        }
    })
}

window.prepararFunkopop = function(boton) {
    //buscar el funkopop seleccionado
    let funkopopEncontrado = listaFunkopop.find((producto) => { return producto.codigo === boton.id }); //cuando quiero buscar 1 SOLO OBJETO que cumpla con la condicion logica. Si hay varios muestra el primero que encuentra
    //console.log(funkopopEncontrado);
    //completar con los datos todos los inputs de mi formulario
    document.getElementById('codigo').value = funkopopEncontrado.codigo;
    document.getElementById('nombre').value = funkopopEncontrado.nombre;
    document.getElementById('numSerie').value = funkopopEncontrado.numSerie;
    document.getElementById('categoria').value = funkopopEncontrado.categoria;
    document.getElementById('descripcion').value = funkopopEncontrado.descripcion;
    document.getElementById('imagen').value = funkopopEncontrado.imagen;
    //cambiar el estado de mi variable modificarFunkopop
    modificarFunkopop = true;
    //mostrar ventana modal
    modalProducto.show();
}

window.guardarFunko = function(event) {
    event.preventDefault(); //para que no se referesque la pagina al toque 
    //if(modioficarFunkopop === true)
    if (modificarFunkopop) {
        //modificar el funko existente
        modificarFunkoExistente();
    } else {
        agregarFunkopop();
    }
}

function modificarFunkoExistente() {
    //validar nuevamente los datos ingresados
    //tomar los valores modificados del formulario
    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let categoria = document.getElementById('categoria').value;
    let numSerie = document.getElementById('numSerie').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = document.getElementById('imagen').value;
    //buscar el objeto y modifico sus datos
    for (let i in listaFunkopop) {
        if (listaFunkopop[i].codigo === codigo) {
            listaFunkopop[i].nombre = nombre;
            listaFunkopop[i].categoria = categoria;
            listaFunkopop[i].numSerie = numSerie;
            listaFunkopop[i].descripcion = descripcion;
            listaFunkopop[i].imagen = imagen;
        }
    }
    //actualizo el localstorage
    localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
    //mostrar alerta al usuario
    Swal.fire(
            'Funkopop modificado',
            'El Funkopop selecionado fue modificado exitosamente',
            'success'
        )
        //dibujo los datos actualizados en la tabla
    leerDatos();
    //cerrar ventana modal
    modalProducto.hide();
}