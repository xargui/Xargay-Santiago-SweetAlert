
// Vars
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];



// Listeners usuario
cargarEventListeners();

function cargarEventListeners() {
     // Cuando se apreta en "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Cuando apretás vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
     
     
}




// Funciones
// Añadir el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // recorrido para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          leerDatosCurso(curso);

          Swal.fire({
               title: 'Super!',
               text: 'Has añadido el curso al carrito de compras',
               icon: 'success',
               confirmButtonText: 'Aceptar'
             })
     }
}

// Leer los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];  // ->spread operator
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     carritoHTML();
}

// Eliminar el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del array del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          //msj curso eliminado
         
          Swal.fire({
               title: 'Curso eliminado',
               text: 'No dejes de buscar nuevos cursos',
               icon: 'warning',
               confirmButtonText: 'Aceptar'
             })

          carritoHTML();
     }
}


// Mostrar el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
       
     });

}

// Eliminar los cursos del carrito en el DOM
function vaciarCarrito() {
          contenedorCarrito.innerHTML = '';    
}
