import {CommonModule} from '@angular/common';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {TablerIconsModule} from 'angular-tabler-icons';
import {NgApexchartsModule,} from 'ng-apexcharts';
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatTooltip} from "@angular/material/tooltip";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
    RouterLink,
    MatDivider,
    MatTooltip,
  ],
})
export class AppDashboardComponent implements OnInit {

  public classifieds: any;

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    this.classifieds = await this.getDetail();
  }

  async getDetail() {
    const url: string = `${environment.apiUrl}/classified/all`;
    return await firstValueFrom(this.http.get(url));
  }

  protected readonly environment = environment;
}
