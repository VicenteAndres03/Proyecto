// DATOS DE EJEMPLO (En un proyecto real, estos vendrían de una base de datos)
let productos = [
    {
        id: 1,
        codigo: 'POL-H-001',
        nombre: 'Poleron Hombre Premium',
        categoria: 'poleron-hombre',
        talla: 'XL',
        precio: 5700,
        stock: 8,
        stockMinimo: 5,
        estado: 'activo',
        descripcion: 'Poleron cómodo para hombre, talla XL',
        imagen: 'Ropa/Poleron Hombre/Poleron1h.webp'
    },
    {
        id: 2,
        codigo: 'POL-M-001',
        nombre: 'Poleron Mujer Casual',
        categoria: 'poleron-mujer',
        talla: 'M',
        precio: 5300,
        stock: 15,
        stockMinimo: 5,
        estado: 'activo',
        descripcion: 'Poleron elegante para mujer, talla M',
        imagen: 'Ropa/Poleron Mujer/Poleron1M.webp'
    },
    {
        id: 3,
        codigo: 'POL-H-002',
        nombre: 'Polera Hombre Sport',
        categoria: 'polera-hombre',
        talla: 'XL',
        precio: 3800,
        stock: 12,
        stockMinimo: 5,
        estado: 'activo',
        descripcion: 'Polera deportiva para hombre, talla XL',
        imagen: 'Ropa/Polera Hombre/Polera1H.webp'
    },
    {
        id: 4,
        codigo: 'POL-M-002',
        nombre: 'Polera Mujer Básica',
        categoria: 'polera-mujer',
        talla: 'M',
        precio: 3800,
        stock: 3,
        stockMinimo: 5,
        estado: 'activo',
        descripcion: 'Polera básica para mujer, talla M',
        imagen: 'Ropa/Polera Mujer/Polera1M.webp'
    },
    {
        id: 5,
        codigo: 'POL-H-003',
        nombre: 'Poleron Hombre Invierno',
        categoria: 'poleron-hombre',
        talla: 'L',
        precio: 6200,
        stock: 25,
        stockMinimo: 5,
        estado: 'activo',
        descripcion: 'Poleron abrigado para invierno',
        imagen: 'Ropa/Poleron Hombre/Poleron2h.webp'
    }
];

// VARIABLES GLOBALES
let productosFiltrados = [...productos];
let paginaActual = 1;
let productosPorPagina = 10;
let productoEditando = null;
let productosSeleccionados = [];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventListeners();
    actualizarEstadisticas();
    renderizarTabla();
    actualizarPaginacion();
});

// EVENT LISTENERS
function inicializarEventListeners() {
    // Botones principales
    document.getElementById('btnAgregarProducto').addEventListener('click', abrirModalAgregar);
    document.getElementById('btnExportarProductos').addEventListener('click', exportarProductos);
    
    // Filtros
    document.getElementById('buscarProducto').addEventListener('input', aplicarFiltros);
    document.getElementById('filtroCategoria').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroTalla').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroStock').addEventListener('change', aplicarFiltros);
    document.getElementById('btnLimpiarFiltros').addEventListener('click', limpiarFiltros);
    
    // Paginación
    document.getElementById('btnAnterior').addEventListener('click', paginaAnterior);
    document.getElementById('btnSiguiente').addEventListener('click', paginaSiguiente);
    
    // Selección masiva
    document.getElementById('seleccionarTodos').addEventListener('change', seleccionarTodosProductos);
    
    // Modal
    document.getElementById('btnCerrarModal').addEventListener('click', () => cerrarModal('modalProducto'));
    document.getElementById('btnCancelarProducto').addEventListener('click', () => cerrarModal('modalProducto'));
    document.getElementById('formularioProducto').addEventListener('submit', guardarProducto);
    
    // Imagen
    document.getElementById('imagenProducto').addEventListener('change', previsualizarImagen);
    document.querySelector('.zona-imagen').addEventListener('click', () => {
        document.getElementById('imagenProducto').click();
    });
    
    // Acciones en lote
    document.getElementById('btnEliminarSeleccionados').addEventListener('click', eliminarSeleccionados);
    document.getElementById('btnActivarSeleccionados').addEventListener('click', () => cambiarEstadoSeleccionados('activo'));
    document.getElementById('btnDesactivarSeleccionados').addEventListener('click', () => cambiarEstadoSeleccionados('inactivo'));
}

