const mask = (selector) => {
// создаем маску ввода
    let setCursorPosition = (pos, elem) => {
// фокус на элементе
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
// Ручно полифил для ie
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
// граничные точки
            range.collapse(true);
// конец и начало диапазона
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
// заменяем не цифры на пустую строку
            def = matrix.replace(/\D/g, ''),
            // Динамичное
            val = this.value.replace(/\D/g, '');
// фильтр на удаление символов
        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            // функция работает с каждым символом
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
// пользователь перестал вводить символы, нажал вне
        if (event.type === 'blur') {
            if (this.value.length === 2) {
                this.value = '';
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    };

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;