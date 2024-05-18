import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {AuthenticationService} from "../../../services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateDTO} from "../../../dto/classified/CreateDTO";
import {UpdateDTO} from "../../../dto/classified/UpdateDTO";
import {ClassifiedService} from "../../../services/classified/classified.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  public slug: string | null = '';
  public classified: any;
  types: string[] = ['SALE', 'RENT'];
  categories: string[] = ['HOUSE', 'APARTMENT', 'RESIDENCE', 'DETACHED_HOUSE', 'VILLA'];
  images: any[] = [];
  user: any;
  formDTO!: UpdateDTO;
  editForm!: FormGroup;
  selectedFiles: File[] = [];
  classifiedStatus: string[] = ['ACTIVE', 'PASSIVE'];


  constructor(private http: HttpClient,
              private title: Title,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private classifiedService: ClassifiedService,
              private snackBar: CustomSnackBar,
              private _formBuilder: FormBuilder,
  ) {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  async ngOnInit() {
    if (!this.slug) {
      this.snackBar.route('Invalid classified', '/');
    }

    this.classified = await this.getDetail();
    if (!this.classified) {
      this.snackBar.route('Classified not found', '/');
    }

    const user = this.authenticationService.userValue;
    if (this.classified.user.email !== user?.email) {
      this.snackBar.route('You are not authorized to edit this classified', '/');
    }

    this.title.setTitle(this.classified?.title + ' | ' + environment.name);
    this.patchForm();
  }

  patchForm() {
    this.editForm = this._formBuilder.group({
      title: [this.classified?.title, [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      description: [this.classified?.description, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]],
      price: [this.classified?.price, [Validators.required, Validators.min(1), Validators.max(1000000000)]],
      type: [this.classified?.type, [Validators.required]],
      category: [this.classified?.category, [Validators.required]],
      roomNumber: [this.classified?.roomNumber, [Validators.required, Validators.min(1), Validators.max(100)]],
      livingRoomNumber: [this.classified?.livingRoomNumber, [Validators.required, Validators.min(0), Validators.max(100)]],
      grossArea: [this.classified?.grossArea, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      netArea: [this.classified?.netArea, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      buildingAge: [this.classified?.buildingAge, [Validators.required, Validators.min(0), Validators.max(100)]],
      floorLocation: [this.classified?.floorLocation, [Validators.required, Validators.min(0), Validators.max(100)]],
      totalFloor: [this.classified?.totalFloor, [Validators.required, Validators.min(0), Validators.max(100)]],
      classifiedStatus: [this.classified?.classifiedStatus, [Validators.required]],
      isFurnished: [this.classified?.isFurnished],
      images: [null]
    });
    if (this.classified.images.length !== 0) {
      this.classified.images.forEach((image: any) => {
        if (image.path) {
          this.images.push({
            path: environment.server + image.path,
            id: image.id
          });
        }
      });
    }
  }

  async getDetail() {
    const url: string = `${environment.apiUrl}/classified/get/${this.slug}`;
    return await firstValueFrom(this.http.get(url));
  }

  onFileChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.files) {
      this.selectedFiles = Array.from(target.files);
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.formDTO = new CreateDTO();

      const formData = new FormData();

      if (this.editForm.value.isFurnished === null) {
        this.editForm.value.isFurnished = false;
      }

      formData.append('title', this.editForm.value.title);
      formData.append('description', this.editForm.value.description);
      formData.append('price', this.editForm.value.price);
      formData.append('type', this.editForm.value.type);
      formData.append('category', this.editForm.value.category);
      formData.append('roomNumber', this.editForm.value.roomNumber);
      formData.append('livingRoomNumber', this.editForm.value.livingRoomNumber);
      formData.append('grossArea', this.editForm.value.grossArea);
      formData.append('netArea', this.editForm.value.netArea);
      formData.append('buildingAge', this.editForm.value.buildingAge);
      formData.append('floorLocation', this.editForm.value.floorLocation);
      formData.append('totalFloor', this.editForm.value.totalFloor);
      formData.append('isFurnished', this.editForm.value.isFurnished);
      formData.append('classifiedStatus', this.editForm.value.classifiedStatus);

      if(this.selectedFiles.length !== 0) {
        this.selectedFiles.forEach(file => {
          formData.append('images[]', file);
        });
      }


      this.classifiedService.update(this.classified?.id,formData);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }

  onDelete() {

  }

  deleteImage(e: number, id: any) {
    this.http.delete(`${environment.apiUrl}/classified/delete/image/${id}`).subscribe(
      (res: any) => {
        this.images.splice(e, 1);
        this.snackBar.message(res.message);
      }
    );
  }
}
