import {Component} from '@angular/core';
import {filter, map} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {DataService} from "../../services/data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
})
export class BlankComponent {
  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.title.setTitle(data + ' | ' + environment.name);
        this.dataService.data.emit(data);
      }
    });
  }
}
