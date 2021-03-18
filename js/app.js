//variable que almacena los datos del localstorage
let listaFunkopop = []; // esta variable no es la misma que la de admin.js, puedo usar el mismo nombre
leerFunkopop();

//esta funcion es para traer los datos del localstorage
function leerFunkopop() {
    if (localStorage.length > 0) {
        listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
        //borro los datos de la fila de cards cargados estaticamente
        let filaCards = document.getElementById("filaCards");
        filaCards.innerHTML = "";
        //dibujar cada columna con los datos de los funkopop

        for (let i in listaFunkopop) {
            //cargar imagen por defecto
            let imagen = '';
            if (listaFunkopop[i].imagen === '') {
                //cargar la imagen por defecto
                imagen = 'imagenNoDisponible.png';
            } else {
                imagen = listaFunkopop[i].imagen;
            }
            let columna = `                <div class="col-md-3 col-sm-6 my-2">
            <div class="card w-100 shadow">
                <img src="img/productos/${imagen}" class="card-img-top" alt="Funko ${listaFunkopop[i].nombre}">
                <div class="card-body">
                    <h5 class="card-title">${listaFunkopop[i].nombre}</h5>
                    <p class="card-text"${listaFunkopop[i].descripcion}</p>
                    <a href="#" class="btn btn-primary disabled">Ver más</a>
                </div>
            </div>
        </div>`;

            //agregar las columnas a su elemento padre. Voy acumulando todo cada ves que da una vuelta el for
            filaCards.innerHTML += columna;
        }
    }
}