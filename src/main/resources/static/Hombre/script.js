const hamburguesa = document.getElementById('MenuHamburguesa')
const Menu = document.querySelector('.MenuNavegacion')

//esto llama a la funcion show para que se muestren por pantalla
hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show')
})

// Objeto para manejar el carrito de compras
let carrito = [];
let totalCarrito = 0;

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('CantidadCarrito');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
    
    // Agregar animación al contador
    contadorCarrito.style.transform = 'scale(1.2)';
    setTimeout(() => {
        contadorCarrito.style.transform = 'scale(1)';
    }, 200);
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarContadorCarrito();
    mostrarNotificacionCarrito(producto.nombre);
}

// Función para mostrar notificación cuando se agrega al carrito
function mostrarNotificacionCarrito(nombreProducto) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span>✅ ${nombreProducto} agregado al carrito</span>
        </div>
    `;
    
    // Agregar estilos inline para la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Objeto para manejar múltiples carruseles
const carruseles = {
    1: { currentSlide: 0, totalSlides: 5, autoInterval: null, autoTimeoutId: null },
    2: { currentSlide: 0, totalSlides: 4, autoInterval: null, autoTimeoutId: null },
    3: { currentSlide: 0, totalSlides: 4, autoInterval: null, autoTimeoutId: null }
};

// Función para mostrar imagen específica de un producto
function showSlide(productoId, slideIndex) {
    const carrusel = document.querySelector(`[data-producto="${productoId}"]`);
    const imagenes = carrusel.querySelectorAll('.imagen-producto');
    const indicadores = carrusel.querySelectorAll('.indicador-producto');
    
    // Ocultar todas las imágenes
    imagenes.forEach(img => img.classList.remove('active'));
    indicadores.forEach(ind => ind.classList.remove('active'));
    
    // Ajustar índice si está fuera del rango
    if (slideIndex >= carruseles[productoId].totalSlides) {
        carruseles[productoId].currentSlide = 0;
    } else if (slideIndex < 0) {
        carruseles[productoId].currentSlide = carruseles[productoId].totalSlides - 1;
    } else {
        carruseles[productoId].currentSlide = slideIndex;
    }
    
    // Mostrar imagen e indicador activos
    imagenes[carruseles[productoId].currentSlide].classList.add('active');
    indicadores[carruseles[productoId].currentSlide].classList.add('active');
}

// Función para ir a la siguiente imagen
function nextSlide(productoId) {
    showSlide(productoId, carruseles[productoId].currentSlide + 1);
}

// Función para ir a la imagen anterior
function prevSlide(productoId) {
    showSlide(productoId, carruseles[productoId].currentSlide - 1);
}

// Función para iniciar carrusel automático
function startAutoSlide(productoId) {
    // Primero detener cualquier intervalo existente
    stopAutoSlide(productoId);
    
    carruseles[productoId].autoInterval = setInterval(() => {
        nextSlide(productoId);
    }, 4000); // Cambia cada 4 segundos
}

// Función para detener carrusel automático
function stopAutoSlide(productoId) {
    // Limpiar el intervalo automático
    if (carruseles[productoId].autoInterval) {
        clearInterval(carruseles[productoId].autoInterval);
        carruseles[productoId].autoInterval = null;
    }
    
    // Limpiar también cualquier timeout pendiente para reiniciar el auto-slide
    if (carruseles[productoId].autoTimeoutId) {
        clearTimeout(carruseles[productoId].autoTimeoutId);
        carruseles[productoId].autoTimeoutId = null;
    }
}

// Función para programar el reinicio del auto-slide
function scheduleAutoSlideRestart(productoId, delay = 5000) {
    // Limpiar cualquier timeout anterior
    if (carruseles[productoId].autoTimeoutId) {
        clearTimeout(carruseles[productoId].autoTimeoutId);
    }
    
    carruseles[productoId].autoTimeoutId = setTimeout(() => {
        startAutoSlide(productoId);
        carruseles[productoId].autoTimeoutId = null;
    }, delay);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar botones "Añadir al carrito" a cada producto
    const productos = [
        {
            id: 1,
            nombre: "Poleron Hombre talla XL",
            precio: 5700,
            marca: "FALAFERIA"
        },
        {
            id: 2,
            nombre: "Polera Hombre talla XL",
            precio: 3800,
            marca: "FalaFeria"
        },
        {
            id: 3,
            nombre: "Pantalon Hombre talla M",
            precio: 4300,
            marca: "FalaFeria"
        }
    ];

    // Agregar botones de "Añadir al carrito" a cada card
    document.querySelectorAll('.producto-card').forEach((card, index) => {
        const botonCarrito = document.createElement('button');
        botonCarrito.className = 'btn-agregar-carrito';
        botonCarrito.innerHTML = '🛒 Añadir al carrito';
        botonCarrito.style.cssText = `
            width: 100%;
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px 16px;
            margin-top: 15px;
            border-radius: 6px;
            font-size: 0.9em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        
        // Agregar hover effect
        botonCarrito.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#45a049';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        botonCarrito.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#4CAF50';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Agregar evento click
        botonCarrito.addEventListener('click', function() {
            const producto = productos[index];
            agregarAlCarrito(producto);
            
            // Efecto visual en el botón
            this.style.backgroundColor = '#2e7d32';
            this.innerHTML = '✅ ¡Agregado!';
            
            setTimeout(() => {
                this.style.backgroundColor = '#4CAF50';
                this.innerHTML = '🛒 Añadir al carrito';
            }, 1500);
        });
        
        // Insertar el botón en la información del producto
        const productoInfo = card.querySelector('.producto-info');
        productoInfo.appendChild(botonCarrito);
    });
    
    // Configurar botones de navegación
    document.querySelectorAll('.carrusel-btn-producto').forEach(btn => {
        btn.addEventListener('click', function() {
            const productoId = this.getAttribute('data-target');
            const isNext = this.classList.contains('next');
            
            // Detener completamente el auto-slide
            stopAutoSlide(productoId);
            
            if (isNext) {
                nextSlide(productoId);
            } else {
                prevSlide(productoId);
            }
            
            // Programar reinicio del auto-slide
            scheduleAutoSlideRestart(productoId);
        });
    });
    
    // Configurar indicadores
    document.querySelectorAll('.indicador-producto').forEach(indicador => {
        indicador.addEventListener('click', function() {
            const carruselContainer = this.closest('.producto-carrusel');
            const productoId = carruselContainer.getAttribute('data-producto');
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            
            // Detener completamente el auto-slide
            stopAutoSlide(productoId);
            showSlide(productoId, slideIndex);
            
            // Programar reinicio del auto-slide
            scheduleAutoSlideRestart(productoId);
        });
    });
    
    // Configurar hover para pausar/reanudar carrusel automático
    document.querySelectorAll('.producto-card').forEach((card, index) => {
        const productoId = (index + 1).toString();
        
        card.addEventListener('mouseenter', () => {
            stopAutoSlide(productoId);
        });
        
        card.addEventListener('mouseleave', () => {
            startAutoSlide(productoId);
        });
    });
    
    // Configurar selección de colores
    document.querySelectorAll('.color').forEach(color => {
        color.addEventListener('click', function() {
            const contenedorColores = this.parentNode;
            contenedorColores.querySelectorAll('.color').forEach(c => {
                c.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Inicializar carruseles automáticos
    Object.keys(carruseles).forEach(productoId => {
        startAutoSlide(productoId);
    });
    
    // Navegación con teclado (solo cuando se hace hover en un producto)
    let currentHoveredProduct = null;
    
    document.querySelectorAll('.producto-card').forEach((card, index) => {
        const productoId = (index + 1).toString();
        
        card.addEventListener('mouseenter', () => {
            currentHoveredProduct = productoId;
        });
        
        card.addEventListener('mouseleave', () => {
            currentHoveredProduct = null;
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (currentHoveredProduct) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoSlide(currentHoveredProduct);
                prevSlide(currentHoveredProduct);
                scheduleAutoSlideRestart(currentHoveredProduct, 6000);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoSlide(currentHoveredProduct);
                nextSlide(currentHoveredProduct);
                scheduleAutoSlideRestart(currentHoveredProduct, 6000);
            }
        }
    });
    
    // Configurar transiciones suaves
    document.querySelectorAll('.imagen-producto').forEach(img => {
        img.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    // Precargar imágenes para mejor rendimiento
    document.querySelectorAll('.imagen-producto img').forEach(img => {
        const imageUrl = img.src;
        const preloadImg = new Image();
        preloadImg.src = imageUrl;
    });

    // Agregar estilos para las transiciones del contador
    const contadorCarrito = document.getElementById('CantidadCarrito');
    if (contadorCarrito) {
        contadorCarrito.style.transition = 'transform 0.2s ease';
    }
});

// Función de utilidad para reiniciar un carrusel específico
function resetCarrusel(productoId) {
    stopAutoSlide(productoId);
    showSlide(productoId, 0);
    startAutoSlide(productoId);
}

// Función para pausar todos los carruseles
function pauseAllCarruseles() {
    Object.keys(carruseles).forEach(productoId => {
        stopAutoSlide(productoId);
    });
}

// Función para reanudar todos los carruseles
function resumeAllCarruseles() {
    Object.keys(carruseles).forEach(productoId => {
        startAutoSlide(productoId);
    });
}

// Pausar carruseles cuando la ventana no está visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseAllCarruseles();
    } else {
        resumeAllCarruseles();
    }
});

// Función para obtener el contenido del carrito (útil para debugging)
function verCarrito() {
    console.log('Contenido del carrito:', carrito);
    console.log('Total de items:', carrito.reduce((sum, item) => sum + item.cantidad, 0));
    console.log('Total precio:', carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0));
}