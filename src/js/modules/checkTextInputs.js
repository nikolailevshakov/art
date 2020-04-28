const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            // Значение клавиши, которую нажали
            if (event.key.match(/[^а-яё 0-9]/ig)) {
                event.preventDefault();
            }
        });
    });
};

export default checkTextInputs;