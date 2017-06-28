// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  var cont=0;
  var ganar=0;
  for (a=0;a<3;a++){
    for (i=0;i<3;i++) {
      cont++;
      if (cont==grilla[a][i])
        ganar++;
    }
  }
  if (ganar==9)
    return true;
  else
    return;
}
// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("GANAS PERRO!!");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var a;
  console.log(fila1,columna1)
  console.log(fila2,columna2)
  var numeroViejo = grilla[fila1][columna1]
  var numeroNuevo = grilla[fila2][columna2]
  grilla[fila2][columna2]=numeroViejo;
  grilla[fila1][columna1]=numeroNuevo;
  var pieza1 = document.getElementById(numeroViejo);
  var pieza2 = document.getElementById(numeroNuevo);
  var padre = pieza1.parentNode;
  var clon1 = pieza1.cloneNode(true);
  var clon2 = pieza2.cloneNode(true);
  padre.replaceChild(clon1,pieza2);
  padre.replaceChild(clon2,pieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarposicionVacia(nuevaFila,nuevaColumna){
    posicionVacia.fila=nuevaFila;
    posicionVacia.columna=nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if(fila<3 && fila>-1){
    if(columna<3 && columna>-1)
      return true;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)==true){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarposicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    contMov+=1;
    document.getElementById('mov').innerText="Movimientos: " + contMov.toString();
  }

}

function mostrarMovimientos(){

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
  contMov=0
  document.getElementById('mov').innerText="Movimientos: 0";
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano==true){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}
iniciar();
var contMov=0;
