import {http} from './clientHelpers'

class ArtworkService {   
    constructor(){
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/artwork`;
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        this.http = http;
    }

    //GETS
    getArtworkAll(callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }
    getArtworkByID(id, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }
    getArtworkByProjectID(id, callback){
        const request = new Request(`${this.baseUrl}/project/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }

    //POSTS
    createArtwork(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.http(request, callback);
    }

    //PATCH
    updateArtwork(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.http(request, callback);
    }
    // UPDATE MANY ARTWORKS
    // {artworks: [<artwork IDs], keys: {$push: {key: value}}}
    //TODO move $push object to server
    updateArtworks(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.http(request, callback);
    }

    //DELETE
    deleteArtwork(id, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.baseHeaders,
        });
        this.http(request, callback);
    }

}

export default ArtworkService;