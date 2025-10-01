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

// ===== WhatsApp send + validation for contact form =====
(function () {
  const businessNumber = '962777441411'; // رقم واتساب الدولي بدون +

  const form = document.getElementById('contactForm');
  const btnWhats = document.getElementById('whatsappBtn');
  const btnClear = document.getElementById('clearBtn');
  const statusBox = document.getElementById('formStatus');

  const fields = [
    { id: 'name',    required: true,  validate: v => v.trim().length >= 2, msg: 'رجاءً اكتب اسمًا صحيحًا (2 أحرف فأكثر).' },
    { id: 'phone',   required: true,  validate: v => /^0?\d{9,10}$/.test(v.replace(/\s+/g,'')), msg: 'أدخل رقم هاتف صحيح.' },
    { id: 'email',   required: false, validate: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'البريد غير صالح.' },
    { id: 'subject', required: true,  validate: v => v.trim().length >= 3, msg: 'الموضوع قصير جدًا.' },
    { id: 'message', required: true,  validate: v => v.trim().length >= 10, msg: 'رجاءً اكتب رسالة (10 أحرف فأكثر).' },
    { id: 'agree',   required: true,  validate: v => v === true, msg: 'الرجاء الموافقه على سياسة الخصوصيه' }
  ];

  function getEl(id){ return document.getElementById(id); }
  function setError(id, message){
    const input = getEl(id);
    const err = document.querySelector(`[data-error-for="${id}"]`);
    if(id === 'agree'){
      if(err) err.textContent = message || '';
      return;
    }
    if(message){
      input?.classList.add('is-invalid');
      if(err) err.textContent = message;
    } else {
      input?.classList.remove('is-invalid');
      if(err) err.textContent = '';
    }
  }

  function readValue(id){
    if(id === 'agree') return getEl('agree')?.checked === true;
    return (getEl(id)?.value || '').trim();
  }

  function validateAll(){
    let ok = true;
    for(const f of fields){
      const val = readValue(f.id);
      const valid = f.validate(val);
      setError(f.id, valid ? '' : f.msg);
      if(!valid) ok = false;
    }
    return ok;
  }

  function buildWhatsAppText(){
    const name = readValue('name');
    const phone = readValue('phone');
    const email = readValue('email');
    const subject = readValue('subject');
    const message = readValue('message');

    return (
`الموضوع: ${subject}
الاسم: ${name}
الهاتف: ${phone}${email ? `\nالبريد: ${email}` : ''}

الرسالة:
${message}`
    );
  }

  function showStatus(text, timeout=3500){
    if(!statusBox) return;
    statusBox.hidden = false;
    statusBox.textContent = text;
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(() => { statusBox.hidden = true; }, timeout);
  }

  if(btnWhats){
    btnWhats.addEventListener('click', function(e){
      e.preventDefault(); // في حال كان داخل form
      if(!validateAll()){
        return;
      }
      const text = encodeURIComponent(buildWhatsAppText());
      const url = `https://wa.me/${businessNumber}?text=${text}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  if(btnClear){
    btnClear.addEventListener('click', function(e){
      e.preventDefault();
      ['name','phone','email','subject','message'].forEach(id => {
        const el = getEl(id);
        if(el) el.value = '';
        setError(id, '');
      });
      const agree = getEl('agree');
      if(agree) agree.checked = false;
      setError('agree', '');
      
    });
  }
})();
