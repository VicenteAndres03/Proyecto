// Datos simulados de clientes
let clientes = [
    {
        id: 1,
        nombre: 'Ana Silva González',
        email: 'ana.silva@email.com',
        telefono: '+56 9 8765 4321',
        ciudad: 'santiago',
        fechaRegistro: '2024-01-15',
        ultimaCompra: '2025-01-05',
        totalCompras: 85000,
        estado: 'vip',
        direccion: 'Las Condes 123, Santiago',
        fechaNacimiento: '1985-05-15',
        notas: 'Cliente muy fiel, prefiere polerones de talla M',
        historialCompras: [
            { fecha: '2025-01-05', productos: 'Poleron Mujer M x2', total: 10600 },
            { fecha: '2024-12-20', productos: 'Polera Mujer M, Poleron Hombre L', total: 9100 },
            { fecha: '2024-11-15', productos: 'Poleron Mujer M x3', total: 15900 }
        ]
    },
    {
        id: 2,
        nombre: 'Carlos López Mendoza',
        email: 'carlos.lopez@gmail.com',
        telefono: '+56 9 1234 5678',
        ciudad: 'valparaiso',
        fechaRegistro: '2024-03-22',
        ultimaCompra: '2024-12-15',
        totalCompras: 32000,
        estado: 'activo',
        direccion: 'Valparaíso Centro 456',
        fechaNacimiento: '1990-08-10',
        notas: 'Prefiere productos de hombre talla L',
        historialCompras: [
            { fecha: '2024-12-15', productos: 'Polera Hombre L x2', total: 7600 },
            { fecha: '2024-10-30', productos: 'Poleron Hombre L', total: 5700 }
        ]
    },
    {
        id: 3,
        nombre: 'María González Rojas',
        email: 'maria.gonzalez@hotmail.com',
        telefono: '+56 9 9876 5432',
        ciudad: 'santiago',
        fechaRegistro: '2023-08-10',
        ultimaCompra: '2025-01-08',
        totalCompras: 125000,
        estado: 'vip',
        direccion: 'Providencia 789, Santiago',
        fechaNacimiento: '1982-12-03',
        notas: 'Excelente cliente, compra regularmente',
        historialCompras: [
            { fecha: '2025-01-08', productos: 'Poleron Hombre XL x2', total: 11400 },
            { fecha: '2024-12-22', productos: 'Polera Mujer M x3', total: 11400 },
            { fecha: '2024-11-20', productos: 'Poleron Mujer L x2', total: 10600 }
        ]
    },
    {
        id: 4,
        nombre: 'José Martínez Silva',
        email: 'jose.martinez@empresa.cl',
        telefono: '+56 9 5555 6666',
        ciudad: 'concepcion',
        fechaRegistro: '2024-06-05',
        ultimaCompra: '2024-11-30',
        totalCompras: 18000,
        estado: 'inactivo',
        direccion: 'Concepción Centro 321',
        fechaNacimiento: '1995-03-18',
        notas: 'No ha comprado en los últimos meses',
        historialCompras: [
            { fecha: '2024-11-30', productos: 'Polera Hombre XL', total: 3800 },
            { fecha: '2024-09-15', productos: 'Poleron Hombre L', total: 5700 }
        ]
    },
    {
        id: 5,
        nombre: 'Laura Herrera Castro',
        email: 'laura.herrera@mail.com',
        telefono: '+56 9 7777 8888',
        ciudad: 'santiago',
        fechaRegistro: '2025-01-02',
        ultimaCompra: '2025-01-02',
        totalCompras: 5300,
        estado: 'nuevo',
        direccion: 'Ñuñoa 654, Santiago',
        fechaNacimiento: '1993-07-25',
        notas: 'Cliente nueva, primera compra exitosa',
        historialCompras: [
            { fecha: '2025-01-02', productos: 'Poleron Mujer M', total: 5300 }
        ]
    },
    {
        id: 6,
        nombre: 'Pedro Sánchez Díaz',
        email: 'pedro.sanchez@correo.com',
        telefono: '+56 9 3333 4444',
        ciudad: 'valparaiso',
        fechaRegistro: '2024-02-18',
        ultimaCompra: '2024-12-28',
        totalCompras: 42000,
        estado: 'activo',
        direccion: 'Viña del Mar 987',
        fechaNacimiento: '1987-11-12',
        notas: 'Compra principalmente en temporadas especiales',
        historialCompras: [
            { fecha: '2024-12-28', productos: 'Poleron Hombre XL, Polera Hombre XL', total: 9500 },
            { fecha: '2024-08-14', productos: 'Poleron Mujer L x2', total: 10600 }
        ]
    },
    {
        id: 7,
        nombre: 'Carmen Morales Vega',
        email: 'carmen.morales@email.cl',
        telefono: '+56 9 2222 3333',
        ciudad: 'otra',
        fechaRegistro: '2024-07-12',
        ultimaCompra: '2025-01-06',
        totalCompras: 67000,
        estado: 'vip',
        direccion: 'Antofagasta Norte 123',
        fechaNacimiento: '1980-04-08',
        notas: 'Cliente de regiones, muy satisfecha con el servicio',
        historialCompras: [
            { fecha: '2025-01-06', productos: 'Polera Mujer M x2, Poleron Mujer M', total: 12900 },
            { fecha: '2024-11-10', productos: 'Poleron Hombre L x2', total: 11400 }
        ]
    },
    {
        id: 8,
        nombre: 'Roberto Torres Pinto',
        email: 'roberto.torres@gmail.com',
        telefono: '+56 9 4444 5555',
        ciudad: 'santiago',
        fechaRegistro: '2025-01-01',
        ultimaCompra: '2025-01-07',
        totalCompras: 7600,
        estado: 'nuevo',
        direccion: 'Maipú 111, Santiago',
        fechaNacimiento: '1992-09-20',
        notas: 'Cliente nuevo con potencial',
        historialCompras: [
            { fecha: '2025-01-07', productos: 'Polera Hombre L x2', total: 7600 }
        ]
    }
];

