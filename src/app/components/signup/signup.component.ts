import { Component, OnInit } from '@angular/core';
import {FormGroup ,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // showBanner = false;
signupForm:FormGroup; 
path:string;
imagePreview:any;
userType: string;
pdfPreview:any;
pdfFile:any;
showUserInputs = false;
showAssistantInputs = false;
msgError:string;
constructor(private formBuider:FormBuilder , private  router: Router , private userService:UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    this.signupForm = this.formBuider.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required ,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6) ,Validators.maxLength(12)]],
      phoneNumber: ['', [Validators.required,Validators.minLength(8)]],
      address: ['',[ Validators.required,Validators.pattern(/[0-9]{1,5}\s[a-zA-Z0-9\s]{1,}/)]],
      experience:[''],
      price:[''],
      gender: ['',[Validators.required] ],
      birthday: ['',[Validators.required] ],
      userType: ['' ,],
      informUpdates: [false],
      img:[''],
      pdf: [''],
    });
  }

  signup(){
    console.log("here user object", this.signupForm.value);
    this.signupForm.value.role = (this.path == "/subscription") ? "user" : "Admin";
    this.userService.signup(this.signupForm.value,this.signupForm.value.img,this.signupForm.value.pdf).subscribe((response)=>{
      if (response.message=="ERROR") {
        this.msgError="EMAIL EXIST"     }else{
          console.log("here msg from bk",response.message);
          this.router.navigate(["login"]);
        }
     
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file",file);
    
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

    // onPdfSelected(event: Event) {
    //   const file = (event.target as HTMLInputElement).files[0];
    //   console.log("here file",file);
      
    //   this.signupForm.patchValue({ pdf: file });
    //   this.signupForm.updateValueAndValidity();
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //   this.pdfPreview = reader.result as string
    //   };
    //   reader.readAsDataURL(file);
    //   }
    onFileSelected(event) {
      this.pdfFile = event.target.files[0];
      console.log("here file",this.pdfFile);
      this.signupForm.patchValue({ pdf: this.pdfFile });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(this.pdfFile);
    }

    showInputs(userType: string) {
      if (userType === 'user') {
        this.showUserInputs = true;
        this.showAssistantInputs = false;
      } else if (userType === 'assistant') {
        this.showAssistantInputs = true;
        this.showUserInputs = false;
      }
    }
  }

