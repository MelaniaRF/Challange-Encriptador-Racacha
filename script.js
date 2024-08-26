function abrirModal(title, description, imageSrc = './img/modal.png', accionAceptar = null, accionCancelar = null, mostrarBotonCancelar = true) {
    const modal = document.getElementById('modalAlerta');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalImagen = document.getElementById('modalImagen');
    const botonAceptarModal = document.querySelector('.modal-aceptar-btn');
    const botonCancelarExistente = document.querySelector('.modal-cancelar-btn');
    const cuerpoModal = document.querySelector('.modal-body');

    modalTitulo.textContent = title;
    modalDescripcion.textContent = description;
    modalImagen.src = imageSrc;
    modal.style.display = "block";
    
    if (mostrarBotonCancelar && !botonCancelarExistente) {
        const botonCancelarModal = document.createElement('button');
        botonCancelarModal.textContent = 'Cancelar';
        botonCancelarModal.classList.add('modal-cancelar-btn');
        botonCancelarModal.addEventListener('click', () => {
            cerrarModal();
            if (accionCancelar) accionCancelar();
        });
        cuerpoModal.appendChild(botonCancelarModal);
    } else if (!mostrarBotonCancelar && botonCancelarExistente) {
        botonCancelarExistente.style.display = 'none';
    }

    botonAceptarModal.onclick = function() {
        cerrarModal();
        if (accionAceptar) accionAceptar();
    };
}

function cerrarModal() {
    const modal = document.getElementById('modalAlerta');
    modal.style.display = "none";
}

function validarCampoEntrada() {
    const campoEntrada = document.getElementById('campoEntrada');
    const valorOriginal = campoEntrada.value;
    const nuevoValor = valorOriginal.replace(/[^a-z\s]/g, '');

    if (valorOriginal !== nuevoValor) {
        campoEntrada.value = nuevoValor;
        abrirModal(
            'Caracteres no permitidos',
            'Solo se permiten letras minúsculas y espacios para frases o textos largos. Caracteres especiales y mayúsculas no son permitidos.',
            './img/modal.png',
            null, // No hay acción al aceptar
            null, // No hay acción al cancelar
            false // No mostrar el botón de cancelar
        );
    }

    // Habilitar o deshabilitar botones según el texto ingresado
    const botonEncriptar = document.getElementById('botonEncriptar');
    const botonDesencriptar = document.getElementById('botonDesencriptar');
    const botonLimpiar = document.getElementById('botonLimpiar');

    if (campoEntrada.value.trim() !== '') {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
        botonLimpiar.disabled = false;
    } else {
        botonEncriptar.disabled = false; // Encriptar siempre habilitado si no está vacío
        botonDesencriptar.disabled = true;
        botonLimpiar.disabled = true;
    }
}

function encriptarTexto() {
    const campoEntrada = document.getElementById('campoEntrada').value.trim();
    const campoSalida = document.getElementById('campoSalida');
    const mensajeInicial = document.querySelector('.mensaje-inicial');
    const botonCopiar = document.getElementById('botonCopiar');

    if (campoEntrada === '') {
        abrirModal(
            'Campo vacío',
            'El campo de entrada está vacío. Por favor, ingrese texto para encriptar.',
            './img/modal.png',
            null, // No hay acción al aceptar
            null, // No hay acción al cancelar
            false // No mostrar el botón de cancelar
        );
        return;
    }

    let textoEncriptado = '';
    for (let i = 0; i < campoEntrada.length; i++) {
        switch (campoEntrada[i]) {
            case 'a':
                textoEncriptado += 'ai';
                break;
            case 'e':
                textoEncriptado += 'enter';
                break;
            case 'i':
                textoEncriptado += 'imes';
                break;
            case 'o':
                textoEncriptado += 'ober';
                break;
            case 'u':
                textoEncriptado += 'ufat';
                break;
            default:
                textoEncriptado += campoEntrada[i];
                break;
        }
    }

    campoSalida.value = textoEncriptado;
    campoSalida.classList.add('no-background');
    campoSalida.style.display = 'block';
    mensajeInicial.style.display = 'none';
    botonCopiar.style.display = 'block';
}

