// Menu hamburguesa - Manteniendo tu funcionalidad original
const hamburguesa = document.getElementById('MenuHamburguesa');
const Menu = document.querySelector('.MenuNavegacion');

hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show');
});

// Funcionalidad de los botones de compra por género
const botonHombre = document.getElementById('BotonHombre');
const botonMujer = document.getElementById('BotonMujer');
const botonGeneral = document.getElementById('BotonCompraGeneral');

// Botón para ropa de hombre
botonHombre.addEventListener('click', () => {
    // Aquí puedes redirigir a una página específica para ropa de hombre
    // O puedes usar parámetros para filtrar
    window.location.href = 'Index.html?categoria=hombre';
    
    // Alternativa: mostrar mensaje específico mientras desarrollas
    // alert('¡Redirigiendo a la sección de ropa para hombre!');
});

// Botón para ropa de mujer
botonMujer.addEventListener('click', () => {
    // Aquí puedes redirigir a una página específica para ropa de mujer
    // O puedes usar parámetros para filtrar
    window.location.href = 'Index.html?categoria=mujer';
    
    // Alternativa: mostrar mensaje específico mientras desarrollas
    // alert('¡Redirigiendo a la sección de ropa para mujer!');
});

// Botón general "Ver Todo"
botonGeneral.addEventListener('click', () => {
    // Redirigir a la página principal de productos
    window.location.href = 'Index.html';
});

// Efecto de parallax sutil en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const imagenHombre = document.querySelector('.ImagenHombre');
    const imagenMujer = document.querySelector('.ImagenMujer');
    
    if (imagenHombre && imagenMujer) {
        imagenHombre.style.transform = `translateY(${scrolled * 0.2}px)`;
        imagenMujer.style.transform = `translateY(${scrolled * -0.2}px)`;
    }
});

// Animación de entrada para el contenido central
document.addEventListener('DOMContentLoaded', () => {
    const contenidoCentral = document.querySelector('.ContenidoCentral');
    const botonesSeccion = document.querySelectorAll('.BotonSeccion');
    
    // Animación de los botones laterales
    botonesSeccion.forEach((boton, index) => {
        boton.style.opacity = '0';
        boton.style.transform = 'translateX(-50%) translateY(20px)';
    });
    
    setTimeout(() => {
        // Animar botones laterales
        botonesSeccion.forEach((boton, index) => {
            setTimeout(() => {
                boton.style.transition = 'all 0.8s ease-out';
                boton.style.opacity = '1';
                boton.style.transform = 'translateX(-50%) translateY(0)';
            }, 300 + (index * 200));
        });
    }, 300);
});

// Funcionalidad del carrito (placeholder)
const carritoBtn = document.getElementById('Carrito');

carritoBtn.addEventListener('click', () => {
    alert('Funcionalidad del carrito próximamente!');
});

// Función para obtener parámetros de la URL (útil si quieres usar filtros)
function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Ejemplo de uso de parámetros (opcional)
document.addEventListener('DOMContentLoaded', () => {
    const categoria = obtenerParametroURL('categoria');
    if (categoria) {
        console.log(`Categoría seleccionada: ${categoria}`);
        // Aquí puedes agregar lógica para filtrar productos según la categoría
    }
});

// Efectos hover adicionales para mejorar la interactividad
document.addEventListener('DOMContentLoaded', () => {
    const ladoIzquierdo = document.querySelector('.LadoIzquierdo');
    const ladoDerecho = document.querySelector('.LadoDerecho');
    
    // Efecto hover para el lado de hombre
    ladoIzquierdo.addEventListener('mouseenter', () => {
        ladoIzquierdo.style.transform = 'scale(1.02)';
        ladoIzquierdo.style.transition = 'transform 0.3s ease';
    });
    
    ladoIzquierdo.addEventListener('mouseleave', () => {
        ladoIzquierdo.style.transform = 'scale(1)';
    });
    
    // Efecto hover para el lado de mujer
    ladoDerecho.addEventListener('mouseenter', () => {
        ladoDerecho.style.transform = 'scale(1.02)';
        ladoDerecho.style.transition = 'transform 0.3s ease';
    });
    
    ladoDerecho.addEventListener('mouseleave', () => {
        ladoDerecho.style.transform = 'scale(1)';
    });
});