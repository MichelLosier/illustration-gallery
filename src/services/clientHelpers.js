export const http = (request) => {
    return fetch(request).then((response) => {
        if(response.ok || response.status == 304){
            return response.json();
        } else {
            new Error(`Non-ok repsonse: ${response.status} ${response.statusText}`)
        }
        
    }).then((data) => {
        return data;
    })
    .catch((err) => {
        return console.log(err);
    })
}