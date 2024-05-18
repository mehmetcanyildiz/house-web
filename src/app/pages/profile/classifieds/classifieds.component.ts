import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../../services";

@Component({
  selector: 'app-classifieds',
  templateUrl: './classifieds.component.html',
})
export class ClassifiedsComponent implements OnInit {
  public classifieds: any;

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    const user = this.authenticationService.userValue;

    this.classifieds = await this.getDetail(user?.uid);
    console.log(this.classifieds);
  }

  async getDetail(id: any) {
    const url: string = `${environment.apiUrl}/classified/user/${id}`;
    return await firstValueFrom(this.http.get(url));
  }

  protected readonly environment = environment;
}
