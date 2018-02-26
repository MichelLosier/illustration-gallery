import {http} from './clientHelpers'

class ProjectService {   
    constructor(){
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/projects`;
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        this.http = http;
    }

    //GETS
    getProjectAll(callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }
    getProjectByID(id, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }
    getProjectsByCategory(category, callback){
        const request = new Request(`${this.baseUrl}/category/${category}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        this.http(request, callback);
    }

    //POSTS
    createProject(data, callback){
        const request = new Request(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        this.http(request, callback);
    }

    //PATCH
    updateProject(id, data, callback){
        const request = new Request(`${this.baseUrl}/${id}`, {
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

export default ProjectService;