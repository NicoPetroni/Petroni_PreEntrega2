const formProd = document.getElementById("formProd");
const divListaProd = document.getElementById("ListaProd");
const pSumaTotal = document.getElementById("sumaTotal")
const botonActualizarTotal = document.getElementById("actualizarTotal")
const inputNombreProducto = document.getElementById("inputProd")
const inputPrecioProducto = document.getElementById("inputPrecio")

const Productos = []

//actualizar lista
function actualizarListaProductos() {
  const carrito = document.getElementById("listaProd")
  carrito.innerHTML = '';

Productos.forEach((prod, index) => {
  const lineaCarrito = document.createElement("li")

  lineaCarrito.innerHTML = `Producto: ${prod.Nombre} $${prod.Precio}`

  //boton eliminar
  const botonEliminar = document.createElement('button')
    botonEliminar.innerText = 'borrar'
    botonEliminar.addEventListener('click', () => {
      Productos.splice(index, 1);
      localStorage.setItem('productos', JSON.stringify(Productos))

      actualizarListaProductos();
    })

    lineaCarrito.appendChild(botonEliminar)
    carrito.appendChild(lineaCarrito)
  })
}

function cargarProductosLocalStorage() {
  const storeData = localStorage.getItem('productos')

  if (storeData) {
    const parsedData = JSON.parse(storeData)

    parsedData.forEach((producto)=>{
      producto.Precio = parseFloat(producto.Precio)
    })
    Productos.push(...parsedData)
    actualizarListaProductos();
  }
}

window.addEventListener('load', cargarProductosLocalStorage());

class Producto {
  constructor(Nombre, Precio) {
    this.Nombre = Nombre;
    this.Precio = Precio
  }
}

formProd.addEventListener('submit', e => {
  e.preventDefault();
 
  const nombreProducto = inputNombreProducto.value
  const precioProducto = parseFloat(inputPrecioProducto.value)

  const productoNuevo = new Producto(nombreProducto, precioProducto)

  Productos.push(productoNuevo)

  console.clear();


  Productos.forEach((productoNuevo) => {
    console.log(`PRODUCTO ${productoNuevo.Nombre} $ ${productoNuevo.Precio}`)
  })

  formProd.reset();

  localStorage.setItem('productos', JSON.stringify(Productos))

  actualizarListaProductos();
})

//boton actualizar Subtotal

botonActualizarTotal.addEventListener("click", actualizarSubTotal)
function actualizarSubTotal() {
  let total = 0
  for (const producto of Productos) {
    total += producto.Precio
  }
  pSumaTotal.innerHTML = `$${total}`
}