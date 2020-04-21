const modals = () => {
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e)=> {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item=> {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });
                modal.style.display = 'block';
                // при скролле страницы, скролится будет только модальное окно, не вся страница
                // document.body.style.overflow = 'hidden';
                // используем классы bootstrap для того же 
                document.body.classList.add('modal-open');
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', ()=> {
            modal.style.display = 'none';
            document.body.style.overflow = 'initial';
            windows.forEach(item => {
                item.style.display = 'none';
                document.body.style.marginRight = `0px`;
            });
        });
        // закратие окна после клика вне его 
        modal.addEventListener('click', (e)=> {
        // e.target при нажатии вне окна это и есть modal, а при нажании внутри это элементы modal окна
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'initial';
                document.body.style.marginRight = `0px`;
                // используем классы bootstrap для того же 
                // document.body.classList.remove('modal-open');

                windows.forEach(item=> {
                    item.style.display = 'none';
                });
            }
        });
    }
// модальное окно появляется через 60 секунд
    function showMobalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach((item) => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'none';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            // Долистал ли пользователь до конца страницы
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                // имитация клика элемента
                document.querySelector(selector).click();
            }
        });
    };

        bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
        bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
        bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
        openByScroll('.fixed-gift');
        showMobalByTime('.popup-consultation', 60000);
};

export default modals;