// Variables globales
let clientesFiltrados = [...clientes];
let clienteEditando = null;
let paginaActual = 1;
const clientesPorPagina = 10;
let clientesSeleccionados = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    actualizarEstadisticas();
    renderizarTabla();
    configurarEventos();
});

// Actualizar estadísticas del dashboard
function actualizarEstadisticas() {
    const totalClientes = clientes.length;
    const clientesActivos = clientes.filter(c => c.estado === 'activo' || c.estado === 'vip').length;
    const clientesNuevos = clientes.filter(c => c.estado === 'nuevo').length;
    const clientesVip = clientes.filter(c => c.estado === 'vip').length;

    document.getElementById('totalClientes').textContent = totalClientes;
    document.getElementById('clientesActivos').textContent = clientesActivos;
    document.getElementById('clientesNuevos').textContent = clientesNuevos;
    document.getElementById('clientesVip').textContent = clientesVip;
}

// Renderizar tabla de clientes
function renderizarTabla() {
    const tbody = document.querySelector('#tablaClientes tbody');
    tbody.innerHTML = '';

    const inicio = (paginaActual - 1) * clientesPorPagina;
    const fin = inicio + clientesPorPagina;
    const clientesPagina = clientesFiltrados.slice(inicio, fin);

    clientesPagina.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><input type="checkbox" value="${cliente.id}" class="checkbox-cliente"></td>
            <td>#${String(cliente.id).padStart(3, '0')}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${formatearCiudad(cliente.ciudad)}</td>
            <td>${formatearFecha(cliente.fechaRegistro)}</td>
            <td>${formatearFecha(cliente.ultimaCompra)}</td>
            <td>$${cliente.totalCompras.toLocaleString()}</td>
            <td><span class="estado-cliente cliente-${cliente.estado}">${formatearEstado(cliente.estado)}</span></td>
            <td>
                <div class="acciones-cliente">
                    <button class="btn-accion btn-ver" onclick="verHistorial(${cliente.id})" title="Ver historial">👁️</button>
                    <button class="btn-accion btn-editar" onclick="editarCliente(${cliente.id})" title="Editar">✏️</button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarCliente(${cliente.id})" title="Eliminar">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });

    actualizarPaginacion();
    actualizarCheckboxes();
}

// Formatear nombre de ciudad
function formatearCiudad(ciudad) {
    const ciudades = {
        'santiago': 'Santiago',
        'valparaiso': 'Valparaíso',
        'concepcion': 'Concepción',
        'otra': 'Otras'
    };
    return ciudades[ciudad] || ciudad;
}

// Formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CL');
}

// Formatear estado
function formatearEstado(estado) {
    const estados = {
        'activo': 'Activo',
        'inactivo': 'Inactivo',
        'vip': 'VIP',
        'nuevo': 'Nuevo'
    };
    return estados[estado] || estado;
}

// Configurar eventos
function configurarEventos() {
    // Filtros
    document.getElementById('btnFiltrar').addEventListener('click', aplicarFiltros);
    document.getElementById('btnLimpiarFiltros').addEventListener('click', limpiarFiltros);
    
    // Búsqueda en tiempo real
    document.getElementById('buscarCliente').addEventListener('input', aplicarFiltros);
    
    // Botones principales
    document.getElementById('btnAgregarCliente').addEventListener('click', () => abrirModalCliente());
    document.getElementById('btnExportarClientes').addEventListener('click', exportarClientes);
    document.getElementById('btnEnviarEmail').addEventListener('click', abrirModalEmail);
    
    // Paginación
    document.getElementById('btnAnterior').addEventListener('click', paginaAnterior);
    document.getElementById('btnSiguiente').addEventListener('click', paginaSiguiente);
    
    // Checkbox seleccionar todos
    document.getElementById('seleccionarTodos').addEventListener('change', seleccionarTodos);
    
    // Modales
    configurarModales();
}

