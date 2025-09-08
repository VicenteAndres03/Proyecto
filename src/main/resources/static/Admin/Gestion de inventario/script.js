// Datos simulados del inventario
let inventario = [
    {
        id: 1,
        codigo: 'PH001',
        nombre: 'Poleron Hombre',
        categoria: 'poleron-hombre',
        talla: 'XL',
        stockActual: 8,
        stockMinimo: 5,
        precio: 5700,
        estado: 'normal'
    },
    {
        id: 2,
        codigo: 'PM001',
        nombre: 'Poleron Mujer',
        categoria: 'poleron-mujer',
        talla: 'M',
        stockActual: 12,
        stockMinimo: 5,
        precio: 5300,
        estado: 'normal'
    },
    {
        id: 3,
        codigo: 'PM002',
        nombre: 'Poleron Mujer',
        categoria: 'poleron-mujer',
        talla: 'L',
        stockActual: 3,
        stockMinimo: 5,
        precio: 5300,
        estado: 'bajo'
    },
    {
        id: 4,
        codigo: 'PLH001',
        nombre: 'Polera Hombre',
        categoria: 'polera-hombre',
        talla: 'XL',
        stockActual: 12,
        stockMinimo: 8,
        precio: 3800,
        estado: 'normal'
    },
    {
        id: 5,
        codigo: 'PLM001',
        nombre: 'Polera Mujer',
        categoria: 'polera-mujer',
        talla: 'M',
        stockActual: 15,
        stockMinimo: 10,
        precio: 3800,
        estado: 'normal'
    },
    {
        id: 6,
        codigo: 'PH002',
        nombre: 'Poleron Hombre',
        categoria: 'poleron-hombre',
        talla: 'L',
        stockActual: 2,
        stockMinimo: 5,
        precio: 5700,
        estado: 'bajo'
    },
    {
        id: 7,
        codigo: 'PLH002',
        nombre: 'Polera Hombre',
        categoria: 'polera-hombre',
        talla: 'L',
        stockActual: 20,
        stockMinimo: 8,
        precio: 3800,
        estado: 'alto'
    },
    {
        id: 8,
        codigo: 'PM003',
        nombre: 'Poleron Mujer',
        categoria: 'poleron-mujer',
        talla: 'S',
        stockActual: 1,
        stockMinimo: 5,
        precio: 5300,
        estado: 'bajo'
    }
];

// Variables globales
let inventarioFiltrado = [...inventario];
let productoEditando = null;

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarEstadisticas();
    renderizarTabla();
    configurarEventos();
});

// Actualizar estadísticas del dashboard
function actualizarEstadisticas() {
    const totalProductos = inventario.length;
    const stockBajo = inventario.filter(p => p.estado === 'bajo').length;
    const sinStock = inventario.filter(p => p.stockActual === 0).length;
    const valorTotal = inventario.reduce((total, p) => total + (p.stockActual * p.precio), 0);

    document.getElementById('totalProductos').textContent = totalProductos;
    document.getElementById('stockBajo').textContent = stockBajo;
    document.getElementById('sinStock').textContent = sinStock;
    document.getElementById('valorTotal').textContent = `$${valorTotal.toLocaleString()}`;
}