// FUNCIONES DE ESTADÍSTICAS
function actualizarEstadisticas() {
    const totalProductos = productos.length;
    const stockTotal = productos.reduce((total, producto) => total + producto.stock, 0);
    const productosActivos = productos.filter(p => p.estado === 'activo').length;
    const stockBajo = productos.filter(p => p.stock <= p.stockMinimo).length;
    
    document.getElementById('totalProductos').textContent = totalProductos;
    document.getElementById('stockTotal').textContent = stockTotal.toLocaleString();
    document.getElementById('productosActivos').textContent = productosActivos;
    document.getElementById('stockBajo').textContent = stockBajo;
}

// FUNCIONES DE FILTRADO
function aplicarFiltros() {
    const busqueda = document.getElementById('buscarProducto').value.toLowerCase();
    const categoria = document.getElementById('filtroCategoria').value;
    const talla = document.getElementById('filtroTalla').value;
    const stock = document.getElementById('filtroStock').value;
    
    productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda) || 
                                producto.codigo.toLowerCase().includes(busqueda);
        const coincideCategoria = !categoria || producto.categoria === categoria;
        const coincideTalla = !talla || producto.talla === talla;
        
        let coincideStock = true;
        if (stock === 'bajo') {
            coincideStock = producto.stock <= 5;
        } else if (stock === 'medio') {
            coincideStock = producto.stock > 5 && producto.stock <= 20;
        } else if (stock === 'alto') {
            coincideStock = producto.stock > 20;
        }
        
        return coincideBusqueda && coincideCategoria && coincideTalla && coincideStock;
    });
    
    paginaActual = 1;
    renderizarTabla();
    actualizarPaginacion();
}

function limpiarFiltros() {
    document.getElementById('buscarProducto').value = '';
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('filtroTalla').value = '';
    document.getElementById('filtroStock').value = '';
    
    productosFiltrados = [...productos];
    paginaActual = 1;
    renderizarTabla();
    actualizarPaginacion();
}

// FUNCIONES DE TABLA
function renderizarTabla() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosEnPagina = productosFiltrados.slice(inicio, fin);
    
    const tbody = document.getElementById('cuerpoTablaProductos');
    tbody.innerHTML = '';
    
    productosEnPagina.forEach(producto => {
        const fila = crearFilaProducto(producto);
        tbody.appendChild(fila);
    });
    
    // Actualizar checkboxes
    actualizarSeleccionMasiva();
}

