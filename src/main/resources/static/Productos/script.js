// Menu hamburguesa - Manteniendo tu funcionalidad original
const hamburguesa = document.getElementById('MenuHamburguesa');
const Menu = document.querySelector('.MenuNavegacion');

hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show');
});

// ELIMINÉ toda la funcionalidad conflictiva de los botones de compra por género
// Ya que ahora son enlaces directos <a> en lugar de botones con JavaScript

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
    if (ladoIzquierdo) {
        ladoIzquierdo.addEventListener('mouseenter', () => {
            ladoIzquierdo.style.transform = 'scale(1.02)';
            ladoIzquierdo.style.transition = 'transform 0.3s ease';
        });
        
        ladoIzquierdo.addEventListener('mouseleave', () => {
            ladoIzquierdo.style.transform = 'scale(1)';
        });
    }
    
    // Efecto hover para el lado de mujer
    if (ladoDerecho) {
        ladoDerecho.addEventListener('mouseenter', () => {
            ladoDerecho.style.transform = 'scale(1.02)';
            ladoDerecho.style.transition = 'transform 0.3s ease';
        });
        
        ladoDerecho.addEventListener('mouseleave', () => {
            ladoDerecho.style.transform = 'scale(1)';
        });
    }
});