// Configurar modales
function configurarModales() {
    // Modal cliente
    document.querySelector('.cerrar').addEventListener('click', cerrarModalCliente);
    document.getElementById('cancelarEdicion').addEventListener('click', cerrarModalCliente);
    document.getElementById('formCliente').addEventListener('submit', guardarCliente);
    
    // Modal historial
    document.querySelector('.cerrar-historial').addEventListener('click', cerrarModalHistorial);
    
    // Modal email
    document.querySelector('.cerrar-email').addEventListener('click', cerrarModalEmail);
    document.getElementById('cancelarEmail').addEventListener('click', cerrarModalEmail);
    document.getElementById('formEmail').addEventListener('submit', enviarEmailMasivo);
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Aplicar filtros
function aplicarFiltros() {
    const busqueda = document.getElementById('buscarCliente').value.toLowerCase();
    const estado = document.getElementById('filtroEstado').value;
    const ubicacion = document.getElementById('filtroUbicacion').value;
    const fechaRegistro = document.getElementById('fechaRegistro').value;

    clientesFiltrados = clientes.filter(cliente => {
        const cumpleBusqueda = cliente.nombre.toLowerCase().includes(busqueda) || 
                              cliente.email.toLowerCase().includes(busqueda) ||
                              cliente.telefono.includes(busqueda);
        const cumpleEstado = !estado || cliente.estado === estado;
        const cumpleUbicacion = !ubicacion || cliente.ciudad === ubicacion;
        const cumpleFecha = !fechaRegistro || cliente.fechaRegistro === fechaRegistro;

        return cumpleBusqueda && cumpleEstado && cumpleUbicacion && cumpleFecha;
    });

    paginaActual = 1;
    renderizarTabla();
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('buscarCliente').value = '';
    document.getElementById('filtroEstado').value = '';
    document.getElementById('filtroUbicacion').value = '';
    document.getElementById('fechaRegistro').value = '';
    clientesFiltrados = [...clientes];
    paginaActual = 1;
    renderizarTabla();
}

// Paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
    document.getElementById('infoPagina').textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas;
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarTabla();
    }
}

function paginaSiguiente() {
    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarTabla();
    }
}

// Selección múltiple
function seleccionarTodos() {
    const checkboxTodos = document.getElementById('seleccionarTodos');
    const checkboxes = document.querySelectorAll('.checkbox-cliente');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = checkboxTodos.checked;
    });
    
    actualizarClientesSeleccionados();
}

function actualizarCheckboxes() {
    // Agregar eventos a los checkboxes individuales
    document.querySelectorAll('.checkbox-cliente').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarClientesSeleccionados);
    });
}

function actualizarClientesSeleccionados() {
    const checkboxes = document.querySelectorAll('.checkbox-cliente:checked');
    clientesSeleccionados = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    // Actualizar checkbox "seleccionar todos"
    const totalCheckboxes = document.querySelectorAll('.checkbox-cliente').length;
    const checkboxTodos = document.getElementById('seleccionarTodos');
    checkboxTodos.checked = clientesSeleccionados.length === totalCheckboxes;
    checkboxTodos.indeterminate = clientesSeleccionados.length > 0 && clientesSeleccionados.length < totalCheckboxes;
}

// CRUD de clientes
function abrirModalCliente(id = null) {
    clienteEditando = id ? clientes.find(c => c.id === id) : null;
    
    if (clienteEditando) {
        document.getElementById('tituloModal').textContent = 'Editar Cliente';
        document.getElementById('clienteId').value = clienteEditando.id;
        document.getElementById('nombreCliente').value = clienteEditando.nombre;
        document.getElementById('emailCliente').value = clienteEditando.email;
        document.getElementById('telefonoCliente').value = clienteEditando.telefono;
        document.getElementById('fechaNacimiento').value = clienteEditando.fechaNacimiento;
        document.getElementById('direccion').value = clienteEditando.direccion;
        document.getElementById('ciudad').value = clienteEditando.ciudad;
        document.getElementById('estadoCliente').value = clienteEditando.estado;
        document.getElementById('notas').value = clienteEditando.notas;
    } else {
        document.getElementById('tituloModal').textContent = 'Agregar Nuevo Cliente';
        document.getElementById('formCliente').reset();
        document.getElementById('clienteId').value = '';
    }
    
    document.getElementById('modalCliente').style.display = 'block';
}

function editarCliente(id) {
    abrirModalCliente(id);
}

