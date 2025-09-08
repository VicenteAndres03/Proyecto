 document.getElementById('rut').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\dkK]/g, '');
            if (value.length > 1) {
                value = value.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + value.slice(-1);
            }
            e.target.value = value;
        });

        // Mostrar/ocultar contraseña
        document.getElementById('mostrarPassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Manejar envío del formulario
        document.getElementById('formularioLogin').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const boton = document.querySelector('.boton-login');
            const texto = document.querySelector('.texto-boton');
            const loader = document.querySelector('.loader');
            const mensajeError = document.getElementById('mensajeError');
            
            // Mostrar loading
            texto.style.display = 'none';
            loader.style.display = 'inline';
            boton.disabled = true;
            mensajeError.style.display = 'none';
            
            // Simular validación (aquí conectarías con tu backend)
            setTimeout(() => {
                const nombre = document.getElementById('nombre').value;
                const correo = document.getElementById('correo').value;
                const rut = document.getElementById('rut').value;
                const password = document.getElementById('password').value;
                
                // Credenciales de ejemplo (cambiar por validación real)
                if (correo === 'admin@falaferia.cl' && password === 'admin123') {
                    // Login exitoso - redirigir al dashboard
                    window.location.href = 'index.html';
                } else {
                    // Error de credenciales
                    mensajeError.style.display = 'block';
                    texto.style.display = 'inline';
                    loader.style.display = 'none';
                    boton.disabled = false;
                }
            }, 2000);
        });