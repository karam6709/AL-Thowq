// سنة ديناميكية للفوتر
    document.getElementById('year').textContent = new Date().getFullYear();
    // زر إظهار/إخفاء القائمة على الشاشات الصغيرة
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('main-menu');
    if(toggle && menu){
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('nav__list--open');
      });
    }