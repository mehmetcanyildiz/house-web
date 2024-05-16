import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDTO} from "../../../dto/authentication/LoginDTO";
import {AuthenticationService} from "../../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {

  loginDTO!: LoginDTO;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService,private router: Router) {
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.loginDTO = new LoginDTO();
      this.loginDTO.email = this.loginForm.controls['email'].value;
      this.loginDTO.password = this.loginForm.controls['password'].value;

      this.authenticationService.login(this.loginDTO);
    }
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ]
    });
  }
}
