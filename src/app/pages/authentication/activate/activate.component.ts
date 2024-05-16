import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {CustomSnackBar} from "../../../services/snackbar.service";
import {ActivateDTO} from "../../../dto/authentication/ActivateDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
})
export class AppSideActivateComponent implements OnInit {

  activateDTO!: ActivateDTO;
  activateForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBar,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    let token = this.route.snapshot.queryParamMap.get('token');

    this.activateForm = this._formBuilder.group({
      token: [
        token ? atob(token) : '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]
      ],
    });
  }

  onSubmit() {
    if (this.activateForm.valid) {
      this.activateDTO = new ActivateDTO();
      this.activateDTO.token = btoa(this.activateForm.value.token);
      this.authenticationService.activateAccount(this.activateDTO);
    } else {
      this.snackBar.message('Please fill all required fields',);
    }
  }
}


