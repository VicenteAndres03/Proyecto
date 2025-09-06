const hamburguesa = document.getElementById('MenuHamburguesa')
const Menu = document.querySelector('.MenuNavegacion')

//esto llama a la funcion show para que se muestren por pantalla
hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show')
})
