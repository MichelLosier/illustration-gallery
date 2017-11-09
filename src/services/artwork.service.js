import {defaultFetch} from './clientHelpers'

class ArtworkService {   
    constructor(){
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/artwork`;
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        this.defaultFetch = defaultFetch;
    }

    //GETS
    getArtworkAll(callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.defaultFetch(request, callback);
    }
    getArtworkByID(id, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.defaultFetch(request, callback);
    }
    getArtworkByProjectID(id, callback){
        const request = new Request(`${this.baseUrl}/project/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.defaultFetch(request, callback);
    }

    //POSTS
    createArtwork(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.defaultFetch(request, callback);
    }

    //PATCH
    updateArtwork(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.defaultFetch(request, callback);
    }
    // UPDATE MANY ARTWORKS
    // {artworks: [<artwork IDs], keys: {$push: {key: value}}}
    updateArtworks(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.defaultFetch(request, callback);
    }

    //DELETE
    deleteArtwork(id, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.baseHeaders,
        });
        this.defaultFetch(request, callback);
    }

}

export default ArtworkService;