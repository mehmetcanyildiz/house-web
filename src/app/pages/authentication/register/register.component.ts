import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterDTO} from "../../../dto/authentication/RegisterDTO";
import {AuthenticationService} from "../../../services";
import {CustomSnackBar} from "../../../services/snackbar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {

  registerDTO!: RegisterDTO;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBar
  ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstname: [
        '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]*$'),
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      lastname: [
        '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]*$'),
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      phone: [
        '', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: [
        '', [
          Validators.required,
          Validators.email,
        ]
      ],
      password: [
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      confirm: [
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]
      ],
    });
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      if (this.secondFormGroup.value.password !== this.secondFormGroup.value.confirm) {
        this.snackBar.message('Passwords do not match',);
        return;
      }

      this.registerDTO = new RegisterDTO();

      this.registerDTO.firstname = this.firstFormGroup.value.firstname;
      this.registerDTO.lastname = this.firstFormGroup.value.lastname;
      this.registerDTO.phone = this.firstFormGroup.value.phone;
      this.registerDTO.email = this.secondFormGroup.value.email;
      this.registerDTO.password = this.secondFormGroup.value.password;
      this.registerDTO.re_password = this.secondFormGroup.value.confirm;

      this.authenticationService.register(this.registerDTO);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }
}
