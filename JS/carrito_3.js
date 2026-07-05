//Declaración de variables
let productos = [];
let carrito = [];
const CLAVE_CARRITO = "carrito";

//Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {

    cargarCarrito();

    obtenerProductos().then(function () {

        mostrarProductos();
        actualizarCarrito();

    });

    document
        .getElementById("btn-vaciar")
        .addEventListener("click", vaciarCarrito);

    document
        .getElementById("btn-pagar")
        .addEventListener("click", finalizarCompra);

    document
        .getElementById("cerrarModal")
        .addEventListener("click", cerrarModal);

    document
        .getElementById("modalProducto")
        .addEventListener("click", function (e) {
            if (e.target.id === "modalProducto") {
                cerrarModal();
            }
        });
});

/*FUNCIONES*/

//1- Cargar carrito desde localStorage
function cargarCarrito() {
    let guardado = localStorage.getItem(CLAVE_CARRITO);
    if (guardado) {
        carrito = JSON.parse(guardado);
    }
}

//2- Obtener productos desde la API
function obtenerProductos() {
    return fetch("https://fakestoreapi.com/products?limit=10")
        .then(response => response.json())
        .then(data => {
            productos = data.map(item => ({
                id: item.id,
                nombre: item.title,
                precio: item.price,
                imagen: item.image, 
                descripcion: item.description,
                rating: item.rating,
            }));
        })
        .catch(error => console.error("Error al obtener productos:", error));
}

//3-Mostrar productos en la página
function mostrarProductos() {
    let lista = document.getElementById("lista-productos");

    lista.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {

        let producto = productos[i];

        let item = document.createElement("li");

        item.className = "producto-item";

        item.innerHTML = `
            <div class="producto-info">

                <img
                    class="producto-imagen"
                    src="${producto.imagen}"
                    data-indice="${i}"
                    alt="${producto.nombre}">

                <div class="producto-texto">

                    <span class="producto-nombre">
                        ${producto.nombre}
                    </span>

                    <span class="producto-precio">
                        $${producto.precio}
                    </span>

                </div>

            </div>

            <button class="btn-agregar" data-indice="${i}">
                Agregar
            </button>
        `;
        lista.appendChild(item);
    }

    let botones = document.querySelectorAll(".btn-agregar");

    for (let boton of botones) {

        boton.addEventListener("click", function () {

            let indice = boton.dataset.indice;

            agregarProducto(productos[indice]);

        });

    }

    let imagenes = document.querySelectorAll(".producto-imagen");

for (let imagen of imagenes) {

    imagen.style.cursor = "pointer";

    imagen.addEventListener("click", function () {

        let indice = imagen.dataset.indice;

        abrirModal(indice);

    });
    }
}

//4- Actualizar carrito en la página
function actualizarCarrito() {

    let listaCarrito = document.getElementById("items-carrito");
    let totalTexto = document.getElementById("total-carrito");
    let cantidadTexto = document.getElementById("cantidad-carrito");

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<li class='carrito-vacio'>Tu carrito está vacío.</li>";

    } else {

        for (let i = 0; i < carrito.length; i++) {

            let producto = carrito[i];

            let item = document.createElement("li");

            item.className = "carrito-item";

            item.innerHTML = `
                <span class="carrito-nombre">
                    ${producto.nombre}
                </span>

                <div class="carrito-controles">

                    <button
                        class="btn-restar"
                        data-indice="${i}">
                        −
                    </button>

                    <span class="cantidad">
                        ${producto.cantidad}
                    </span>

                    <button
                        class="btn-sumar"
                        data-indice="${i}">
                        +
                    </button>

                </div>

                <span class="carrito-precio">
                    $${(producto.precio * producto.cantidad).toFixed(2)}
                </span>

                <button
                    class="btn-quitar"
                    data-indice="${i}">
                    ✕
                </button>
            `;

            listaCarrito.appendChild(item);

        }

        let botonesSumar = document.querySelectorAll(".btn-sumar");

        for (let boton of botonesSumar) {

            boton.addEventListener("click", function () {

                sumarCantidad(boton.dataset.indice);

            });

        }

        let botonesRestar = document.querySelectorAll(".btn-restar");

        for (let boton of botonesRestar) {

            boton.addEventListener("click", function () {

                restarCantidad(boton.dataset.indice);

            });

        }

        let botonesQuitar = document.querySelectorAll(".btn-quitar");

        for (let boton of botonesQuitar) {

            boton.addEventListener("click", function () {

                quitarProducto(boton.dataset.indice);

            });

        }

    }

    let cantidad = 0;

    for (let producto of carrito) {

        cantidad += producto.cantidad;

    }

    cantidadTexto.textContent = cantidad;
    totalTexto.textContent = "$" + calcularTotal();

    guardarCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}



function agregarProducto(producto) {

    let existente = carrito.find(p => p.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();
}

function sumarCantidad(indice) {

    carrito[indice].cantidad++;

    actualizarCarrito();

}

function restarCantidad(indice) {

    carrito[indice].cantidad--;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    actualizarCarrito();

}

function quitarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

}

function calcularTotal() {

    let total = 0;

    for (let producto of carrito) {

        total += producto.precio * producto.cantidad;

    }

    return total.toFixed(2);

}

function abrirModal(indice) {

    let producto = productos[indice];

    document.getElementById("modalImagen").src = producto.imagen;

    document.getElementById("modalNombre").textContent =
        producto.nombre;

    document.getElementById("modalDescripcion").textContent =
        producto.descripcion;

document.getElementById("modalRating").innerHTML =
    `<svg xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#ff6900"
        style="vertical-align:middle;margin-right:4px;">
        <path d="M12 .587l3.668 7.431L24 9.753l-6 5.848 1.417 8.264L12 19.897l-7.417 3.968L6 15.601 0 9.753l8.332-1.735z"/>
    </svg>
    ${producto.rating.rate} / 5 (${producto.rating.count} opiniones)`;

    document.getElementById("modalProducto").style.display = "flex";

}

function cerrarModal() {

    document.getElementById("modalProducto").style.display = "none";

}



function finalizarCompra() {

    if (carrito.length === 0) {

        Swal.fire({
            icon: "info",
            title: "Tu carrito está vacío",
            text: "Agregá productos antes de pagar.",
            confirmButtonColor: "var(--primario-dark)"
        });

        return;

    }

    Swal.fire({
    title: "¡Gracias por tu compra!",
    html: `
        <div style="margin-bottom:15px;">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="var(--primario-dark)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                        10-4.48 10-10S17.52 2 12 2zm-1.2 14.2l-3.5-3.5
                        1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-5.9 5.9z"/>
            </svg>
        </div>

        Total a pagar: <strong>$${calcularTotal()}</strong><br><br>

        <small>
            El pago es solo una demostración, no se procesa ningún cobro.
        </small>
    `,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "var(--primario-dark)"
});

}

