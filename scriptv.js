let nombres = [];
let historial = []; // Para guardar el historial de sorteos

// Lista de emojis aleatorios para cada nombre
const emojis = ['🎈','🎉','✨','🌟','🎁'];

// Función para lanzar confeti
function lanzarConfeti() {
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6ec7', '#00c9ff', '#fdbb2d', '#28a745', '#e63946']
    });
}

// Agregar nombre a la lista
function agregarNombre() {
    const entrada = document.getElementById("entradaNombre");
    const mensajeError = document.getElementById("mensajeError");
    const nombre = entrada.value.trim();

    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre)) {
        mensajeError.textContent = "⚠️ Solo se pueden ingresar nombres, no números ni caracteres especiales.";
        setTimeout(() => mensajeError.textContent = "", 3000);
        entrada.value = "";
        return;
    }

    if (nombre !== "" && !nombres.includes(nombre)) {
        nombres.push(nombre);
        actualizarLista();
    }
    entrada.value = "";
}

// Actualizar lista de nombres
function actualizarLista() {
    const lista = document.getElementById("listaNombres");
    lista.innerHTML = "";
    nombres.forEach((nombre, indice) => {
        const elemento = document.createElement("div");
        elemento.className = "item-nombre";
        // Emoji aleatorio delante del nombre
        elemento.textContent = `${emojis[Math.floor(Math.random() * emojis.length)]} ${nombre}`;

        // Botón eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.title = "Eliminar";
        botonEliminar.onclick = () => eliminarNombre(indice);

        elemento.appendChild(botonEliminar);
        lista.appendChild(elemento);
    });
}

// Eliminar nombre
function eliminarNombre(indice) {
    nombres.splice(indice, 1);
    actualizarLista();
}

// Sortear un amig@ secreto
function sortearAmigo() {
    const mensajeSorteo = document.getElementById("mensajeSorteo");

    if (nombres.length < 2) {
        mensajeSorteo.textContent = "⚠️ Debe haber al menos 2 nombres para sortear.";
        setTimeout(() => mensajeSorteo.textContent = "", 3000);
        return;
    }

    const nombresDisponibles = [...nombres];
    const resultados = [];

    while (nombresDisponibles.length > 0) {
        const indice = Math.floor(Math.random() * nombresDisponibles.length);
        resultados.push(nombresDisponibles.splice(indice, 1)[0]);
    }

    let contador = 0;
    function mostrarSorteo() {
        if (contador < resultados.length) {
            const mensaje = `🎁 ¡Tú amig@ secret@ es: ${resultados[contador]} 🎉`;
            mensajeSorteo.textContent = mensaje;
            lanzarConfeti();

            // Guardar en historial
            historial.push(mensaje);

            contador++;
            setTimeout(mostrarSorteo, 2000);
        } else {
            mensajeSorteo.textContent = "✅ Todos los nombres han sido sorteados.";
            setTimeout(() => mensajeSorteo.textContent = "", 5000);
        }
    }
    mostrarSorteo();
}

// Sortear parejas
function sortearParejas() {
    const mensajeSorteo = document.getElementById("mensajeSorteo");

    if (nombres.length < 2) {
        mensajeSorteo.textContent = "⚠️ Debe haber al menos 2 nombres para sortear parejas.";
        setTimeout(() => mensajeSorteo.textContent = "", 3000);
        return;
    }

    const nombresDisponibles = [...nombres];
    const parejas = [];

    while (nombresDisponibles.length > 1) {
        const p1 = nombresDisponibles.splice(Math.floor(Math.random() * nombresDisponibles.length), 1)[0];
        const p2 = nombresDisponibles.splice(Math.floor(Math.random() * nombresDisponibles.length), 1)[0];
        parejas.push([p1, p2]);
    }

    let contador = 0;
    function mostrarPareja() {
        if (contador < parejas.length) {
            const mensaje = `🎉 ${parejas[contador][0]} → tu amig@ secret@ es ${parejas[contador][1]} 🎁`;
            mensajeSorteo.textContent = mensaje;
            lanzarConfeti();

            // Guardar en historial
            historial.push(mensaje);

            contador++;
            setTimeout(mostrarPareja, 4000);
        } else {
            mensajeSorteo.textContent = "✅ Todas las parejas han sido sorteadas.";
            setTimeout(() => mensajeSorteo.textContent = "", 5000);
        }
    }
    mostrarPareja();
}

// Mostrar historial
function mostrarHistorial() {
    const contenedorHistorial = document.getElementById("historialSorteos");
    
    if (historial.length === 0) {
        contenedorHistorial.textContent = "No hay historial de sorteos aún.";
    } else {
        contenedorHistorial.innerHTML = ""; // limpiar contenido previo
        historial.forEach((item, idx) => {
            const div = document.createElement("div");
            div.textContent = `${idx + 1}. ${item}`;
            contenedorHistorial.appendChild(div);
        });
    }

    // Mostrar contenedor
    contenedorHistorial.style.display = "block";
}


// Reiniciar lista y limpiar historial
function reiniciarLista() {
    nombres = [];
    historial = [];
    actualizarLista();
    document.getElementById("mensajeSorteo").textContent = "";

    // Ocultar historial
    document.getElementById("historialSorteos").style.display = "none";
    document.getElementById("historialSorteos").innerHTML = "";
}
