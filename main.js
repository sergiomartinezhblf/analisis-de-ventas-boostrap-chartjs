//IMPORTACIÓN DE CLASES VENDEDOR Y GRAFICAS
import { Vendedor } from "./clasevendedor.js"
import { Graficas } from "./clasegraficas.js"

//REFERENCIAS AL DOM
const contenedor = document.getElementById("cards-container")
const filas = document.getElementById("filas")
const fila_totales= document.getElementById("filatotales")
const filtro_nombre= document.getElementById("filtroNombre")
const filtro_nivel= document.getElementById("filtroNivel")
const filtro_totales= document.getElementById("filtroTotales")

//DEFINICION DE VARIABLES
let bd=[]
let bdxnombre
let bdxnivel
let bdxtotales
let sum_sem1=0
let sum_sem2=0
let sum_sem3=0
let sum_sem4=0

// FUNCION PARA LLAMAR USARIOS DE LA API DE JSONPLACEHOLDER
const fetchData = async()=>{
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        console.log(data)
        
//CREACIÓN DE LOS OBJETOS VENDEDOR POR MEDIO DE LA CLASE VENDEDOR        
        data.forEach(el => {
            let vendedor = new Vendedor(el.name,el.username,el.email,el.phone)
            vendedor.ventas=vendedor.obtenerVentas()
            bd.push(vendedor)
// SUMA DE LAS VENTAS TOTALES POR SEMANA            
            sum_sem1+=vendedor.ventas[0]
            sum_sem2+=vendedor.ventas[1]
            sum_sem3+=vendedor.ventas[2]
            sum_sem4+=vendedor.ventas[3]
        })
            console.log(bd) 
//LLAMADA A LA FUNCION PARA OBTENER VENTAS Y NIVEL DE VENDEDOR
            obtenerTotales()
            obtenerNivelVendedor()

//ORDENAMIENTO DEL LA BASE DE DATOS POR NOMBRE            
            bdxnombre = bd.map(el=>el)
            bdxnombre.sort((a, b) => {
              if (a.nombre < b.nombre) {
                return -1;
              }
              if (a.nombre > b.nombre) {
                return 1;
              }
              return 0;
            })

//ORDENAMIENTO DE LA BASE DE DATOS POR NIVEL DE VENDEDOR            
            bdxnivel = bd.map(el=>el)
            bdxnivel.sort((a, b) => {
              if (a.nivel < b.nivel) {
                return -1;
              }
              if (a.nivel > b.nivel) {
                return 1;
              }
              return 0;
            })

//ORDENAMIENTO DE LA BASE DE DATOS POR VENTAS TOTALES            
            bdxtotales = bd.map(el=>el)
            bdxtotales.sort((a, b) => b.totales - a.totales)

//LLAMADA A LAS FUNCIONES PARA GENERAR LAS CARDS DE LOS VENDEDORES Y LA TABLA DE VENTAS            
            pintarVentas(bd,sum_sem1,sum_sem2,sum_sem3,sum_sem4)
            pintarCards(bd)

//UTILIZACIÓN DE LOS METODOS DE LA CLASE GRAFICAS PARA GENERAR LAS GRAFICAS DE BARRAS Y DE LINEAS            
            let graficas = new Graficas()
            graficas.pintarGraficaBarras(bd)
            graficas.pintarGraficaLine(sum_sem1,sum_sem2,sum_sem3,sum_sem4)
    } catch (error) {
        
    }
    console.log(bd)
}


//FUNCIÓN PARA OBTENR LOS TOTALES DE LAS VENTAS
const obtenerTotales = ()=>{
bd.forEach(el=>{
  let suma = el.ventas.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  el.totales=suma
})
console.log(bd)
}

//FUNCIÓN PARA OBTENER EL NIVEL DE VENDEDOR, ORO A PARTIR DE 2OO VENTAS, PLATINO A PARTIR DE 150 VENTAS Y AZUL PARA MENORES A 150 VENTAS
const obtenerNivelVendedor = () =>{
    bd.forEach(el=>{
     let nivel = el.totales>199?"Oro":el.totales>149?"Platino":"Azul"
    el.nivel=nivel
    })
    console.log(bd)
      }
  
  //FUNCIÓN PARA GENERAR LAS CARDS DE LOS VENDEDORES E INSERTARLAS EN EL CONTENEDOR    
      const pintarCards = (bd)=>{
      let cards=""  
      bd.forEach((el,index)=>{  
      console.log(el)  
      cards+=`<div class="col-6 col-md-4 col-lg-3">
      <div class="card pt-1 text-light tarjeta">
          <img src="https://robohash.org/${index}?set=set5" style="width:150px"class="card-img-top rounded-circle m-auto pb-2" alt="...">
          <div class="card-body bg-secondary">
            <h5 class="card-title text-center">${el.nombre}</h5>
            <div class="d-flex justify-content-center"><span class="m-auto border light bg-${el.nivel==="Oro"?"warning":el.nivel==="Platino"?"secondary":"primary"} text-white px-2 rounded">Nivel ${el.nivel}</span></div>
            <div class="d-flex justify-content-start"><i class="bi bi-person pe-1"></i> ${el.usuario}</div>
            <div class="d-flex justify-content-start"><i class="bi bi-envelope pe-1"></i> ${el.email}</div>
            <div class="d-flex justify-content-start"><i class="bi bi-telephone pe-1"></i> ${el.telefono}</div>
            </div>          
        </div>
        </div>`
      })
      contenedor.innerHTML=cards
      }

 //FUNCIÓN PARA GENERAR LA TABLA DE VENTAS     
      const pintarVentas = (bd,sem1,sem2,sem3,sem4) =>{
        let fila=""
        bd.forEach((el,index)=>{
           fila+=`<tr>
           <th scope="row">${index+1}</th>
           <td>${el.nombre}</td>
           <td>${el.nivel}</td>
           <td>${el.ventas[0]}</td>
           <td>${el.ventas[1]}</td>
           <td>${el.ventas[2]}</td>
           <td>${el.ventas[3]}</td>
           <td>${el.totales}</td>
         </tr>`
        })
       filas.innerHTML=fila
       fila_totales.innerHTML=`<tr>
       <th></th>
       <th scope="row">Totales de ventas</td>
       <td></td>
       <td>${sem1}</td>
       <td>${sem2}</td>
       <td>${sem3}</td>
       <td>${sem4}</td>
       <td>${sem1+sem2+sem3+sem4}</td>
     </tr>`
       

  }

//LLAMADA A LA FUNCIÓN PRINCIPAL A LA CARGA DEL DOM  
document.addEventListener("DOMContentLoaded",fetchData)


//ESCUCHADORES DEL EVENTO CLICK PARA ORDENAR LA TABLA POR NOMBRE, POR NIVEL Y POR TOTALES
filtro_nombre.addEventListener("click",()=>{
  filas.innerHTML=""
  fila_totales.innerHTML=""
  pintarVentas(bdxnombre,sum_sem1,sum_sem2,sum_sem3,sum_sem4)
})

filtro_nivel.addEventListener("click",()=>{
  filas.innerHTML=""
  fila_totales.innerHTML=""
  pintarVentas(bdxnivel,sum_sem1,sum_sem2,sum_sem3,sum_sem4)
})

filtro_totales.addEventListener("click",()=>{
  filas.innerHTML=""
  fila_totales.innerHTML=""
  pintarVentas(bdxtotales,sum_sem1,sum_sem2,sum_sem3,sum_sem4)
})
