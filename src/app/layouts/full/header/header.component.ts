import {Component, EventEmitter, Input, Output, ViewEncapsulation,} from '@angular/core';
import {AuthenticationService} from "../../../services";
import {DataService} from "../../../services/data.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  pageTitle = '';

  constructor(
    private authenticationService: AuthenticationService,
    private dataService: DataService,
  ) {
    this.dataService.data.subscribe((data) => {
      this.pageTitle = data;
    });
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
