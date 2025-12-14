// Tab switching functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Detect user's platform and highlight relevant download
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('mac')) {
        highlightCard(0);
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        highlightCard(1);
        switchTab('ios');
    } else if (userAgent.includes('android')) {
        highlightCard(2);
        switchTab('android');
    }

    function highlightCard(index) {
        const cards = document.querySelectorAll('.download-card');
        if (cards[index]) {
            cards[index].style.borderColor = 'var(--primary-color)';
            cards[index].style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.2)';
        }
    }

    function switchTab(tabId) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        const btn = document.querySelector(`[data-tab="${tabId}"]`);
        const content = document.getElementById(tabId);

        if (btn && content) {
            btn.classList.add('active');
            content.classList.add('active');
        }
    }

    // Carousel functionality
    initCarousel();
});

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0 || !prevBtn || !nextBtn) {
        console.log('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Add click handlers with event binding
    prevBtn.onclick = function (e) {
        e.preventDefault();
        prevSlide();
    };

    nextBtn.onclick = function (e) {
        e.preventDefault();
        nextSlide();
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Auto-play (optional - every 5 seconds)
    let autoPlayInterval = setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            nextSlide();
        } else {
            currentIndex = 0;
            updateCarousel();
        }
    }, 5000);

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                currentIndex = 0;
                updateCarousel();
            }
        }, 5000);
    });

    // Initial state
    updateCarousel();
}