// Renderizar tabla de inventario
function renderizarTabla() {
    const tbody = document.querySelector('#tablaInventario tbody');
    tbody.innerHTML = '';

    inventarioFiltrado.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${formatearCategoria(producto.categoria)}</td>
            <td>${producto.talla}</td>
            <td>${producto.stockActual}</td>
            <td>${producto.stockMinimo}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td><span class="estado-stock ${producto.estado}">${formatearEstado(producto.estado)}</span></td>
            <td>
                <div class="acciones-producto">
                    <button class="btn-accion btn-editar" onclick="editarStock(${producto.id})">✏️ Editar</button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarProducto(${producto.id})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Formatear nombre de categoría
function formatearCategoria(categoria) {
    const categorias = {
        'poleron-hombre': 'Poleron Hombre',
        'poleron-mujer': 'Poleron Mujer',
        'polera-hombre': 'Polera Hombre',
        'polera-mujer': 'Polera Mujer'
    };
    return categorias[categoria] || categoria;
}

// Formatear estado del stock
function formatearEstado(estado) {
    const estados = {
        'alto': 'Stock Alto',
        'normal': 'Stock Normal',
        'bajo': 'Stock Bajo',
        'sin-stock': 'Sin Stock'
    };
    return estados[estado] || estado;
}

// Configurar todos los eventos
function configurarEventos() {
    // Filtros
    document.getElementById('btnFiltrar').addEventListener('click', aplicarFiltros);
    document.getElementById('btnLimpiarFiltros').addEventListener('click', limpiarFiltros);
    
    // Búsqueda en tiempo real
    document.getElementById('buscarProducto').addEventListener('input', aplicarFiltros);
    
    // Botones de acción
    document.getElementById('btnAgregarProducto').addEventListener('click', () => {
        alert('Función de agregar producto en desarrollo');
    });
    
    document.getElementById('btnExportar').addEventListener('click', exportarExcel);
    
    // Modal
    document.querySelector('.cerrar').addEventListener('click', cerrarModal);
    document.getElementById('cancelarEdicion').addEventListener('click', cerrarModal);
    document.getElementById('formEditarStock').addEventListener('submit', guardarCambiosStock);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modalEditarStock');
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Aplicar filtros
function aplicarFiltros() {
    const busqueda = document.getElementById('buscarProducto').value.toLowerCase();
    const categoria = document.getElementById('filtroCategoria').value;
    const stock = document.getElementById('filtroStock').value;

    inventarioFiltrado = inventario.filter(producto => {
        const cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda) || 
                              producto.codigo.toLowerCase().includes(busqueda);
        const cumpleCategoria = !categoria || producto.categoria === categoria;
        const cumpleStock = !stock || evaluarFiltroStock(producto, stock);

        return cumpleBusqueda && cumpleCategoria && cumpleStock;
    });

    renderizarTabla();
}

// Evaluar filtro de stock
function evaluarFiltroStock(producto, filtro) {
    switch (filtro) {
        case 'bajo':
            return producto.stockActual <= 5 && producto.stockActual > 0;
        case 'normal':
            return producto.stockActual > 5 && producto.stockActual <= 15;
        case 'alto':
            return producto.stockActual > 15;
        case 'sin-stock':
            return producto.stockActual === 0;
        default:
            return true;
    }
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('buscarProducto').value = '';
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('filtroStock').value = '';
    inventarioFiltrado = [...inventario];
    renderizarTabla();
}

// Editar stock de producto
function editarStock(id) {
    productoEditando = inventario.find(p => p.id === id);
    if (productoEditando) {
        document.getElementById('productoId').value = productoEditando.id;
        document.getElementById('nombreProducto').textContent = 
            `${productoEditando.nombre} - ${productoEditando.talla}`;
        document.getElementById('stockActual').value = productoEditando.stockActual;
        document.getElementById('stockMinimo').value = productoEditando.stockMinimo;
        document.getElementById('motivo').value = '';
        
        document.getElementById('modalEditarStock').style.display = 'block';
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalEditarStock').style.display = 'none';
    productoEditando = null;
}

// Guardar cambios de stock
function guardarCambiosStock(e) {
    e.preventDefault();
    
    if (!productoEditando) return;
    
    const nuevoStock = parseInt(document.getElementById('stockActual').value);
    const nuevoStockMinimo = parseInt(document.getElementById('stockMinimo').value);
    const motivo = document.getElementById('motivo').value;
    
    if (!motivo) {
        alert('Debe seleccionar un motivo para el cambio');
        return;
    }
    
    // Actualizar producto
    productoEditando.stockActual = nuevoStock;
    productoEditando.stockMinimo = nuevoStockMinimo;
    productoEditando.estado = determinarEstadoStock(nuevoStock, nuevoStockMinimo);
    
    // Registrar el cambio (en una aplicación real, esto se enviaría al servidor)
    console.log(`Stock actualizado para ${productoEditando.nombre}:`, {
        stockAnterior: productoEditando.stockActual,
        stockNuevo: nuevoStock,
        motivo: motivo,
        fecha: new Date()
    });
    
    // Actualizar interfaz
    actualizarEstadisticas();
    aplicarFiltros(); // Mantener filtros aplicados
    cerrarModal();
    
    alert(`Stock actualizado correctamente para ${productoEditando.nombre}`);
}

// Determinar estado del stock
function determinarEstadoStock(stockActual, stockMinimo) {
    if (stockActual === 0) return 'sin-stock';
    if (stockActual <= stockMinimo) return 'bajo';
    if (stockActual > 15) return 'alto';
    return 'normal';
}

// Eliminar producto
function eliminarProducto(id) {
    const producto = inventario.find(p => p.id === id);
    if (!producto) return;
    
    const confirmar = confirm(`¿Está seguro de eliminar el producto "${producto.nombre} - ${producto.talla}"?\n\nEsta acción no se puede deshacer.`);
    
    if (confirmar) {
        // Eliminar del inventario
        inventario = inventario.filter(p => p.id !== id);
        inventarioFiltrado = inventarioFiltrado.filter(p => p.id !== id);
        
        // Actualizar interfaz
        actualizarEstadisticas();
        renderizarTabla();
        
        alert(`Producto "${producto.nombre} - ${producto.talla}" eliminado correctamente`);
    }
}

// Exportar a Excel (simulado)
function exportarExcel() {
    const fecha = new Date().toLocaleDateString('es-CL');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Encabezados
    csvContent += "Código,Producto,Categoría,Talla,Stock Actual,Stock Mínimo,Precio,Estado\n";
    
    // Datos
    inventarioFiltrado.forEach(producto => {
        const fila = [
            producto.codigo,
            producto.nombre,
            formatearCategoria(producto.categoria),
            producto.talla,
            producto.stockActual,
            producto.stockMinimo,
            producto.precio,
            formatearEstado(producto.estado)
        ].join(",");
        csvContent += fila + "\n";
    });
    
    // Crear y descargar archivo
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inventario_falaferia_${fecha.replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Archivo Excel exportado correctamente');
}

// Funciones de utilidad para alertas de stock bajo
function verificarStockBajo() {
    const productosStockBajo = inventario.filter(p => p.estado === 'bajo' || p.estado === 'sin-stock');
    
    if (productosStockBajo.length > 0) {
        console.log('Productos con stock bajo:', productosStockBajo);
        // En una aplicación real, aquí se enviarían notificaciones
    }
}

// Simular actualizaciones automáticas del inventario
function simularVentas() {
    // Esta función simula ventas aleatorias cada cierto tiempo
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de probabilidad cada 30 segundos
            const productoAleatorio = inventario[Math.floor(Math.random() * inventario.length)];
            if (productoAleatorio.stockActual > 0) {
                productoAleatorio.stockActual--;
                productoAleatorio.estado = determinarEstadoStock(productoAleatorio.stockActual, productoAleatorio.stockMinimo);
                
                actualizarEstadisticas();
                aplicarFiltros();
                
                console.log(`Venta simulada: ${productoAleatorio.nombre} - Stock actual: ${productoAleatorio.stockActual}`);
            }
        }
    }, 30000); // Cada 30 segundos
}

