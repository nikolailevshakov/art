const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
// появление и исчезание элемента при скроллинге
    window.addEventListener('scroll', () => {
// расстояние, которое пролистали
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

// scrolling with requestAnimationFrame
// ищу все ссылки, которые начинаются с #
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time -start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
// // pure js scrolling

//     const element = document.documentElement,
//           body = document.body;
    
//     const calcScroll = () => {
//         upElem.addEventListener('click', function(event) {
// // поддержка древних браузеров
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop);
// // проверка что это хэш(id), то есть ссылка
//             if (this.hash != '') {
//                 event.preventDefault();
//                 let hashElement = document.getElementById(this.hash.substring(1)),
//                     hashElementTop = 0;

//                 while (hashElement.offsetParent) {
// // OffsetTop сколько пикселей до верхней границы родителя
//                     hashElementTop += hashElement.offsetTop;
//                     hashElement = hashElement.offsetParent;
//                 }

//                 hashElementTop = Math.round(hashElementTop);
//                 smoothScroll(scrollTop, hashElementTop, this.hash);
//             }
//         });
//     };
// // мягкий скроллинг
//     const smoothScroll = (from, to, hash) => {
//         let timeInterval = 1,
//             prevScrollTop,
//             speed;
        
//         if (to > from) {
//             speed = 30;
//         } else {
//             speed = -30;
//         }

//         let move = setInterval(function() {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop);

//             if (
//                 prevScrollTop === scrollTop ||
//                 (to > from && scrollTop >= to) ||
//                 (to < from && scrollTop <= to)
//             ) {
//                 clearInterval(move);
// // Работаем с адресной строкой
//                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
//             } else {
//                 body.scrollTop += speed;
//                 element.scrollTop += speed;
//                 prevScrollTop = scrollTop;
//             }
//         }, timeInterval);
//     }
//     calcScroll();
};

export default scrolling;