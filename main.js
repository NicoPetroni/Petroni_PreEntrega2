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

 // Botón eliminar
 const botonEliminar = document.createElement('button');
 botonEliminar.innerText = 'borrar';
 botonEliminar.addEventListener('click', () => {
   Swal.fire({
     title: '¿Estás seguro que desea eliminar el Producto?',
     text: 'No podrás revertir esto',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sí, eliminar',
     cancelButtonText: 'Cancelar'
   }).then((result) => {
     if (result.isConfirmed) {
       // Si el usuario confirma la eliminación
       Productos.splice(index, 1);
       localStorage.setItem('productos', JSON.stringify(Productos));
       actualizarListaProductos();
       Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
     }
   });
 });

 lineaCarrito.appendChild(botonEliminar);
 carrito.appendChild(lineaCarrito);
});
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

//Ingresamos Fetch
fetch('https://fakestoreapi.com/products')
              .then(response => response.json())
              .then(data=>mostrarData(data))
              .catch(error => console.log(error))
      
        const mostrarData = (data) => {
            console.log(data)
            let body = ''
            for (let i = 0; i<data.length; i++){
                body += `<tr><td>${data[i].id}</td><td>${data[i].title}</td><td>${data[i].price}</td></tr>`
            }
      
            document.getElementById('data').innerHTML = body
        }