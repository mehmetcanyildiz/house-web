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

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    this.classifieds = await this.getDetail();
  }

  async getDetail() {
    const url: string = `${environment.apiUrl}/classified/user`;
    return await firstValueFrom(this.http.get(url));
  }

  protected readonly environment = environment;
}