// Búsqueda avanzada con múltiples criterios
function busquedaAvanzada(termino) {
    const terminoLower = termino.toLowerCase();
    
    return inventario.filter(producto => {
        return producto.nombre.toLowerCase().includes(terminoLower) ||
               producto.codigo.toLowerCase().includes(terminoLower) ||
               producto.categoria.toLowerCase().includes(terminoLower) ||
               producto.talla.toLowerCase().includes(terminoLower) ||
               formatearCategoria(producto.categoria).toLowerCase().includes(terminoLower);
    });
}

// Validar datos del producto
function validarProducto(stockActual, stockMinimo) {
    const errores = [];
    
    if (stockActual < 0) {
        errores.push('El stock actual no puede ser negativo');
    }
    
    if (stockMinimo < 1) {
        errores.push('El stock mínimo debe ser mayor a 0');
    }
    
    if (stockMinimo > stockActual && stockActual > 0) {
        errores.push('Se recomienda reabastecer: el stock actual está por debajo del mínimo');
    }
    
    return errores;
}

// Generar reporte de inventario
function generarReporte() {
    const totalProductos = inventario.length;
    const valorTotal = inventario.reduce((total, p) => total + (p.stockActual * p.precio), 0);
    const productosStockBajo = inventario.filter(p => p.estado === 'bajo').length;
    const productosSinStock = inventario.filter(p => p.stockActual === 0).length;
    
    const reporte = {
        fecha: new Date().toLocaleString('es-CL'),
        totalProductos,
        valorTotal,
        productosStockBajo,
        productosSinStock,
        productosDetalle: inventario.map(p => ({
            codigo: p.codigo,
            nombre: p.nombre,
            stock: p.stockActual,
            valor: p.stockActual * p.precio,
            estado: p.estado
        }))
    };
    
    console.log('Reporte de inventario generado:', reporte);
    return reporte;
}

// Inicializar simulaciones (opcional, para demo)
// Descomenta la siguiente línea si quieres ver las ventas simuladas
// simularVentas();

// Verificar stock bajo al cargar
setTimeout(verificarStockBajo, 1000);