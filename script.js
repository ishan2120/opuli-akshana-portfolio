/* ==========================================================================
   OPULI AKSHANA ✦ COSMIC PORTFOLIO & ASTRAL BLOG INTERACTIVE SYSTEM
   Theme: Electric Neon Cyan (#00f3ff) & Deep Void Space (#050814)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. FAST SKELETON LOADER FADE OUT ---
    initSkeletonLoader();

    // --- 1. INITIALIZE STARFIELD CANVAS ---
    initStarfield();

    // --- 2. INITIALIZE AMBIENT CURSOR AURA ---
    initCursorAura();

    // --- 3. INITIALIZE BLOG SYSTEM & PRELOADED ENTRIES ---
    initBlogSystem();

    // --- 4. INITIALIZE QUANTUM COLLIDER CANVAS ---
    initQuantumCollider();

    // --- 5. INITIALIZE GALLERY LIGHTBOX ---
    initGalleryLightbox();

    // --- 6. INITIALIZE NAVIGATION & AUDIO SYNTHESIZER ---
    initNavigationAndAudio();

    // --- 7. INITIALIZE STATS & FORM HANDLERS ---
    initStatsAndForms();
});

/* ==========================================================================
   0. FAST SKELETON SCREEN LOADER
   ========================================================================== */
function initSkeletonLoader() {
    const loader = document.getElementById('skeleton-loader');
    if (loader) {
        // Fast fade-out timing (600ms)
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 600);
    }
}

/* ==========================================================================
   1. STARFIELD & COSMIC BACKGROUND CANVAS
   ========================================================================== */
function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Create stars with cyan/white palette
    const starCount = Math.floor((width * height) / 3000);
    const stars = [];
    const colors = ['#ffffff', '#00f3ff', '#a6f6ff', '#5ce1e6', '#d0f8ff'];

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            twinkleDir: Math.random() > 0.5 ? 1 : -1
        });
    }

    // Shooting stars
    const shootingStars = [];

    function spawnShootingStar() {
        if (Math.random() < 0.03 && shootingStars.length < 3) {
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.5),
                length: Math.random() * 80 + 40,
                speed: Math.random() * 10 + 6,
                angle: Math.PI / 4,
                alpha: 1
            });
        }
    }

    // Render loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Stars
        stars.forEach(star => {
            star.alpha += star.speed * star.twinkleDir;
            if (star.alpha >= 1) {
                star.alpha = 1;
                star.twinkleDir = -1;
            } else if (star.alpha <= 0.2) {
                star.alpha = 0.2;
                star.twinkleDir = 1;
            }

            ctx.save();
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.restore();
        });

        // Draw Shooting Stars (Electric Cyan)
        spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= 0.015;

            if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
                shootingStars.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = ss.alpha;
            const grad = ctx.createLinearGradient(
                ss.x, ss.y,
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            grad.addColorStop(0, '#00f3ff');
            grad.addColorStop(1, 'transparent');

            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            ctx.stroke();
            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. AMBIENT CURSOR AURA & TILT FX
   ========================================================================== */
function initCursorAura() {
    const aura = document.getElementById('cursor-aura');
    if (!aura) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateAura() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        aura.style.left = `${currentX}px`;
        aura.style.top = `${currentY}px`;

        requestAnimationFrame(updateAura);
    }
    updateAura();

    // 3D Card Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            card.style.transform = `perspective(1000px) rotateY(${x / 25}deg) rotateX(${-y / 25}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
        });
    });
}

/* ==========================================================================
   3. BLOG SYSTEM & PRELOADED STARDUST LOGS
   ========================================================================== */
