const listaLibros = document.querySelector("#listaLibros");
const form = document.querySelector("#form");
const formEdit = document.querySelector("#formEdit");

const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

const getBooks = async () => {
    try {
        const { data: libros } = await axios.get("/libros");

        listaLibros.textContent = "";

        libros.forEach((item) => {
            const li = document.createElement("li");
            const btnEdit = document.createElement("button");
            const btnDelete = document.createElement("button");
            const div = document.createElement("div");

            li.textContent = `Nombre libro: ${item.nombre} - Autor: ${item.autor} - Precio: ${item.precio}`;
            li.classList.add("list-group-item");
            btnEdit.setAttribute("data-id", item.id);
            btnDelete.setAttribute("data-id", item.id);

            li.appendChild(div);
            div.appendChild(btnEdit);
            div.appendChild(btnDelete);
            div.classList.add("mt-2");
            btnEdit.classList.add("btn", "btn-warning", "me-2", "btn-edit");
            btnEdit.setAttribute("type", "button");
            btnEdit.textContent = "Editar";
            btnDelete.classList.add("btn", "btn-danger", "btn-delete");
            btnDelete.setAttribute("type", "button");
            btnDelete.textContent = "Eliminar";

            listaLibros.appendChild(li);
        });
    } catch (error) {
        console.error("Error ====> ", error);
    }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;
    const autor = e.target.autor.value;

    if (!nombre.trim() || !precio.trim() || !autor.trim()) return alert("Todos los campos obligatorios");

    try {
        await axios.post("/libros", {
            nombre,
            precio,
            autor,
        });
        getBooks();
    } catch (error) {
        console.error("Error ====> ", error);
        alert(error?.response?.data?.msg);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const ratify = confirm("¿Quiere eliminar libro?");
        if (ratify) {
            removeBook(e.target.dataset.id);
        }
    }
});

const removeBook = async (id) => {
    try {
        await axios.delete(`/libros/${id}`);

        getBooks();
    } catch (error) {
        console.error("Error ====> ", error);
    }
};

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-edit")) {
        myModal.show();

        const { data: libro } = await axios.get(`/libros/${e.target.dataset.id}`);

        formEdit.nombre.value = libro.nombre;
        formEdit.precio.value = libro.precio;
        formEdit.autor.value = libro.autor;
        formEdit.dataset.id = e.target.dataset.id;
    }
});

formEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = e.target.dataset.id;
    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;
    const autor = e.target.autor.value;

    const newBook = {
        nombre,
        precio,
        autor,
    };

    editBook(id, newBook);
});

const editBook = async (id, newBook) => {
    try {
        const { nombre, precio, autor } = newBook;

        await axios.put(`/libros/${id}`, {
            nombre,
            precio,
            autor,
        });

        if (!nombre.trim() || !precio.trim() || !autor.trim()) {
            return alert("Todos los campos son obligatorios");
        }

        myModal.hide();

        getBooks();
    } catch (error) {
        console.error("Error ====> ", error);
        alert(error?.response?.data?.msg);
    }
};

getBooks();
