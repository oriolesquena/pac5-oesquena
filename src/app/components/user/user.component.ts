import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  processing: boolean;
  panelOpenState:boolean = false;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.processing = true;
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier)

    if (identifier) {
      this.usersService.getUserById(identifier).subscribe({
        next: (response) => {
          if (response) {
            setTimeout(() => {
              this.user = response.data;
              this.processing = false;
              console.log('User --> ', this.user);
            }, 400);
          }
        },
        error: (error: any) => {
          this.processing = false;
          console.error('Error getting user:', error);
        }
      })
    }
  }
}
