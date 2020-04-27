const slider = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;
    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        // условие перелистывания последнего слайда и первого
        if (n>items.length) {
            slideIndex = 1;
        }
        if (n<1) {
            slideIndex = items.length;
        }
        // скрыли все слайды
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
        // показываем нужный
        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);
    // перелистывание слайдов
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    // в случае если нужны переключатели они действуют 
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex-1].classList.remove('slideInLeft');
            items[slideIndex-1].classList.add('slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlides(+1);
            items[slideIndex-1].classList.remove('slideInRight');
            items[slideIndex-1].classList.add('slideInLeft');
        });
    } catch(e){}

    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex-1].classList.add('slideInDown');
            }, 10000);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex-1].classList.remove('slideInRight');
                items[slideIndex-1].classList.add('slideInLeft');
            }, 10000);
        }
    }
    //остановка и старт работы слайдера при наведении мыши
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mousleave', () => {
        activateAnimation();
    });
    activateAnimation();
};

export default slider;