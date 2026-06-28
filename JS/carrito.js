let carrito=[]; //array vacio para almacenar los productos que se agreguen al carrito

function agregarProducto(producto) {
    carrito.push(producto); //agrega el producto al carrito
    console.log(`Producto agregado: ${producto.nombre} - Precio: ${producto.precio}`);
    console.log(`Total en el carrito: ${calcularTotal()}`);
}

function calcularTotal() {
    let total = 0;
    for (let producto of carrito) {
        total += producto.precio; //suma el precio de cada producto en el carrito
    }
    return total;
}

function mostrarCarrito() {
    console.log("Productos en el carrito:");    
    for (let producto of carrito) {
        //console.log(`- ${producto.nombre}: $${producto.precio}`);  
        console.log("Producto: " + producto.nombre + " - Precio: $" + producto.precio); 
    }  
}

agregarProducto({nombre: "Camisa", precio: 20});
agregarProducto({nombre: "Pantalón", precio: 40});
agregarProducto({nombre: "Zapatos", precio: 60});
agregarProducto({nombre: "Sombrero", precio: 15});
mostrarCarrito();
console.log(`Total en el carrito: ${calcularTotal()}`);