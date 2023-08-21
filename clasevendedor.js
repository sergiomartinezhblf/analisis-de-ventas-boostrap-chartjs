//DEFINICION DE LA CLASE VENDEDOR

export class Vendedor {
    constructor(nombre,usuario, email,telefono,ventas=[0,0,0,0]){
    this.nombre = nombre;
    this.usuario= usuario;
    this.email= email;
    this.telefono=telefono;
    this.ventas=ventas;
}

//METODO PARA GENERAR LAS VENTAS ALEATORIAS A PARTIR DE LAS VENTAS DEL VENDEDOR VALOR MINIMO 10 Y MAXIOMO DE 100
obtenerVentas () {
    let newarrayventas=this.ventas.map(el=>Math.floor(Math.random() * (100 - 10) + 10))
    return newarrayventas
}


}