const defaultBlogPosts = [
    {
        id: 'post-1',
        title: 'Thinking in Quarks: Quantum Entanglement & Human Consciousness',
        category: 'quantum',
        tags: ['#quantum', '#astronomy', '#quarks'],
        date: 'AUG 24, 2026',
        readTime: '5 MIN READ',
        excerpt: 'If our brain cells are constructed from subatomic particles forged in supernovas, are our thoughts entanglement waves resonating with distant nebulas?',
        content: `
            <p>Every single atom in your body — from the calcium in your bones to the iron carrying oxygen through your veins — was forged inside the fiery heart of a massive dying star billions of years ago. We are literally made of stardust.</p>
            <p>When I say I am <em>thinking in quarks</em>, it is not merely a poetic metaphor. Quarks are the fundamental constituents of matter. In quantum mechanics, particles can become entangled across light-years. If subatomic particles inside our neural pathways share quantum states with photons emitted by distant quasars, consciousness itself might be an astral projection of universal feedback.</p>
            <blockquote style="border-left: 2px solid var(--accent-cyan); padding-left: 1rem; color: var(--accent-cyan); margin: 1rem 0;">“We do not live inside the universe; the universe lives inside our perceptions.”</blockquote>
            <p>Next time you step outside under a pitch-black night sky, remember: your eyes are receiving photons that have traveled across space for hundreds of years just to end their journey triggering a signal in your mind.</p>
        `,
        sparks: 142
    },
    {
        id: 'post-2',
        title: 'Mapping the Astral Plane: A Guide to Out-of-Body Stargazing',
        category: 'astral',
        tags: ['#astral', '#astrophile', '#infinite-realms'],
        date: 'AUG 18, 2026',
        readTime: '7 MIN READ',
        excerpt: 'Detaching from earthly presence to float through cosmic vacuums. Techniques for deep meditative stargazing and astral projection.',
        content: `
            <p>Earthly presence can often feel heavy — anchored by gravity and daily noise. But under the quiet canopy of the night sky, meditation allows the mind to expand beyond physical bounds.</p>
            <p>To practice astral stargazing:</p>
            <ul>
                <li><strong>Find Complete Silence:</strong> Escape city light pollution and settle into dark sky preserves.</li>
                <li><strong>Fixate on an Anchor Star:</strong> Choose a steady luminous beacon like Vega or Sirius.</li>
                <li><strong>Synchronize Breathing:</strong> Inhale the darkness, exhale stardust. Feel your sensation of weight dissolve into orbital freefall.</li>
            </ul>
            <p>In this state, you transcend being an earthly observer and become an astral projection exploring infinite realms.</p>
        `,
        sparks: 98
    },
    {
        id: 'post-3',
        title: 'Why the Night Sky Heals the Earthly Soul',
        category: 'astrophile',
        tags: ['#astrophile', '#astronomy', '#starlight'],
        date: 'AUG 10, 2026',
        readTime: '4 MIN READ',
        excerpt: 'The psychological tranquility brought by astrophilia. Why looking up at ancient light resets our internal clock and perspective.',
        content: `
            <p>Astrophilia — the deep, unyielding love for the stars and celestial bodies — is more than a hobby. It is a spiritual sanctuary.</p>
            <p>When you look up at the Andromeda Galaxy (M31), you are looking at light that left its source 2.5 million years ago. Human civilization did not even exist when those photons embarked on their journey. Realizing our tiny place in the cosmic timeline does not make us insignificant; it liberates us from trivial anxieties.</p>
        `,
        sparks: 215
    },
    {
        id: 'post-4',
        title: 'Conversations with Betelgeuse & Red Supergiants',
        category: 'astronomy',
        tags: ['#astronomy', '#supernova', '#stardust'],
        date: 'JUL 29, 2026',
        readTime: '6 MIN READ',
        excerpt: 'Monitoring the erratic brightness fluctuations of Betelgeuse in Orion. Is a supernova imminent within our cosmic lifetime?',
        content: `
            <p>Betelgeuse, the glowing red shoulder of Orion, is a behemoth nearing the end of its life. If placed at the center of our Solar System, its surface would extend beyond Jupiter.</p>
            <p>During recent observations, its dimming cycles have sparked endless wonder among astrophiles worldwide. When Betelgeuse finally collapses into a supernova, it will shine as bright as a full moon in our day sky, seeding the galaxy with fresh heavy elements for future stars and planets.</p>
        `,
        sparks: 176
    }
];

