let toggle = document.getElementById('toggle-menu'),
    nav = document.getElementById('nav');
toggle.addEventListener('click',()=>{
    nav.classList.toggle('show');
})