import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http'
import { authHttp } from '@angular/http'


@Injectable()
export class JobFormService {

  test() {
    return this.authHttp.delete(jobUrl, options)
        .map(this.extractData)
        .catch(this.handleError);

  }


}