function crearFilaProducto(producto) {
    const fila = document.createElement('tr');
    
    // Determinar clase de stock
    let claseStock = 'stock-alto';
    if (producto.stock <= producto.stockMinimo) {
        claseStock = 'stock-bajo';
    } else if (producto.stock <= 20) {
        claseStock = 'stock-medio';
    }
    
    fila.innerHTML = `
        <td>
            <input type="checkbox" class="checkbox-producto" data-id="${producto.id}" 
                   onchange="manejarSeleccionProducto(${producto.id})">
        </td>
        <td>${producto.codigo}</td>
        <td>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0yNSAyMEMyNi4xIDIwIDI3IDE5LjEgMjcgMThDMjcgMTYuOSAyNi4xIDE2IDI1IDE2QzIzLjkgMTYgMjMgMTYuOSAyMyAxOEMyMyAxOS4xIDIzLjkgMjAgMjUgMjBaIiBmaWxsPSIjQkRDM0M3Ii8+CjxwYXRoIGQ9Ik0zNSAzNEgxNUMxNC40IDM0IDE0IDMzLjYgMTQgMzNWMjFDMTQgMjAuNCAxNC40IDIwIDE1IDIwSDM1QzM1LjYgMjAgMzYgMjAuNCAzNiAyMVYzM0MzNiAzMy42IDM1LjYgMzQgMzUgMzRaTTE2IDMySDM0VjIySDEyVjMyWiIgZmlsbD0iI0JEQzNDNyIvPgo8L3N2Zz4K'">
        </td>
        <td>${producto.nombre}</td>
        <td>${formatearCategoria(producto.categoria)}</td>
        <td>${producto.talla}</td>
        <td>${producto.precio.toLocaleString()}</td>
        <td class="${claseStock}">${producto.stock}</td>
        <td>
            <span class="estado-${producto.estado}">${producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}</span>
        </td>
        <td>
            <button class="btn-accion btn-editar" onclick="editarProducto(${producto.id})">Editar</button>
            <button class="btn-accion btn-ver" onclick="verDetallesProducto(${producto.id})">Ver</button>
            <button class="btn-accion btn-eliminar" onclick="confirmarEliminarProducto(${producto.id})">Eliminar</button>
        </td>
    `;
    
    return fila;
}

function formatearCategoria(categoria) {
    const categorias = {
        'poleron-hombre': 'Poleron Hombre',
        'poleron-mujer': 'Poleron Mujer',
        'polera-hombre': 'Polera Hombre',
        'polera-mujer': 'Polera Mujer'
    };
    return categorias[categoria] || categoria;
}

// FUNCIONES DE PAGINACIÓN
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = Math.min(inicio + productosPorPagina, productosFiltrados.length);
    
    document.getElementById('paginaActual').textContent = paginaActual;
    document.getElementById('totalPaginas').textContent = totalPaginas;
    document.getElementById('productosVisibles').textContent = fin - inicio;
    document.getElementById('totalProductosTabla').textContent = productosFiltrados.length;
    
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas || totalPaginas === 0;
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarTabla();
        actualizarPaginacion();
    }
}

function paginaSiguiente() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarTabla();
        actualizarPaginacion();
    }
}

// FUNCIONES DE SELECCIÓN MASIVA
function seleccionarTodosProductos() {
    const seleccionarTodos = document.getElementById('seleccionarTodos').checked;
    const checkboxes = document.querySelectorAll('.checkbox-producto');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = seleccionarTodos;
        const productId = parseInt(checkbox.dataset.id);
        
        if (seleccionarTodos) {
            if (!productosSeleccionados.includes(productId)) {
                productosSeleccionados.push(productId);
            }
        } else {
            productosSeleccionados = productosSeleccionados.filter(id => id !== productId);
        }
    });
    
    actualizarAccionesLote();
}

function manejarSeleccionProducto(productId) {
    const checkbox = document.querySelector(`[data-id="${productId}"]`);
    
    if (checkbox.checked) {
        if (!productosSeleccionados.includes(productId)) {
            productosSeleccionados.push(productId);
        }
    } else {
        productosSeleccionados = productosSeleccionados.filter(id => id !== productId);
    }
    
    actualizarSeleccionMasiva();
    actualizarAccionesLote();
}

function actualizarSeleccionMasiva() {
    const checkboxes = document.querySelectorAll('.checkbox-producto');
    const totalCheckboxes = checkboxes.length;
    const checkboxesMarcados = document.querySelectorAll('.checkbox-producto:checked').length;
    
    const seleccionarTodos = document.getElementById('seleccionarTodos');
    if (totalCheckboxes === 0) {
        seleccionarTodos.indeterminate = false;
        seleccionarTodos.checked = false;
    } else if (checkboxesMarcados === totalCheckboxes) {
        seleccionarTodos.indeterminate = false;
        seleccionarTodos.checked = true;
    } else if (checkboxesMarcados > 0) {
        seleccionarTodos.indeterminate = true;
        seleccionarTodos.checked = false;
    } else {
        seleccionarTodos.indeterminate = false;
        seleccionarTodos.checked = false;
    }
}

