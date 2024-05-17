import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {CreateDTO} from "../../../dto/classified/CreateDTO";
import {ClassifiedService} from "../../../services/classified/classified.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

  formDTO!: CreateDTO;
  componentForm!: FormGroup;
  selectedFiles: File[] = [];

  types: string[] = ['SALE', 'RENT'];
  categories: string[] = ['HOUSE', 'APARTMENT', 'RESIDENCE', 'DETACHED_HOUSE', 'VILLA'];

  constructor(
    private _formBuilder: FormBuilder,
    private classifiedService: ClassifiedService,
    private snackBar: CustomSnackBar,
  ) {
  }

  ngOnInit() {
    this.componentForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(1000000000)]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      roomNumber: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      livingRoomNumber: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      grossArea: [null, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      netArea: [null, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      buildingAge: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      floorLocation: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      totalFloor: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      isFurnished: [null],
      images: [null]
    });
  }

  onSubmit() {
    if (this.componentForm.valid) {
      if (this.selectedFiles.length === 0) {
        this.snackBar.message('Please select at least one image');
        return;
      }
      this.formDTO = new CreateDTO();

      const formData = new FormData();

      if (this.componentForm.value.isFurnished === null) {
        this.componentForm.value.isFurnished = false;
      }

      formData.append('title', this.componentForm.value.title);
      formData.append('description', this.componentForm.value.description);
      formData.append('price', this.componentForm.value.price);
      formData.append('type', this.componentForm.value.type);
      formData.append('category', this.componentForm.value.category);
      formData.append('roomNumber', this.componentForm.value.roomNumber);
      formData.append('livingRoomNumber', this.componentForm.value.livingRoomNumber);
      formData.append('grossArea', this.componentForm.value.grossArea);
      formData.append('netArea', this.componentForm.value.netArea);
      formData.append('buildingAge', this.componentForm.value.buildingAge);
      formData.append('floorLocation', this.componentForm.value.floorLocation);
      formData.append('totalFloor', this.componentForm.value.totalFloor);
      formData.append('isFurnished', this.componentForm.value.isFurnished);

      this.selectedFiles.forEach(file => {
        formData.append('images[]', file);
      });

      this.classifiedService.create(formData);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedFiles = Array.from(target.files);
    }
  }
}
