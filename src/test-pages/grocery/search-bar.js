const filterVegetables = (event) => {
    const phrase = event.target.value;
    const regexp = new RegExp(phrase, 'i');
    [...document.getElementsByClassName('vegetable')].forEach((v) => {
        if(regexp.test(window.getComputedStyle(v.getElementsByClassName('label')[0], ':before').content)) {
            v.style.display = '';
        } else {
            v.style.display = 'none';
        }
    })
};

document.getElementById('search-bar-input').addEventListener('input', filterVegetables);
