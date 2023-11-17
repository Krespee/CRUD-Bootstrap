const pacientes = [];

//borrar pacientes
//añadir evento a los botones
const borrarPacientes = () => {
  const btnDelete = document.querySelectorAll("#btn-delete");
  btnDelete.forEach((e) => {
    e.addEventListener("click", ({ target }) => {
      console.log(parseInt(target.getAttribute("identificador")));
      pacientes.splice(parseInt(target.getAttribute("identificador")), 1);
      localStorage.removeItem(parseInt(target.getAttribute("identificador")));
      listadoPacientes();
      console.log(pacientes);
    });
  });
};

//leer localstorage
const loadDBList = () => {
  let keys = Object.keys(localStorage);
  keys.sort();
  keys.forEach((key) => {
    if (!isNaN(key)) {
      let value = localStorage.getItem(key);
      pacientes.push(JSON.parse(value));
    }
  });
  if (pacientes != "") {
    listadoPacientes();
  }
};
loadDBList();

//manejar el submit del form, guardar info en el array y llamamr a listadoPacientes().
function manejarSubmit(event) {
  event.preventDefault();
  pacientes.push({
    dni: document.getElementById("dni").value,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    edad: document.getElementById("edad").value,
  });
  listadoPacientes();
}

//mostrar y guardar pacientes
function listadoPacientes() {
  localStorage.clear();
  const listadoPacientes = document.getElementById("listadoPacientes");
  listadoPacientes.innerHTML = "";
  for (const key in pacientes) {
    listadoPacientes.innerHTML += `
           <li class="list-group-item text-center">
             <span>${pacientes[key].dni}</span> -
             <span>${pacientes[key].nombre}</span> -
             <span>${pacientes[key].apellido}</span> -
             <span>${pacientes[key].edad}</span>
             <button class="btn btn-danger ms-5" id="btn-delete" identificador="${key}">Eliminar</button>
           </li>
    `;
    localStorage.setItem(key, JSON.stringify(pacientes[key]));
  }
  borrarPacientes();
}
