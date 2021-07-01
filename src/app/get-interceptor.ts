import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";

import * as data from "../assets/data.json";

@Injectable()
export class GetDataInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqCopy = req.clone();
    if (reqCopy.method === "GET" && reqCopy.url === "http://localhost:4200/assets/data.json") {
      return of(new HttpResponse({ status: 200, body: data.result }));
    }
    next.handle(reqCopy);
  }
}

