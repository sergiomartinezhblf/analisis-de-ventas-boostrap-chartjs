export class Graficas {

//METODO PARA GENERAR LA GRAFICA DE BARRAS DE LAS VENTAS DE LOS USUARIOS  
    pintarGraficaBarras(bd){
        let nombres=bd.map(el=>el.usuario)
        console.log(nombres)
        let totales = bd.map(el=>el.totales)
        console.log(totales)
//SE OBTIENEN LOS VALORES MAXIMOS, MINIMOS Y LA MEDIA PARA PODER DEFINIR EL COLOR DE LA BARRA        
        let totalmax = Math.max(...totales)
        let totalmin = Math.min(...totales)
        let totalbajo = Math.floor(((totalmax-totalmin)/3)+totalmin) 
        let totalmed = Math.floor(((totalmax-totalmin)/3)*2+totalmin)
        console.log(totalmax,totalmin,totalmed,totalbajo)
        let colores = bd.map(el=>el.totales>totalmed?"green":el.totales>totalbajo?"yellow":"red")
        console.log(colores)
        var xValues = nombres
        var yValues = totales
        var barColors = colores

//SE CREA LA GRAFICA Y SE PASAN LOS PARAMETROS DE LAS VENTAS Y LOS VENDEDORES        
        new Chart("myChartBar", {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
          options: {
            legend: {display: false},
            title: {
              display: true,
              text: "Ventas del mes por Vendedor"
            }
          }
        });
    }

 //METODO PARA GENERA LA GRAFICA DE LINEAS   
    pintarGraficaLine(sum1,sum2,sum3,sum4){
        
        const xValues = ["","Semana 1", "Semana 2", "Semana 3", "Semana 4"]
        const yValues = [0,sum1,sum2,sum3,sum4];
        

  //SE CREA LA GRAFICA DE LINEAS SE LE PASAN LOS PARAMETROS DE LA SUMA DE LAS VENTAS TOTALES POR SEMANA      
        new Chart("myChartLine", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: yValues
            }]
          },
          options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Total de ventas por Semana"
              },
            scales: {
              yAxes: [{ticks: {min: 100, max:1000}}],
            }
          }
        });    

    }
}