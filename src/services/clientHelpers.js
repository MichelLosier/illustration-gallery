export const defaultFetch = (request, callback) => {
    fetch(request).then((response) => {
        return response.json();
    }).then((data) => {
        if(callback) callback(data);
        return data;
    })
    .catch((err) => {
        return console.log(err);
    })
}