function actualizarAccionesLote() {
    const accionesLote = document.getElementById('accionesLote');
    const cantidadSeleccionados = productosSeleccionados.length;
    
    if (cantidadSeleccionados > 0) {
        accionesLote.style.display = 'flex';
        document.getElementById('productosSeleccionados').textContent = cantidadSeleccionados;
    } else {
        accionesLote.style.display = 'none';
    }
}

// FUNCIONES DE MODAL
function abrirModalAgregar() {
    productoEditando = null;
    document.getElementById('tituloModal').textContent = 'Agregar Nuevo Producto';
    document.getElementById('formularioProducto').reset();
    document.getElementById('codigoProducto').value = generarCodigo();
    document.getElementById('previewImagen').innerHTML = '<p>Arrastra una imagen aquí o haz clic para seleccionar</p>';
    abrirModal('modalProducto');
}

function editarProducto(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    productoEditando = productId;
    document.getElementById('tituloModal').textContent = 'Editar Producto';
    
    // Llenar formulario
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('codigoProducto').value = producto.codigo;
    document.getElementById('categoriaProducto').value = producto.categoria;
    document.getElementById('tallaProducto').value = producto.talla;
    document.getElementById('precioProducto').value = producto.precio;
    document.getElementById('stockProducto').value = producto.stock;
    document.getElementById('stockMinimo').value = producto.stockMinimo;
    document.getElementById('estadoProducto').value = producto.estado;
    document.getElementById('descripcionProducto').value = producto.descripcion;
    
    // Mostrar imagen actual si existe
    const previewImagen = document.getElementById('previewImagen');
    if (producto.imagen) {
        previewImagen.innerHTML = `<img src="${producto.imagen}" alt="Imagen actual">`;
    }
    
    abrirModal('modalProducto');
}

function guardarProducto(e) {
    e.preventDefault();
    
    const boton = document.getElementById('btnGuardarProducto');
    const textoBtn = document.querySelector('.texto-btn');
    const loaderBtn = document.querySelector('.loader-btn');
    
    // Mostrar loading
    textoBtn.style.display = 'none';
    loaderBtn.style.display = 'inline';
    boton.disabled = true;
    
    // Recoger datos del formulario
    const datosProducto = {
        nombre: document.getElementById('nombreProducto').value,
        codigo: document.getElementById('codigoProducto').value,
        categoria: document.getElementById('categoriaProducto').value,
        talla: document.getElementById('tallaProducto').value,
        precio: parseInt(document.getElementById('precioProducto').value),
        stock: parseInt(document.getElementById('stockProducto').value),
        stockMinimo: parseInt(document.getElementById('stockMinimo').value) || 5,
        estado: document.getElementById('estadoProducto').value,
        descripcion: document.getElementById('descripcionProducto').value
    };
    
    // Simular guardado
    setTimeout(() => {
        if (productoEditando) {
            // Editar producto existente
            const index = productos.findIndex(p => p.id === productoEditando);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...datosProducto };
            }
        } else {
            // Agregar nuevo producto
            const nuevoId = Math.max(...productos.map(p => p.id)) + 1;
            const nuevoProducto = {
                id: nuevoId,
                ...datosProducto,
                imagen: 'Ropa/default.webp' // En un proyecto real, manejarías la imagen subida
            };
            productos.push(nuevoProducto);
        }
        
        // Actualizar vista
        actualizarEstadisticas();
        aplicarFiltros();
        cerrarModal('modalProducto');
        
        // Restaurar botón
        textoBtn.style.display = 'inline';
        loaderBtn.style.display = 'none';
        boton.disabled = false;
        
        mostrarNotificacion(productoEditando ? 'Producto actualizado correctamente' : 'Producto agregado correctamente', 'exito');
    }, 2000);
}

