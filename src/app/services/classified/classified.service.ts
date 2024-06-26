import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomSnackBar} from "../snackbar.service";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassifiedService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private snackBar: CustomSnackBar
  ) {
  }


  create(formData: FormData) {
    const url: string = `${environment.apiUrl}/classified/create`;
    return this.http.post(url, formData).subscribe((res: any) => {
      this.snackBar.route(res.message, '/classified/detail/' + res.slug);
    });
  }

  update(id: string, formData: FormData) {
    const url: string = `${environment.apiUrl}/classified/update/${id}`;
    return this.http.put(url, formData).subscribe((res: any) => {
      this.snackBar.route(res.message, '/classified/detail/' + res.slug);
    });
  }

  delete(id: any) {
    const url: string = `${environment.apiUrl}/classified/delete/${id}`;
    return this.http.delete(url).subscribe((res: any) => {
      this.snackBar.route(res.message, '/profile/my-classifieds');
    });
  }
}