function desencriptarTexto() {
    const campoEntrada = document.getElementById('campoEntrada').value.trim();
    const campoSalida = document.getElementById('campoSalida');
    const mensajeInicial = document.querySelector('.mensaje-inicial');
    const botonCopiar = document.getElementById('botonCopiar');

    if (campoEntrada === '') {
        abrirModal(
            'Campo vacío',
            'El campo de entrada está vacío. Por favor, ingrese texto para desencriptar.',
            './img/modal.png',
            null, // No hay acción al aceptar
            null, // No hay acción al cancelar
            false // No mostrar el botón de cancelar
        );
        return;
    }

    let textoDesencriptado = campoEntrada
        .replace(/ai/g, 'a')
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    campoSalida.value = textoDesencriptado;
    campoSalida.classList.add('no-background');
    campoSalida.style.display = 'block';
    mensajeInicial.style.display = 'none';
    botonCopiar.style.display = 'block';
}

function limpiarCamposTexto() {
    const campoEntrada = document.getElementById('campoEntrada').value.trim();
    if (campoEntrada === '') {
        abrirModal(
            'Campo vacío',
            'El campo de entrada está vacío. No hay nada que limpiar.',
            './img/modal.png',
            null, // No hay acción al aceptar
            null, // No hay acción al cancelar
            false // No mostrar el botón de cancelar
        );
        return;
    }

    abrirModal(
        'Confirmar limpieza',
        '¿Está seguro que desea limpiar el campo?',
        './img/modal.png',
        () => {
            document.getElementById('campoEntrada').value = '';
            document.getElementById('campoSalida').value = '';
            document.querySelector('.mensaje-inicial').style.display = 'flex';
            document.getElementById('campoSalida').style.display = 'none';
            document.getElementById('botonCopiar').style.display = 'none';
            validarCampoEntrada(); // Llamar a validarCampoEntrada para actualizar el estado de los botones
        },
        null, // No hay acción al cancelar
        true // Mostrar el botón de cancelar
    );
}

function copiarAlPortapapeles() {
    const campoSalida = document.getElementById('campoSalida');
    const campoEntrada = document.getElementById('campoEntrada');

    if (campoSalida.value === '') {
        abrirModal(
            'Campo vacío',
            'No hay texto para copiar.'
        );
        return;
    }

    abrirModal(
        'Confirmación de copia',
        '¿Está seguro de que desea copiar el texto al campo de entrada?',
        '../img/modal.png',
        () => {
            campoEntrada.value = campoSalida.value;
            campoSalida.value = '';
            document.querySelector('.mensaje-inicial').style.display = 'flex';
            campoSalida.style.display = 'none';
            document.getElementById('botonCopiar').style.display = 'none';
            validarCampoEntrada(); // Actualizar el estado de los botones
        }
    );
}

function mostrarMensajeNotificacion() {
    const mensajeNotificacion = document.getElementById('mensajeNotificacion');
    mensajeNotificacion.style.visibility = 'visible';

    setTimeout(() => {
        mensajeNotificacion.style.visibility = 'hidden';
    }, 1000); // Ocultar notificación después de 1 segundo
}

function restablecerEstadoInicial() {
    document.getElementById('campoEntrada').value = '';
    document.getElementById('campoSalida').value = '';
    document.querySelector('.mensaje-inicial').style.display = 'flex';
    document.getElementById('campoSalida').style.display = 'none';
    document.getElementById('botonCopiar').style.display = 'none';
    validarCampoEntrada(); // Actualizar el estado de los botones
}

function mostrarTooltip(button) {
    const tooltip = document.getElementById('tooltip');

    if (button.disabled) {
        tooltip.style.display = 'block';
        
        const rect = button.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top + window.scrollY - tooltip.offsetHeight) + 'px';

        if (button.id === 'botonDesencriptar') {
            tooltip.textContent = "Habilitado cuando hay texto para desencriptar";
        } else if (button.id === 'botonLimpiar') {
            tooltip.textContent = "Habilitado cuando hay texto para limpiar";
        }
    }
}

function ocultarTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}


function alternarSeccionSalida() {
    const campoEntrada = document.getElementById('campoEntrada');
    const campoSalida = document.getElementById('campoSalida');
    const mensajeInicial = document.querySelector('.mensaje-inicial');
    const botonCopiar = document.getElementById('botonCopiar');

    if (campoEntrada.value.trim() !== '') {
        // Mostrar el área de salida y el botón de copiar si hay texto en el campo de entrada
        campoSalida.style.display = 'block';
        mensajeInicial.style.display = 'none';
        botonCopiar.style.display = 'block';
    } else {
        // Ocultar el área de salida y el botón de copiar si no hay texto en el campo de entrada
        campoSalida.style.display = 'none';
        mensajeInicial.style.display = 'flex';
        botonCopiar.style.display = 'none';
    }
}


document.getElementById('campoEntrada').addEventListener('input', function () {
    validarCampoEntrada();
    alternarSeccionSalida();
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
});
