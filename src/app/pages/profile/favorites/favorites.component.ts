import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../../services";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  public classifieds: any;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.classifieds = await this.getDetail();
  }

  async getDetail() {
    const url: string = `${environment.apiUrl}/classified/favorite`;
    return await firstValueFrom(this.http.get(url));
  }

  protected readonly environment = environment;
}
