import {http} from './clientHelpers'

class ArtworkService {   
    constructor(){
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/artwork`;
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
    }

    //GETS
    getArtworkAll = () => {
        const request = new Request(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }
    getArtworkByID = (id) => {
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }
    getArtworkByProjectID = (id) => {
        const request = new Request(`${this.baseUrl}/project/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }

    //POSTS
    createArtwork = (data) => {
        const request = new Request(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        return http(request);
    }

    //PATCH
    updateArtwork = (id, data) => {
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        return http(request);
    }
    // UPDATE MANY ARTWORKS
    // {artworks: [<artwork IDs], keys: {$push: {key: value}}}
    //TODO move $push object to server
    updateArtworks = (data) => {
        const request = new Request(`${this.baseUrl}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        return http(request);
    }

    //DELETE
    deleteArtwork = (id) => {
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.baseHeaders,
        });
        return http(request);
    }

}

export default ArtworkService;