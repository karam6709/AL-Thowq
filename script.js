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

    document.getElementById('gmailBtn').addEventListener('click', function () {
              const name = (document.getElementById('name')?.value || '').trim();
              const phone = (document.getElementById('phone')?.value || '').trim();
              const message = (document.getElementById('message')?.value || '').trim();

              const to = 'althowq25@gmail.com'; // حط إيميلك
              const subject = `رسالة من الموقع — ${name || 'زائر'}`;
              const body =
          `الاسم: ${name}
          الهاتف: ${phone}

          الرسالة:
          ${message}`;

              const url = `https://mail.google.com/mail/?view=cm&fs=1` +
                `&to=${encodeURIComponent(to)}` +
                `&su=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

              window.open(url, '_blank', 'noopener');
            });