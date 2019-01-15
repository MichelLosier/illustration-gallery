export const http = (request) => {
    return fetch(request).then((response) => {
        return response.json()     
    }).then((data) => {
        return data;
    })
    .catch((err) => {
        return console.log(err);
    })
}