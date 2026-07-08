document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    // 1. Lógica del Carrusel interno (imágenes dentro de la card)
    cards.forEach(card => {
        const track = card.querySelector('.slider-track');
        if (!track) return;
        
        const images = track.querySelectorAll('img');
        const nextBtn = card.querySelector('.slider-btn.next');
        const prevBtn = card.querySelector('.slider-btn.prev');
        let currentIndex = 0;

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % images.length;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            });
        }
    });

    // 2. Lógica de selección de tarjetas (el carrusel principal)
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // No hacer nada si el clic fue en un botón o en la lista de sabores
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'LI') return;

            // Limpiar otras tarjetas activas
            cards.forEach(c => {
                c.classList.remove('active');
                const flavors = c.querySelector('.flavors-container');
                if (flavors) flavors.classList.add('oculto');
                const btn = c.querySelector('.btn-flavors');
                if (btn) btn.textContent = 'Ver Sabores';
            });
            
            this.classList.add('active');
        });
    });

    // 3. Lógica del botón "Ver Sabores"
    document.querySelectorAll('.btn-flavors').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if(!card.classList.contains('active')) return; 

            const container = card.querySelector('.flavors-container');
            if (container) {
                container.classList.toggle('oculto');
                btn.textContent = container.classList.contains('oculto') ? 'Ver Sabores' : 'Ocultar';
            }
        });
    });
});