// JavaScript para el menú hamburguesa
document.getElementById('MenuHamburguesa').addEventListener('click', function() {
    const menu = document.getElementById('MenuNavegacion');
    menu.classList.toggle('show');
});

// JavaScript para validación del formulario
document.getElementById('formulario-registro').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Obtener los elementos del formulario
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const contraseña = document.getElementById('contraseña');
    const confirmarContraseña = document.getElementById('confirmar-contraseña');
    
    let esValido = true;

    // Validar nombre completo
    if (nombre.value.trim().length < 2) {
        mostrarError('error-nombre', nombre);
        esValido = false;
    } else {
        ocultarError('error-nombre', nombre);
    }

    // Validar correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value)) {
        mostrarError('error-correo', correo);
        esValido = false;
    } else {
        ocultarError('error-correo', correo);
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (contraseña.value.length < 6) {
        mostrarError('error-contraseña', contraseña);
        esValido = false;
    } else {
        ocultarError('error-contraseña', contraseña);
    }

    // Validar que las contraseñas coincidan
    if (contraseña.value !== confirmarContraseña.value) {
        mostrarError('error-confirmar', confirmarContraseña);
        esValido = false;
    } else {
        ocultarError('error-confirmar', confirmarContraseña);
    }

    // Si todo es válido, procesar el registro
    if (esValido) {
        procesarRegistro(nombre.value, correo.value, contraseña.value);
    }
});

// Función para mostrar errores
function mostrarError(errorId, input) {
    const mensajeError = document.getElementById(errorId);
    mensajeError.style.display = 'block';
    input.classList.add('input-error');
}

// Función para ocultar errores
function ocultarError(errorId, input) {
    const mensajeError = document.getElementById(errorId);
    mensajeError.style.display = 'none';
    input.classList.remove('input-error');
}

// Función para procesar el registro exitoso
function procesarRegistro(nombre, correo, contraseña) {
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log('Datos del registro:', { nombre, correo, contraseña });
    
    // Mostrar mensaje de éxito
    alert('¡Registro exitoso! Bienvenido a FalaFeria, ' + nombre + '!');
    
    // Limpiar el formulario
    document.getElementById('formulario-registro').reset();
    
    // Opcional: redirigir a otra página
    // window.location.href = '../index.html';
    
    // Opcional: redirigir a página de inicio de sesión
    // window.location.href = '../Login/index.html';
}

// Validación en tiempo real mientras el usuario escribe
document.getElementById('nombre').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        ocultarError('error-nombre', this);
    }
});

document.getElementById('correo').addEventListener('input', function() {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexCorreo.test(this.value)) {
        ocultarError('error-correo', this);
    }
});

document.getElementById('contraseña').addEventListener('input', function() {
    if (this.value.length >= 6) {
        ocultarError('error-contraseña', this);
    }
    
    // También verificar si las contraseñas coinciden
    const confirmarContraseña = document.getElementById('confirmar-contraseña');
    if (confirmarContraseña.value && this.value === confirmarContraseña.value) {
        ocultarError('error-confirmar', confirmarContraseña);
    }
});

document.getElementById('confirmar-contraseña').addEventListener('input', function() {
    const contraseña = document.getElementById('contraseña');
    if (this.value && contraseña.value === this.value) {
        ocultarError('error-confirmar', this);
    }
});

// Cerrar menú hamburguesa al hacer clic en un enlace
const enlaces = document.querySelectorAll('.MenuNavegacion .Links');
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function() {
        const menu = document.getElementById('MenuNavegacion');
        menu.classList.remove('show');
    });
});

// Cerrar menú hamburguesa al hacer clic fuera de él
document.addEventListener('click', function(e) {
    const menu = document.getElementById('MenuNavegacion');
    const botonMenu = document.getElementById('MenuHamburguesa');
    
    if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
        menu.classList.remove('show');
    }
});