import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Smooth Scrolling Setup ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor')
const interactiveElements = document.querySelectorAll('a, button, .work-card')

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: "power2.out"
  })
})

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active')
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active')
  })
})

// --- Navbar Scroll Effect ---
const nav = document.querySelector('.nav')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// --- GSAP Animations ---

// 1. Initial Load (Preloader & Hero)
const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

// Preloader
tl.to('.preloader-logo', { opacity: 1, duration: 0.5, ease: 'none' })
tl.to('.preloader', { yPercent: -100, duration: 1.2, delay: 1, ease: 'power4.inOut' })

// Animate navbar
tl.from('.nav', { y: -100, opacity: 0, duration: 1 }, "-=0.5")

// Animate hero texts
tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 }, 0.8)
tl.from('.hero-title .line', { 
  y: 100, 
  opacity: 0, 
  stagger: 0.2, 
  duration: 1.2 
}, 1)
tl.from('.hero-desc', { y: 20, opacity: 0, duration: 1 }, 1.5)
tl.from('.hero .btn', { y: 20, opacity: 0, duration: 1 }, 1.7)
tl.from('.scroll-indicator', { opacity: 0, duration: 1 }, 2.0)

// 2. Scroll Animations (Work Section)
gsap.from('.section-header', {
  scrollTrigger: {
    trigger: '.work',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
})

const workCards = document.querySelectorAll('.work-card')
workCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: index % 2 === 0 ? 0 : 0.2 // Stagger for grid columns
  })
})

// 3. Contact Section
gsap.from('.contact-content > *', {
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 75%',
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: 'power3.out'
})
