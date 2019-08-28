const urlChangeHandler = () => {
    let urlParams = new URLSearchParams(location.search);
    let logo = document.getElementById('logo');
    let additionalSignature = [];

    if (urlParams.has('question')) {
        additionalSignature.push(`pyt. ${urlParams.get('question')}`);
    }
    if (urlParams.has('version')) {
        additionalSignature.push(`interfejs ${urlParams.get('version')}`);
    }
    additionalSignature = additionalSignature.join(', ');
    if (additionalSignature.length > 0) {
        logo.innerText = [logo.innerText, additionalSignature].join(' - ');
    }
};
urlChangeHandler();
window.addEventListener("hashchange", urlChangeHandler);
