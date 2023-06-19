import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profilForm: FormGroup;
  user: any = {};
  selectedFile: File = null;
  birthday:string;
  constructor(private userServcie: UserService) { }

  ngOnInit() {
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.userServcie.getUserById(connectedUser.id).subscribe((response) => {
      this.birthday = new Date(response.user.birthday).toISOString().substring(0, 10);

      this.user = response.user;
    })
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.user.avatar = reader.result as string;
    };
  }

  editProfile(){
    this.userServcie.editPorifle(this.user).subscribe((response)=>{
      console.log("user",this.user);
      
      console.log("response",response.message);
      this.user=response.message;
      let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
      this.userServcie.getUserById(connectedUser.id).subscribe((response) => {
        this.user = response.user;
      })
    })
  }
}
