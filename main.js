const FormProd = document.querySelector ("#FormProd");
const InputProd = document.querySelector ("#InputProd");
const InputPrecio = document.querySelector ("#InputPrecio");
const divListaProd = document.querySelector ("#ListaProd");

const Productos = json.parse(localStorage.getItem ("Productos")) || [];

class Producto {
        constructor(NombreProducto, Precio) {
            this.Producto = NombreProducto;
            this.Precio = Precio;
        }
     }

FormProd.onsubmit = e => {

    const Producto = InputProd.value;
    const Precio = InputPrecio.value;

    const prod = new Producto ({Producto, Precio});
    
    CargarProducto (Producto)

}

    function CargarProducto (Producto){
        Productos.push (Producto);
        localStorage.setItem ("Productos", json.stringify (Productos));
        MostrarProd()
}

function MostrarProd() {    
    let ListaProdHtml = ''
    for (const Producto of Productos) {
        ListaProdHtml += Producto.Producto += Producto.Precio
    }
    divListaProd.innerHTML = ListaProdHtml
}













// class Producto {
//     constructor(NombreProducto, Precio) {
//         this.Nombre = NombreProducto;
//         this.precio = Precio;
//     }
//  }

//  const Productos = [];
//  function SolicitarProducto() {
//     const CantidadProductos = parseInt (prompt ('Cuantos productos desea ingresar?'));
//     for (let i=0; i<CantidadProductos; i++){
//     const Nombre = prompt('Ingrese el nombre del producto');
//     const precio = parseFloat(prompt('Ingrese el valor del producto'));
//     const prod = new Producto(Nombre, precio); 

//     Productos.push(prod);  
//  }
//  }
 
//  SolicitarProducto();
 
//  // Calcular la suma total de los precios de los productos
//  const sumaTotal = Productos.reduce((total, prod) => total + prod.precio, 0);
 
//  console.log("Productos:", Productos);
//  console.log("Suma total de precios:", sumaTotal);
 
//  let totalConDescuento = sumaTotal; // Precio sin descuento
 
//  if (Productos.length >= 3) {
//      const descuento = sumaTotal * 0.1;
//      totalConDescuento -= descuento;
//      console.log("Descuento aplicado:", descuento); 
// }

//  console.log("Total con descuento:", totalConDescuento); // Precio con descuento
