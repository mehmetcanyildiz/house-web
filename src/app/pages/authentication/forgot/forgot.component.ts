import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {ForgotDTO} from "../../../dto/authentication/ForgotDTO";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class AppSideForgotComponent implements OnInit {

  formDTO!: ForgotDTO;
  componentForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBar,
  ) {
  }

  ngOnInit() {
    this.componentForm = this._formBuilder.group({
      email: [
        '', [
          Validators.required,
          Validators.email,
        ]
      ],
    });
  }

  onSubmit() {
    if (this.componentForm.valid) {
      this.formDTO = new ForgotDTO();
      this.formDTO.email = this.componentForm.value.email;
      this.authenticationService.forgotPasswordClient(this.formDTO);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }
}
