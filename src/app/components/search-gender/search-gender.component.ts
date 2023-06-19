import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-search-gender',
  templateUrl: './search-gender.component.html',
  styleUrls: ['./search-gender.component.css']
})
export class SearchGenderComponent implements OnInit {

  term: string;
  usersFound: any[] = [];
  pdfSrcArray: any;
  searchTerm: string;
  firstname: any;
  assistantId: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('term');
    console.log("here seachTearm", this.searchTerm);
    this.userService.searchFunctionGender(this.searchTerm).subscribe(response => {
      this.usersFound = response.users;
      this.pdfSrcArray = this.usersFound.map(user => this.sanitizer.bypassSecurityTrustResourceUrl(user.pdf));
      console.log(this.pdfSrcArray);
      console.log("here response", this.usersFound);



    });
  }
}
