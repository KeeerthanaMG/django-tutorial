// Handle FOUC and initialize AOS correctly without race conditions
window.addEventListener('load', () => {
    // Reveal body smoothly once external resources load
    document.body.classList.add('loaded');

    // Defer AOS init slightly to ensure Tailwind CDN fully painted the DOM
    setTimeout(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });

        // Safe recalculation of offsets
        setTimeout(() => AOS.refresh(), 300);
    }, 100);
});

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
});

// Add Copy Buttons to Code Blocks
document.querySelectorAll('pre').forEach(function (codeBlock) {
    if (!codeBlock.classList.contains('mermaid')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700 hover:bg-gray-700 hover:text-white';
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';

        copyBtn.addEventListener('click', function () {
            const code = codeBlock.querySelector('code');
            const textToCopy = code ? code.innerText : codeBlock.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check text-green-400"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            });
        });

        wrapper.appendChild(copyBtn);
    }
});

// Generate Sidebar Links and Scroll Spy
const sections = [
    { id: 'hero', title: 'Introduction', icon: 'fa-home' },
    { id: 'about', title: 'Instructor', icon: 'fa-user' },
    { id: 'roadmap', title: 'Mindmap', icon: 'fa-sitemap' },
    { id: 'why-django', title: 'Why Django', icon: 'fa-question-circle' },
    { id: 'architecture', title: 'Architecture', icon: 'fa-project-diagram' },
    { id: 'installation', title: 'Installation', icon: 'fa-download' },
    { id: 'project-structure', title: 'Project Structure', icon: 'fa-folder-tree' },
    { id: 'app-structure', title: 'App Structure', icon: 'fa-cubes' },
    { id: 'mvt', title: 'MVT Pattern', icon: 'fa-layer-group' },
    { id: 'first-view', title: 'First View', icon: 'fa-eye' },
    { id: 'url-routing', title: 'URL Routing', icon: 'fa-link' },
    { id: 'models', title: 'Models & DB', icon: 'fa-database' },
    { id: 'migrations', title: 'Migrations', icon: 'fa-random' },
    { id: 'admin', title: 'Django Admin', icon: 'fa-tachometer-alt' },
    { id: 'api-example', title: 'API Example', icon: 'fa-plug' },
    { id: 'tips', title: 'Hackathon Tips', icon: 'fa-lightbulb' },
    { id: 'mini-project', title: 'Mini Project', icon: 'fa-tasks' },
    { id: 'resources', title: 'Resources', icon: 'fa-book' }
];

const navContainer = document.getElementById('nav-links');

sections.forEach(sec => {
    const link = document.createElement('a');
    link.href = `#${sec.id}`;
    link.className = 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors nav-item';
    link.dataset.target = sec.id;
    link.innerHTML = `<i class="fas ${sec.icon} w-5 text-center"></i> <span>${sec.title}</span>`;
    navContainer.appendChild(link);
});

// Scroll Spy
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');
const sectionElements = sections.map(sec => document.getElementById(sec.id)).filter(el => el);

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight / 3;

    sectionElements.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.remove('bg-primary/10', 'text-primary', 'font-medium');
        item.classList.add('text-gray-400');
        if (item.dataset.target === current) {
            item.classList.add('bg-primary/10', 'text-primary', 'font-medium');
            item.classList.remove('text-gray-400');
            // Auto scroll sidebar to keep active item in view
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Trigger scroll initially to set active state
setTimeout(() => window.dispatchEvent(new Event('scroll')), 500);

// Mobile menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');

mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});

// Close sidebar on link click (mobile)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    });
});

// Folder tree interactive toggle
document.querySelectorAll('.folder-toggle').forEach(folder => {
    folder.addEventListener('click', function () {
        const ul = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (ul && ul.tagName === 'UL') {
            ul.classList.toggle('hidden');
            if (ul.classList.contains('hidden')) {
                icon.classList.replace('fa-folder-open', 'fa-folder');
            } else {
                icon.classList.replace('fa-folder', 'fa-folder-open');
            }
        }
    });
});
