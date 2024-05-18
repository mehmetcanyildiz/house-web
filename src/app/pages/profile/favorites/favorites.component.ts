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

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

  }

  async ngOnInit() {
    const user = this.authenticationService.userValue;

    this.classifieds = await this.getDetail(user?.uid);
    console.log(this.classifieds);
  }

  async getDetail(id: any) {
    const url: string = `${environment.apiUrl}/classified/favorite/${id}`;
    return await firstValueFrom(this.http.get(url));
  }

  protected readonly environment = environment;
}
