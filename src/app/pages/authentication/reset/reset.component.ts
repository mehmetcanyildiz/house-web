import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {ResetDTO} from "../../../dto/authentication/ResetDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class AppSideResetComponent implements OnInit {

  formDTO!: ResetDTO;
  componentForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBar,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    let token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.snackBar.route('Invalid token', '/auth/login');
    }
    this.componentForm = this._formBuilder.group({
      token: [
        token ? atob(token) : '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
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
    if (this.componentForm.valid) {
      this.formDTO = new ResetDTO();
      this.formDTO.token = btoa(this.componentForm.value.token);
      this.formDTO.password = this.componentForm.value.password;
      this.formDTO.re_password = this.componentForm.value.confirm;
      if (this.formDTO.password !== this.formDTO.re_password) {
        this.snackBar.message('Passwords do not match');
        return;
      }
      this.authenticationService.resetPassword(this.formDTO);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }
}


