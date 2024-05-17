import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {User} from "../../../models";
import {SettingsDTO} from "../../../dto/user/SettingsDTO";
import {UserService} from "../../../services/user/user.service";
import {ForgotDTO} from "../../../dto/authentication/ForgotDTO";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  formDTO!: SettingsDTO;
  componentForm!: FormGroup;
  user!: User;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBar,
    private dialog: MatDialog,
  ) {
  }

  onSubmit() {
    if (this.componentForm.valid) {
      this.formDTO = new SettingsDTO();
      this.formDTO.firstname = this.componentForm.value.firstname;
      this.formDTO.lastname = this.componentForm.value.lastname;
      this.formDTO.phone = this.componentForm.value.phone;
      this.userService.updateSettings(this.formDTO);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }

  ngOnInit() {
    const user = this.authenticationService.userValue;

    this.componentForm = this._formBuilder.group({
      email: [
        user?.email, [
          Validators.required,
          Validators.email,
        ]
      ],
      firstname: [
        user?.firstname, [
          Validators.required,
          Validators.pattern('^[a-zA-ZğüşöçıİĞÜŞÖÇ\\s]*$'),
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      lastname: [
        user?.lastname, [
          Validators.required,
          Validators.pattern('^[a-zA-ZğüşöçıİĞÜŞÖÇ\\s]*$'),
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      phone: [
        user?.phone, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
    });
  }

  forgotPassword() {
    this.dialog.open(ChangePasswordDialog, {
      width: '600px',
    });
  }
}

@Component({
  selector: 'change-password-dialog',
  templateUrl: 'change.password.dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ChangePasswordDialog {
  constructor(public dialogRef: MatDialogRef<ChangePasswordDialog>, private auth: AuthenticationService) {
  }

  sendPasswordMail() {
    let user = this.auth.userValue;
    if (user && user.email) {
      let forgotDTO = new ForgotDTO();
      forgotDTO.email = user?.email;
      this.auth.forgotPasswordClient(forgotDTO);
    }
    this.dialogRef.close();
  }
}