function initBlogSystem() {
    let posts = JSON.parse(localStorage.getItem('opuli_blog_posts')) || defaultBlogPosts;
    const grid = document.getElementById('blog-grid-container');
    const searchInput = document.getElementById('blog-search-input');
    const filterPills = document.querySelectorAll('.filter-pill');

    let currentCategory = 'all';
    let searchQuery = '';

    function renderPosts() {
        if (!grid) return;
        grid.innerHTML = '';

        const filtered = posts.filter(post => {
            const matchesCat = currentCategory === 'all' || post.category === currentCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                                  post.excerpt.toLowerCase().includes(searchQuery) ||
                                  post.tags.some(t => t.toLowerCase().includes(searchQuery));
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="glass-card" style="grid-column: 1/-1; padding: 3rem; text-align: center;">
                    <i class="fa-solid fa-cloud-moon" style="font-size: 3rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
                    <h3>No Logs Found</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your search query or filter tags.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(post => {
            const card = document.createElement('article');
            card.className = 'blog-card glass-card popup-hover';
            card.setAttribute('data-popup', 'Read Entry');
            card.innerHTML = `
                <div>
                    <div class="blog-meta">
                        <span class="blog-tag">${post.tags[0]}</span>
                        <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                </div>
                <div class="blog-footer">
                    <button class="spark-btn popup-hover" data-id="${post.id}" data-popup="Spark Entry">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> <span class="spark-count">${post.sparks}</span> Sparks
                    </button>
                    <button class="read-btn popup-hover" data-id="${post.id}" data-popup="Full Article">
                        Read Log <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });

        // Event listeners for sparks & reading
        grid.querySelectorAll('.spark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                const post = posts.find(p => p.id === id);
                if (post) {
                    post.sparks++;
                    localStorage.setItem('opuli_blog_posts', JSON.stringify(posts));
                    btn.querySelector('.spark-count').textContent = post.sparks;
                    btn.classList.add('sparked');
                    createSparkEffect(e.clientX, e.clientY);
                }
            });
        });

        grid.querySelectorAll('.read-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const post = posts.find(p => p.id === id);
                if (post) openBlogModal(post);
            });
        });
    }

    renderPosts();

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderPosts();
        });
    }

    // Filter Pills Listener
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-category');
            renderPosts();
        });
    });

    // New Post Modal
    const newPostBtn = document.getElementById('open-new-post-modal');
    const newPostModal = document.getElementById('new-post-modal');
    const closeNewPostModal = document.getElementById('close-new-post-modal');
    const newPostForm = document.getElementById('new-post-form');

    if (newPostBtn && newPostModal) {
        newPostBtn.addEventListener('click', () => newPostModal.classList.add('active'));
    }
    if (closeNewPostModal) {
        closeNewPostModal.addEventListener('click', () => newPostModal.classList.remove('active'));
    }

    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const category = document.getElementById('post-category').value;
            const excerpt = document.getElementById('post-excerpt').value;
            const content = document.getElementById('post-content').value.replace(/\n/g, '<br>');

            const newPost = {
                id: 'post-' + Date.now(),
                title,
                category,
                tags: [`#${category}`, '#astral'],
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
                readTime: `${Math.max(2, Math.ceil(content.length / 400))} MIN READ`,
                excerpt,
                content: `<p>${content}</p>`,
                sparks: 1
            };

            posts.unshift(newPost);
            localStorage.setItem('opuli_blog_posts', JSON.stringify(posts));
            renderPosts();
            newPostModal.classList.remove('active');
            newPostForm.reset();
        });
    }
}

function openBlogModal(post) {
    const modal = document.getElementById('blog-modal');
    const content = document.getElementById('blog-modal-content');
    const closeBtn = document.getElementById('close-blog-modal');

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="blog-meta" style="margin-bottom: 1rem;">
            <span class="blog-tag">${post.tags.join(' ')}</span>
            <span><i class="fa-regular fa-calendar"></i> ${post.date} ✦ ${post.readTime}</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: #fff; margin-bottom: 1.5rem;">${post.title}</h2>
        <div class="blog-full-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
            ${post.content}
        </div>
    `;

    modal.classList.add('active');

    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };
}

function createSparkEffect(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = '#00f3ff';
        particle.style.boxShadow = '0 0 10px #00f3ff';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 50 + 20;
        const destX = x + Math.cos(angle) * dist;
        const destY = y + Math.sin(angle) * dist;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => particle.remove();
    }
}

/* ==========================================================================
   4. QUANTUM PARTICLE COLLIDER CANVAS
   ========================================================================== */
function initQuantumCollider() {
    const canvas = document.getElementById('collider-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        if (canvas.offsetWidth) {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }
    });

    const particles = [];
    const activeCountEl = document.getElementById('active-quark-count');
    const intensitySlider = document.getElementById('shake-intensity');
    const clearBtn = document.getElementById('clear-collider');

    let shakeEnergy = parseInt(intensitySlider ? intensitySlider.value : 5);

    if (intensitySlider) {
        intensitySlider.addEventListener('input', (e) => shakeEnergy = parseInt(e.target.value));
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            particles.length = 0;
            if (activeCountEl) activeCountEl.textContent = '0';
        });
    }

    const cyanColors = ['#00f3ff', '#b3f8ff', '#ffffff', '#5ce1e6'];

    function addQuark(x, y) {
        for (let i = 0; i < 4; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: Math.random() * 4 + 2,
                color: cyanColors[Math.floor(Math.random() * cyanColors.length)]
            });
        }
        if (particles.length > 200) particles.splice(0, 4);
        if (activeCountEl) activeCountEl.textContent = particles.length;
    }

    let isMouseDown = false;
    canvas.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        const rect = canvas.getBoundingClientRect();
        addQuark(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (isMouseDown || Math.random() < 0.2) {
            addQuark(x, y);
        }
    });

    window.addEventListener('mouseup', () => isMouseDown = false);

    // Render loop
    function renderCollider() {
        ctx.fillStyle = 'rgba(5, 8, 20, 0.2)';
        ctx.fillRect(0, 0, width, height);

        // Draw quantum grid
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.06)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Render Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off canvas boundaries
            if (p.x <= 0 || p.x >= width) p.vx *= -1;
            if (p.y <= 0 || p.y >= height) p.vy *= -1;

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(renderCollider);
    }

    renderCollider();
}

/* ==========================================================================
   5. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-lightbox');

    if (!modal || !lightboxImg) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            lightboxImg.src = imgSrc;
            caption.innerHTML = `<strong>${title}</strong><br><small style="color: var(--text-muted);">${desc}</small>`;
            modal.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

/* ==========================================================================
   6. NAVIGATION & AUDIO SYNTHESIZER
   ========================================================================== */
function initNavigationAndAudio() {
    // Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });

        // Close mobile nav when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // Web Audio API Ambient Soundscape Synthesizer
    const soundBtn = document.getElementById('soundscape-btn');
    const soundIcon = document.getElementById('sound-icon');
    let audioCtx = null;
    let isPlaying = false;
    let oscillator = null;
    let gainNode = null;

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (!isPlaying) {
                try {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    oscillator = audioCtx.createOscillator();
                    gainNode = audioCtx.createGain();

                    // Deep celestial 108 Hz cyan drone
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(108, audioCtx.currentTime);

                    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2);

                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    oscillator.start();

                    isPlaying = true;
                    soundIcon.className = 'fa-solid fa-volume-high';
                    soundBtn.style.color = 'var(--accent-cyan)';
                    soundBtn.style.borderColor = 'var(--accent-cyan)';
                } catch (e) {
                    console.log('AudioContext initialized');
                }
            } else {
                if (gainNode) {
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
                    setTimeout(() => {
                        oscillator.stop();
                        isPlaying = false;
                        soundIcon.className = 'fa-solid fa-volume-xmark';
                        soundBtn.style.color = '';
                        soundBtn.style.borderColor = '';
                    }, 1000);
                }
            }
        });
    }
}

/* ==========================================================================
   7. STATS & FORM HANDLERS
   ========================================================================== */
function initStatsAndForms() {
    const contactForm = document.getElementById('astral-signal-form');
    const responseMsg = document.getElementById('form-response-message');

    if (contactForm && responseMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...`;

            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-check"></i> Signal Transmitted!`;
                responseMsg.innerHTML = `<span style="color: var(--accent-cyan);">✦ Signal received by Opuli's buffer!</span>`;
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Transmit Signal`;
                }, 4000);
            }, 1800);
        });
    }
}
