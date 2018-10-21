import {http} from './clientHelpers'

class ProjectService {   
    constructor(){
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/projects`;
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
    }

    //GETS
    getProjectAll = () =>{
        const request = new Request(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }
    getProjectByID = (id) =>{
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }
    getProjectsByCategory = (category) => {
        const request = new Request(`${this.baseUrl}/category/${category}`, {
            method: 'GET',
            headers: this.baseHeaders
        });
        return http(request);
    }

    //POSTS
    createProject = (data) => {
        const request = new Request(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        return http(request);
    }

    //PATCH
    updateProject = (id, data) => {
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: this.baseHeaders,
            body: JSON.stringify(data)
        });
        return http(request);
    }

    //DELETE
    deleteProject = (id) => {
        const request = new Request(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.baseHeaders,
        });
        return http(request);
    }

}

export default ProjectService;