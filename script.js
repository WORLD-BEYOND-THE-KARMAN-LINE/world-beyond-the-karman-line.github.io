// Starfield animation
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    function createStars() {
      stars = [];
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          s: Math.random() * 0.8 + 0.2,
          o: Math.random() * 0.5 + 0.5
        });
      }
    }
    createStars();
    let shootingStars = [];
    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 4,
        alpha: 1
      });
    }
    setInterval(createShootingStar, 3500);

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        ctx.save();
        ctx.globalAlpha = star.o;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        star.y += star.s;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }
      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let s = shootingStars[i];
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = '#fff';
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y + s.len * 0.3);
        ctx.stroke();
        ctx.restore();
        s.x += s.speed;
        s.y += s.speed * 0.3;
        s.alpha -= 0.02;
        if (s.alpha <= 0) shootingStars.splice(i, 1);
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();


  (function(){
    const btn = document.getElementById('backToTop');
    const THRESHOLD = 400; // px scrolled before showing
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // show/hide on scroll
    const onScroll = () => {
      const visible = window.scrollY > THRESHOLD;
      btn.setAttribute('data-visible', visible ? 'true' : 'false');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // click to top
    btn.addEventListener('click', () => {
      if (prefersReduced) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // keyboard accessibility (Enter/Space already work on <button>)
  })();

//for footer current year
 //const currentYear = new Date().getFullYear();
//document.getElementById('current-year').textContent = currentYear;

  const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('current-year');
yearElement.textContent = currentYear;


    // Hamburger for mobile
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainnav');
    hamburger.setAttribute('aria-expanded', String(window.innerWidth > 800));
    hamburger.addEventListener('click', function() {
      const isDesktop = window.innerWidth > 800;
      const stateClass = isDesktop ? 'closed' : 'open';
      nav.classList.toggle(stateClass);
      hamburger.setAttribute(
        'aria-expanded',
        String(isDesktop ? !nav.classList.contains('closed') : nav.classList.contains('open'))
      );
    });
    // Highlight active nav link on scroll
    const sections = ['home', 'about', 'download', 'collaborators', 'contact'];
    window.addEventListener('scroll', () => {
      let scrollPos = window.scrollY + 80;
      sections.forEach(id => {
        const sec = document.getElementById(id);
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (sec && link) {
          if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    });
    // Close nav on link click (mobile)
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        if(window.innerWidth < 801) nav.classList.remove('open');
      });
    });
    // Close nav on resize if desktop
    window.addEventListener('resize', () => {
      nav.classList.remove('open', 'closed');
      hamburger.setAttribute('aria-expanded', String(window.innerWidth > 800));
    });
    // Animation for sections
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
      });
    });
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
    // Magazine Archive Search/Filter
    document.getElementById('magazine-search').addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      document.querySelectorAll('.magazine-item').forEach(item => {
        const month = item.getAttribute('data-month');
        const year = item.getAttribute('data-year');
        const title = item.getAttribute('data-title');
        const text = `${month} ${year} ${title}`;
        if (text.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  // -------------------------------------------- Collaborators data ---------------------------------------
  const COLLABS = [
    {
      name: 'Anurag Saikia',
      role: 'Founder & Chief Editor',
      bio: 'Curates each issue to inspire curiosity and wonder about the universe.',
      avatar: 'https://dl.dropbox.com/scl/fi/buot13ts8s6c3r7zyf4js/IMG_20250906_232438.jpg?rlkey=5yrmk8ashkp91dh6bx3dtskoo&st=moe7e3hu&dl=0',
      roleTags: ['editor'],
      links: {
        twitter: 'https://x.com/Anuraagsaikia07',
        email: 'worldbeyondthekarmanline@gmail.com',
        instagram: 'https://instagram.com/__anurag___saikia__',
        linkedin: 'https://www.linkedin.com/in/anurag-saikia-2009nlp07/',
        github: 'https://github.com/anurag90-tech',
        website: 'https://world-beyond-the-karman-line.github.io/site/'
      }
    },
    {
      name: 'A. Sharma',
      role: 'Astrophysics Writer',
      bio: 'Writes explainer articles on exoplanets, spectroscopy, and stellar evolution.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      roleTags: ['writer'],
      links: { twitter: 'https://twitter.com/', email: '', instagram: '', linkedin: '#', github: '', website: '' }
    }
  ];

  // --- SVG Icon generator ---
  function getIcon(type, link) {
    if (!link) return '';
    const icons = {
      twitter: `<a href="${link}" target="_blank" aria-label="Twitter" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.79a4.28 4.28 0 001.33 5.72 4.25 4.25 0 01-1.94-.54v.06a4.28 4.28 0 003.44 4.19c-.47.13-.97.2-1.49.2-.36 0-.72-.03-1.06-.1a4.28 4.28 0 004 2.98 8.59 8.59 0 01-5.32 1.83c-.35 0-.7-.02-1.05-.06A12.11 12.11 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53A8.33 8.33 0 0022.46 6z"/></svg>
      </a>`,
      email: `<a href="mailto:${link}" aria-label="Email" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.99l8 6 8-6V18H4z"/></svg>
      </a>`,
      instagram: `<a href="${link}" target="_blank" aria-label="Instagram" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-2.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
      </a>`,
      linkedin: `<a href="${link}" target="_blank" aria-label="LinkedIn" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V9h3v10zm-1.5-11.3C5.53 7.7 4.75 6.91 4.75 5.95S5.53 4.2 6.5 4.2 8.25 5 8.25 5.95 7.47 7.7 6.5 7.7zM20 19h-3v-5.4c0-1.29-.47-2.16-1.64-2.16-.9 0-1.43.61-1.66 1.2-.09.22-.11.52-.11.82V19h-3s.04-9 0-10h3v1.4c.4-.62 1.11-1.52 2.7-1.52 1.97 0 3.45 1.29 3.45 4.06V19z"/></svg>
      </a>`,
      github: `<a href="${link}" target="_blank" aria-label="GitHub" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008.07 10.95c.59.11.8-.26.8-.58v-2.02c-3.28.71-3.97-1.58-3.97-1.58-.54-1.36-1.33-1.72-1.33-1.72-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.81 1.31 3.5 1.01.11-.78.42-1.31.76-1.61-2.62-.3-5.38-1.31-5.38-5.84 0-1.29.47-2.35 1.23-3.18-.12-.3-.53-1.52.12-3.16 0 0 .99-.32 3.25 1.21a11.3 11.3 0 015.91 0c2.26-1.53 3.25-1.21 3.25-1.21.65 1.64.24 2.86.12 3.16.76.83 1.23 1.89 1.23 3.18 0 4.55-2.77 5.54-5.41 5.83.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.81.58A11.5 11.5 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg>
      </a>`,
      website: `<a href="${link}" target="_blank" aria-label="Website" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
      </a>`
    };
    return icons[type] || '';
  }

  // --- Render card ---
  function cardHTML(p) {
    return `
      <article class="card">
        <img class="avatar" src="${p.avatar}" alt="${p.name}" loading="lazy" />
        <div>
          <div class="name">${p.name}</div>
          <div class="role">${p.role}</div>
          ${p.bio ? `<div class="bio">${p.bio}</div>` : ''}
          <div class="links">
            ${getIcon('twitter', p.links.twitter)}
            ${getIcon('email', p.links.email)}
            ${getIcon('instagram', p.links.instagram)}
            ${getIcon('linkedin', p.links.linkedin)}
            ${getIcon('github', p.links.github)}
            ${getIcon('website', p.links.website)}
          </div>
        </div>
      </article>`;
  }

  // --- Apply filters/search ---
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const search = document.getElementById('search');
  const sortSel = document.getElementById('sort');
  const chips = Array.from(document.querySelectorAll('.chip'));

  function normalize(s){ return (s||'').toLowerCase(); }

  function apply(){
    grid.setAttribute('aria-busy','true');
    const q = normalize(search.value);
    const activeTags = chips.filter(c => c.getAttribute('aria-pressed')==='true').map(c => c.dataset.chip);

    let list = COLLABS.filter(p => {
      const hay = `${p.name} ${p.role} ${p.bio} ${(p.roleTags||[]).join(' ')}`.toLowerCase();
      const matchesQ = hay.includes(q);
      const matchesTag = activeTags.length === 0 || (p.roleTags||[]).some(t => activeTags.includes(t));
      return matchesQ && matchesTag;
    });

    const [key,dir] = sortSel.value.split('-');
    list.sort((a,b)=>{
      const va = normalize(key==='role'?a.role:a.name);
      const vb = normalize(key==='role'?b.role:b.name);
      if(va<vb) return dir==='asc'?-1:1;
      if(va>vb) return dir==='asc'?1:-1;
      return 0;
    });

    grid.innerHTML = list.map(cardHTML).join('');
    empty.hidden = list.length !== 0;
    grid.setAttribute('aria-busy','false');
  }

  search.addEventListener('input', apply);
  sortSel.addEventListener('change', apply);
  chips.forEach(ch => ch.addEventListener('click', () => {
    const pressed = ch.getAttribute('aria-pressed') === 'true';
    ch.setAttribute('aria-pressed', (!pressed).toString());
    apply();
  }));

  apply();

// Show popup only once per session, after 2 seconds
window.onload = function() {
  if (!sessionStorage.getItem("popupShown")) {
    setTimeout(function() {
      document.getElementById("popup").classList.add("active");
      sessionStorage.setItem("popupShown", "true");
    }, 2000); // show after 2 seconds
  }
};

// Close popup
document.getElementById("popupClose").onclick = function() {
  document.getElementById("popup").classList.remove("active");
};