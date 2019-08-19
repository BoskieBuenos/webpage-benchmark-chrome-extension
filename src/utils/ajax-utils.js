const requestCache = {};

function handleDoneRequest(xhr, resolve, reject) {
    return () => {
        if (xhr.readyState === 4) { // request done
            if (xhr.status === 404) {
                reject(xhr.statusText);
            } else if (xhr.status < 400) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.statusText);
            }
        }
    }
}

export function checkExistance(url, method = 'GET') {
    if (requestCache[url]) {
        if (requestCache[url].status === 'pending'){
            return requestCache[url].promise;
        }

        return new Promise((resolve, reject) => {
            if (requestCache[url].status === 'rejected') {
                reject(requestCache[url].result);
            } else {
                resolve(requestCache[url].result);
            }
        })
    }
    let promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = handleDoneRequest(xhr, resolve, reject);
        xhr.send();
    });
    requestCache[url] = {status: 'pending', promise};

    promise.then((result) => requestCache[url] = {status: 'resolved', result});
    promise.catch((result) => requestCache[url] = {status: 'rejected', result});

    return promise;
}
