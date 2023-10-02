const listaLibros = document.getElementById("lista-libros");
const favoritos = document.getElementById("favoritos");

const libros = [
    
        {
            "titulo": "EL PSICOANALISTA",
            "autor": "John K.",
            "genero": "Ficción",
        },
        {
            "titulo": "EL LABERINTO DE ESPIRITUS",
            "autor": "Carlos R.",
            "genero": "Suspenso",
        },
        {
            "titulo": "EL TIEMPO DE COSTURAS",
            "autor": "Maria D.",
            "genero": "Romance",
        },
        {
            "titulo": "LA MUJER DEL VIAJERO",
            "autor": "Marcio T.",
            "genero": "Romance",
        }, 
];


function mostrarLibros() {
    listaLibros.innerHTML = '';
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = libro.titulo;
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "AGREGAR A FAVORITOS";
        btnAgregar.classList.add("button");
        btnAgregar.addEventListener("click", () => {
            agregarFavorito(libro);
        });
        li.appendChild(btnAgregar);
        listaLibros.appendChild(li);
    });
}


function agregarFavorito(libro) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const libroDuplicado = favoritosGuardados.find(fav => fav.titulo === libro.titulo);

    if (!libroDuplicado) {
        const li = document.createElement("li");

        const detalleLibro = document.createElement("div");
        detalleLibro.classList.add("detalle-libro"); 

        detalleLibro.innerHTML = `
            <p><strong>Título:</strong> ${libro.titulo}</p>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
        `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            eliminarFavorito(libro, li);
        });

        li.textContent = libro.titulo;

        li.appendChild(btnEliminar);
        li.appendChild(detalleLibro);

        favoritos.appendChild(li);

        favoritosGuardados.push(libro);
        localStorage.setItem("favoritos", JSON.stringify(favoritosGuardados));
    } 
}

function eliminarFavorito(libro, elementoLi) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const nuevosFavoritos = favoritosGuardados.filter(fav => fav.titulo !== libro.titulo);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    elementoLi.remove();
}

function cargarFavoritos() {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritosGuardados.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = libro.titulo;
        favoritos.appendChild(li);
    });
}

cargarFavoritos();
mostrarLibros();

