import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: EventEmitter<string> = new EventEmitter<string>();
}
