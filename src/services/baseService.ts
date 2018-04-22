import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {
    constructor(private http: Http) {
        
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '');

        return headers;
    }

    async sendPostRequest(target: string, body:any) {
        return await this.http.post(target, body).toPromise()
    }

    async sendGetRequest(target: string, body:any) {
        return await this.http.get(target, body).toPromise()
    }

    async sendPutRequest(target: string, body:any) {
        return await this.http.put(target, body).toPromise()
    }

    async sendDeleteRequest(target: string, body:any) {
        return await this.http.delete(target, body).toPromise()
    }
}