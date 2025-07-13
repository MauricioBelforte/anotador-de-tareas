const input = document.querySelector("#ingreso");
const boton = document.querySelector("button");
const lista = document.querySelector(".lista");


boton.addEventListener("click", function (event) {
    //La función trim() elimina los espacios en blanco al inicio y al final de una cadena de texto.
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    const tarea = input.value.trim();
    if (tarea === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }
    agregarTarea(tarea);
    input.value = ""; // Limpiar el campo de entrada 

}
);


function agregarTareaConEnter(event) {
    // Verifica si la tecla presionada es Enter (código 13) 
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
        const tarea = input.value.trim();
        if (tarea === "") {
            alert("Por favor, ingresa una tarea.");
            return;
        }
        agregarTarea(tarea);
        input.value = ""; // Limpiar el campo de entrada
    }
}




function agregarTarea(textoTarea) {
    // Crear un nuevo elemento de lista y agregarlo a la lista
    // El método createElement() crea un nuevo elemento HTML especificado por su nombre de etiqueta
    const item = document.createElement("li"); /*Se tiene que usar li , porque en createElement se usan etiquetas semanticas */


    agregarSpanTexto(textoTarea, item);

    agregarBotonEditar(item);

    /* ✏ */
    agregarBotonEliminar(item);
    // Agregar el botón de eliminar al elemento de lista

    // El método appendChild() agrega un nuevo nodo al final de la lista de hijos de
    lista.appendChild(item);


}



function agregarSpanTexto(textoTarea, item) {
    // El método innerText establece o devuelve el texto de un nodo y sus descendientes
    // Crear un span para el texto de la tarea y agregar en el nodo item
    const textoSpan = document.createElement("span");
    textoSpan.className = "texto-tarea";
    textoSpan.innerText = textoTarea;


    // El método appendChild() agrega un nuevo nodo al final de la lista de hijos de un nodo padre especificado
    // En este caso, estamos agregando un span con texto al elemento de lista (li item) que acabamos de crear.
    // Esto significa que cada vez que se crea un nuevo elemento de lista, también se agrega un span con el texto de la tarea, a ese elemento.
    item.appendChild(textoSpan);
    // Aquí agregas el span con el texto de la tarea al item
}


function agregarBotonEditar(item) {
    // Crear un button para agregar en el nodo item
    const botonEditar = document.createElement("button");
    botonEditar.className = "boton-editar tooltip";
    botonEditar.setAttribute("aria-label", "Editar tarea");
    // El orden importa, porque innerText borra todo el contenido previo del botón.


    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("class", "icon icon-pencil2");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 0 32 32");

    const useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");
    useElem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-pencil2");
    svgIcon.appendChild(useElem);

    botonEditar.appendChild(svgIcon);

    // Crear un span para el tooltip y agregarlo al botón
    const tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
    tooltip.innerText = "Editar tarea";
    botonEditar.appendChild(tooltip);
    // Agregar un evento click al botón de editar
    botonEditar.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que el click se propague al li
        const spanTexto = item.querySelector(".texto-tarea");
        const textoActual = spanTexto.innerText;

        // Crear input para edición
        const inputEdicion = document.createElement("input");
        inputEdicion.type = "text";
        inputEdicion.value = textoActual;
        inputEdicion.className = "input-editar";

        // Reemplazar el span por el input
        item.replaceChild(inputEdicion, spanTexto);
        inputEdicion.focus();
        // Guardar cambios al presionar Enter o perder el foco
        inputEdicion.addEventListener("blur", finalizarEdicion);
        inputEdicion.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                finalizarEdicion();
            }
        });

        function finalizarEdicion() {
            const nuevoTexto = inputEdicion.value.trim();
            const nuevoSpan = document.createElement("span");
            nuevoSpan.className = "texto-tarea";
            nuevoSpan.innerText = nuevoTexto !== "" ? nuevoTexto : textoActual;
            // Si el input estaba en un li completado, agrega la clase
            if (spanTexto.classList.contains("tarea-completada")) {
                nuevoSpan.classList.add("tarea-completada");
            }
            item.replaceChild(nuevoSpan, inputEdicion);
        }
    });

    item.appendChild(botonEditar);
}

function agregarBotonEliminar(item) {
    // Crear un button para agregar en el nodo item
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "boton-eliminar tooltip";
    botonEliminar.setAttribute("aria-label", "Eliminar tarea");
    // El orden importa, porque innerText borra todo el contenido previo del botón.



    // Crear el SVG para el icono de tacho de basura
    const svgBin = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgBin.setAttribute("class", "icon icon-bin");
    svgBin.setAttribute("width", "24");
    svgBin.setAttribute("height", "24");
    svgBin.setAttribute("viewBox", "0 0 32 32");

    const useBin = document.createElementNS("http://www.w3.org/2000/svg", "use");
    useBin.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-bin");
    svgBin.appendChild(useBin);

    botonEliminar.appendChild(svgBin);



    // Crear un span para el tooltip y agregarlo al botón
    const tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
    tooltip.innerText = "Eliminar tarea";
    botonEliminar.appendChild(tooltip);


    botonEliminar.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que el click se propague al li
        // Eliminar el elemento de la lista
        lista.removeChild(item);
    });

    item.appendChild(botonEliminar);// Aquí agregas el botón al item

    // Agrega el botón de eliminar al elemento de lista
    // El método appendChild() agrega un nuevo nodo al final de la lista de hijos de un nodo padre especificado
    // En este caso, estamos agregando el botón de eliminar al elemento de lista (li item) que acabamos de crear.
    // Esto significa que cada vez que se crea un nuevo elemento de lista, también se agrega un botón de eliminar a ese elemento.

}


//Aprovechamos la propagacion de los elementos

lista.addEventListener("click", function (event) {
    // Verificamos si el elemento clickeado es un elemento de lista 

    if (event.target.classList.contains("texto-tarea")) {
        marcarTareaCompletada(event.target);
    }
    // event.target es el elemento que disparó el evento, en este caso, el elemento li
    // Si el elemento clickeado es un elemento de lista, llamamos a la función

});


function marcarTareaCompletada(elementoSpan) {

    elementoSpan.classList.toggle("tarea-completada");
}

