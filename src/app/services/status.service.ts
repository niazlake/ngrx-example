import {Injectable} from '@angular/core';

export enum Status {
  NOREAD = 0,
  ARCHIVE = 1,
  READ = 2,
  FAVORITE = 3
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() {
  }

}
