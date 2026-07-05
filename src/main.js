import './style.css'

// мобильное меню
const burger = document.getElementById('burger')
const mobile = document.getElementById('mobile')
burger.addEventListener('click', () => mobile.classList.toggle('hidden'))
mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobile.classList.add('hidden')))

// тень навбара при скролле — throttle через rAF (1 обновление на кадр)
const nav = document.getElementById('nav')
let navTicking = false
let navShadowed = null
const applyNav = () => {
  const shadowed = window.scrollY > 20
  if (shadowed !== navShadowed) {
    // трогаем DOM только при смене состояния
    navShadowed = shadowed
    nav.classList.toggle('shadow-lift', shadowed)
  }
  navTicking = false
}
const onScroll = () => {
  if (!navTicking) {
    navTicking = true
    requestAnimationFrame(applyNav)
  }
}
applyNav()
window.addEventListener('scroll', onScroll, { passive: true })

// scroll-reveal
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reduce) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 180) + 'ms'
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
}

// счётчики метрик
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10)
  const suffix = el.dataset.suffix || ''
  if (reduce) {
    el.textContent = target + suffix
    return
  }
  const dur = 1400
  const start = performance.now()
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(target * eased) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
const cio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target)
        cio.unobserve(e.target)
      }
    })
  },
  { threshold: 0.5 }
)
document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el))

// форма
const form = document.getElementById('lead-form')
const status = document.getElementById('form-status')
const submitBtn = form.querySelector('button[type="submit"]')
const setStatus = (msg, ok) => {
  status.textContent = msg
  status.className =
    'mt-4 rounded-xl px-4 py-3 text-sm ring-1 ' +
    (ok ? 'bg-teal/15 text-teal ring-teal/30' : 'bg-amber/15 text-amber ring-amber/30')
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = form.name.value.trim()
  const contact = form.contact.value.trim()
  ;[form.name, form.contact].forEach((f) => f.classList.remove('border-amber', 'ring-2', 'ring-amber/40'))
  if (!name || !contact) {
    ;[form.name, form.contact].forEach((f) => {
      if (!f.value.trim()) f.classList.add('border-amber', 'ring-2', 'ring-amber/40')
    })
    setStatus('Заполните имя и контакт — так я смогу с вами связаться.', false)
    return
  }

  submitBtn.disabled = true
  const label = submitBtn.innerHTML
  submitBtn.innerHTML = 'Отправляю…'

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
    if (!res.ok) throw new Error('bad status')
    setStatus('Спасибо, ' + name + '! Заявка отправлена — свяжусь с вами в течение дня.', true)
    form.reset()
  } catch (err) {
    setStatus('Не удалось отправить. Напишите мне в Telegram или на почту — контакты слева.', false)
  } finally {
    submitBtn.disabled = false
    submitBtn.innerHTML = label
  }
})