function confirmarEliminarProducto(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    document.getElementById('nombreProductoEliminar').textContent = producto.nombre;
    document.getElementById('btnConfirmarEliminar').onclick = () => eliminarProducto(productId);
    abrirModal('modalConfirmarEliminar');
}

function eliminarProducto(productId) {
    productos = productos.filter(p => p.id !== productId);
    productosSeleccionados = productosSeleccionados.filter(id => id !== productId);
    
    actualizarEstadisticas();
    aplicarFiltros();
    cerrarModal('modalConfirmarEliminar');
    mostrarNotificacion('Producto eliminado correctamente', 'exito');
}

// FUNCIONES DE ACCIONES EN LOTE
function eliminarSeleccionados() {
    if (productosSeleccionados.length === 0) return;
    
    if (confirm(`¿Estás seguro de eliminar ${productosSeleccionados.length} productos seleccionados?`)) {
        productos = productos.filter(p => !productosSeleccionados.includes(p.id));
        productosSeleccionados = [];
        
        actualizarEstadisticas();
        aplicarFiltros();
        mostrarNotificacion('Productos eliminados correctamente', 'exito');
    }
}

function cambiarEstadoSeleccionados(nuevoEstado) {
    if (productosSeleccionados.length === 0) return;
    
    productosSeleccionados.forEach(productId => {
        const index = productos.findIndex(p => p.id === productId);
        if (index !== -1) {
            productos[index].estado = nuevoEstado;
        }
    });
    
    productosSeleccionados = [];
    actualizarEstadisticas();
    aplicarFiltros();
    mostrarNotificación(`Productos ${nuevoEstado}s correctamente`, 'exito');
}

// FUNCIONES AUXILIARES
function generarCodigo() {
    const timestamp = Date.now().toString().slice(-6);
    return 'PROD-' + timestamp;
}

function previsualizarImagen() {
    const file = document.getElementById('imagenProducto').files[0];
    const previewImagen = document.getElementById('previewImagen');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImagen.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function exportarProductos() {
    const datosExport = productos.map(p => ({
        Código: p.codigo,
        Nombre: p.nombre,
        Categoría: formatearCategoria(p.categoria),
        Talla: p.talla,
        Precio: p.precio,
        Stock: p.stock,
        Estado: p.estado
    }));
    
    const csv = convertirACSV(datosExport);
    descargarArchivo(csv, 'productos-falaferia.csv', 'text/csv');
    mostrarNotificacion('Lista de productos exportada correctamente', 'exito');
}

function convertirACSV(datos) {
    if (datos.length === 0) return '';
    
    const headers = Object.keys(datos[0]);
    const csvContent = [
        headers.join(','),
        ...datos.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            }).join(',')
        )
    ].join('\n');
    
    return csvContent;
}

function descargarArchivo(contenido, nombreArchivo, tipo) {
    const blob = new Blob([contenido], { type: tipo });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
}

function verDetallesProducto(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    alert(`Detalles del Producto:
    
Nombre: ${producto.nombre}
Código: ${producto.codigo}
Categoría: ${formatearCategoria(producto.categoria)}
Talla: ${producto.talla}
Precio: ${producto.precio.toLocaleString()}
Stock: ${producto.stock}
Estado: ${producto.estado}
Descripción: ${producto.descripcion}`);
}

function abrirModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        window.location.href = 'login.html';
    }
}

function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos inline para la notificación
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.right = '20px';
    notificacion.style.padding = '1rem 2rem';
    notificacion.style.borderRadius = '5px';
    notificacion.style.color = 'white';
    notificacion.style.fontWeight = '600';
    notificacion.style.zIndex = '9999';
    notificacion.style.transition = 'all 0.3s ease';
    
    if (tipo === 'exito') {
        notificacion.style.backgroundColor = '#27ae60';
    } else if (tipo === 'error') {
        notificacion.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modales = ['modalProducto', 'modalConfirmarEliminar'];
    modales.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            cerrarModal(modalId);
        }
    });
}