function cerrarModalCliente() {
    document.getElementById('modalCliente').style.display = 'none';
    clienteEditando = null;
}

function guardarCliente(e) {
    e.preventDefault();
    
    const datosCliente = {
        nombre: document.getElementById('nombreCliente').value,
        email: document.getElementById('emailCliente').value,
        telefono: document.getElementById('telefonoCliente').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        direccion: document.getElementById('direccion').value,
        ciudad: document.getElementById('ciudad').value,
        estado: document.getElementById('estadoCliente').value,
        notas: document.getElementById('notas').value
    };
    
    if (clienteEditando) {
        // Actualizar cliente existente
        Object.assign(clienteEditando, datosCliente);
        alert(`Cliente "${datosCliente.nombre}" actualizado correctamente`);
    } else {
        // Crear nuevo cliente
        const nuevoCliente = {
            ...datosCliente,
            id: Math.max(...clientes.map(c => c.id)) + 1,
            fechaRegistro: new Date().toISOString().split('T')[0],
            ultimaCompra: null,
            totalCompras: 0,
            historialCompras: []
        };
        clientes.push(nuevoCliente);
        alert(`Cliente "${datosCliente.nombre}" agregado correctamente`);
    }
    
    actualizarEstadisticas();
    aplicarFiltros();
    cerrarModalCliente();
}

function eliminarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;
    
    const confirmar = confirm(`¿Está seguro de eliminar al cliente "${cliente.nombre}"?\n\nEsta acción no se puede deshacer.`);
    
    if (confirmar) {
        clientes = clientes.filter(c => c.id !== id);
        clientesFiltrados = clientesFiltrados.filter(c => c.id !== id);
        
        actualizarEstadisticas();
        renderizarTabla();
        
        alert(`Cliente "${cliente.nombre}" eliminado correctamente`);
    }
}

// Historial de compras
function verHistorial(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;
    
    document.getElementById('nombreClienteHistorial').textContent = cliente.nombre;
    
    const contenido = document.getElementById('contenidoHistorial');
    if (cliente.historialCompras && cliente.historialCompras.length > 0) {
        contenido.innerHTML = cliente.historialCompras.map(compra => `
            <div class="historial-item">
                <div class="historial-fecha">${formatearFecha(compra.fecha)}</div>
                <div class="historial-productos">${compra.productos}</div>
                <div class="historial-total">Total: $${compra.total.toLocaleString()}</div>
            </div>
        `).join('');
    } else {
        contenido.innerHTML = '<p>Este cliente no tiene compras registradas.</p>';
    }
    
    document.getElementById('modalHistorial').style.display = 'block';
}

function cerrarModalHistorial() {
    document.getElementById('modalHistorial').style.display = 'none';
}

// Email masivo
function abrirModalEmail() {
    if (clientesSeleccionados.length === 0) {
        alert('Debe seleccionar al menos un cliente para enviar emails');
        return;
    }
    
    document.getElementById('cantidadDestinatarios').textContent = clientesSeleccionados.length;
    document.getElementById('modalEmail').style.display = 'block';
}

function cerrarModalEmail() {
    document.getElementById('modalEmail').style.display = 'none';
    document.getElementById('formEmail').reset();
}

function enviarEmailMasivo(e) {
    e.preventDefault();
    
    const asunto = document.getElementById('asuntoEmail').value;
    const mensaje = document.getElementById('mensajeEmail').value;
    
    // Simulación del envío de emails
    setTimeout(() => {
        alert(`Emails enviados correctamente a ${clientesSeleccionados.length} clientes.\n\nAsunto: ${asunto}`);
        cerrarModalEmail();
        
        // Limpiar selección
        clientesSeleccionados = [];
        document.getElementById('seleccionarTodos').checked = false;
        document.querySelectorAll('.checkbox-cliente').forEach(cb => cb.checked = false);
    }, 1000);
}

// Exportar clientes
function exportarClientes() {
    const fecha = new Date().toLocaleDateString('es-CL');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Encabezados
    csvContent += "ID,Nombre,Email,Teléfono,Ciudad,Fecha Registro,Última Compra,Total Compras,Estado\n";
    
    // Datos
    clientesFiltrados.forEach(cliente => {
        const fila = [
            cliente.id,
            cliente.nombre,
            cliente.email,
            cliente.telefono,
            formatearCiudad(cliente.ciudad),
            formatearFecha(cliente.fechaRegistro),
            cliente.ultimaCompra ? formatearFecha(cliente.ultimaCompra) : 'Nunca',
            cliente.totalCompras,
            formatearEstado(cliente.estado)
        ].join(",");
        csvContent += fila + "\n";
    });
    
    // Descargar archivo
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clientes_falaferia_${fecha.replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Archivo de clientes exportado correctamente');
}