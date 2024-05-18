import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {DomSanitizer, SafeHtml, Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../../services";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  public slug: string | null = '';
  public classified: any;
  user!: any;

  images: string[] = [];

  constructor(private http: HttpClient,
              private title: Title,
              private route: ActivatedRoute,
              private snackBar: CustomSnackBar,
              private sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService
  ) {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  async ngOnInit() {
    if (!this.slug) {
      this.snackBar.route('Invalid classified', '/');
    }

    this.classified = await this.getDetail();
    if (!this.classified) {
      this.snackBar.route('Invalid classified', '/');
    }

    this.title.setTitle(this.classified.title + ' | ' + environment.name);

    if (this.classified.images.length !== 0) {
      this.classified.images.forEach((image: any) => {
        if (image.path) {
          this.images.push(environment.server + image.path);
        }
      });
    }

    this.user = this.authenticationService.userValue;
  }

  formattedText(text: string): SafeHtml {
    if (!text) return this.sanitizer.bypassSecurityTrustHtml('');
    const replacedText = text.replace(/\r\n/g, '<br/>')
    .replace(/\n/g, '<br/>');
    return this.sanitizer.bypassSecurityTrustHtml(replacedText);
  }

  async getDetail() {
    const url: string = `${environment.apiUrl}/classified/get/${this.slug}`;
    return await firstValueFrom(this.http.get(url));
  }


  shareClassified() {
    // copy clipboard
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.snackBar.message('Link copied to clipboard');
  }

  favorite() {
    if (!this.classified.id) return this.snackBar.message('Invalid classified');
    let url = '';
    if (this.classified.isFavorite) {
      url = `${environment.apiUrl}/user/favorite/delete`;
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        body: {
          classifiedId: this.classified.id
        }
      }
      this.http.delete(url, options).subscribe(
        (res: any) => {
          this.classified.isFavorite = false;
          this.snackBar.message(res.message);
        });
    } else {
      url = `${environment.apiUrl}/user/favorite/add`;
      this.http.post(url, {classifiedId: this.classified.id}).subscribe(
        (res: any) => {
          this.classified.isFavorite = true;
          this.snackBar.message(res.message);
        });
    }
  }

  editPage() {
    this.snackBar.route('Edit Property', '/classified/edit/' + this.slug);
  }
}
