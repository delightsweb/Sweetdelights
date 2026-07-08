const NUMERO_WHATSAPP = "506XXXXXXXX"; 

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    // --- NUEVA LÓGICA: Carrusel de imágenes interno ---
    cards.forEach(card => {
        const track = card.querySelector('.slider-track');
        if (!track) return; // Por si alguna tarjeta no tiene imágenes
        
        const images = track.querySelectorAll('img');
        const nextBtn = card.querySelector('.slider-btn.next');
        const prevBtn = card.querySelector('.slider-btn.prev');
        let currentIndex = 0;

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se dispare el clic de la tarjeta
            currentIndex = (currentIndex + 1) % images.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    });
    // ---------------------------------------------------

    // Lógica del Carrusel principal
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Se agregó slider-btn a la lista de exclusión para que no cierre la tarjeta
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'LI' || e.target.classList.contains('slider-btn')) return;

            cards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.flavors-container').classList.add('oculto');
                c.querySelector('.btn-wa').classList.add('oculto');
                c.querySelector('.btn-flavors').classList.remove('oculto');
            });
            
            this.classList.add('active');
        });
    });

    // Navegación con flechas (Carrusel principal)
    const moveCarousel = (direction) => {
        const activeIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));
        cards[activeIndex].classList.remove('active');
        
        cards[activeIndex].querySelector('.flavors-container').classList.add('oculto');
        cards[activeIndex].querySelector('.btn-wa').classList.add('oculto');
        cards[activeIndex].querySelector('.btn-flavors').classList.remove('oculto');

        let newIndex = direction === 'right' ? activeIndex + 1 : activeIndex - 1;
        
        if (newIndex >= cards.length) newIndex = 0;
        if (newIndex < 0) newIndex = cards.length - 1;
        
        cards[newIndex].classList.add('active');
    };

    document.getElementById('arrow-right').addEventListener('click', () => moveCarousel('right'));
    document.getElementById('arrow-left').addEventListener('click', () => moveCarousel('left'));

    // Mostrar menú de opciones
    document.querySelectorAll('.btn-flavors').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if(!card.classList.contains('active')) return; 

            card.querySelector('.flavors-container').classList.remove('oculto');
            e.target.classList.add('oculto'); 
        });
    });

    // Seleccionar opción y mostrar botón WhatsApp
    document.querySelectorAll('.lista-sabores li').forEach(item => {
        item.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const sabor = e.target.getAttribute('data-sabor');
            const btnWa = card.querySelector('.btn-wa');
            
            const baseProd = btnWa.getAttribute('data-producto').split(' -')[0];
            btnWa.setAttribute('data-producto', `${baseProd} - ${sabor}`);
            
            card.querySelector('.flavors-container').classList.add('oculto');
            btnWa.classList.remove('oculto');
            btnWa.innerHTML = `Pedir: ${sabor} 📲`;
        });
    });

    // Acción de enviar a WhatsApp
    document.querySelectorAll('.btn-wa').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prod = e.target.getAttribute('data-producto');
            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('¡Hola Sweet Delights! Me encantaría pedir: ' + prod)}`;
            window.open(url, "_blank");
        });
    });
});