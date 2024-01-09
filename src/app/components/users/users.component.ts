import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  get getAllUsers(): User[] {
    return this.users;
  }

  users: User[] = [];
  selectedView: string | null;
  processing: boolean;

  constructor(private usersService: UsersService, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.selectedView = this.localStorageService.get('view');
    this.processing = true;
    this.usersService
    .getAllUsers()
    .subscribe({
      next: (response) => {
        if (response) {
          setTimeout(() => {
            this.users = response.data;
            this.processing = false;
          }, 400);
        }
      },
      error: (error: any) => {
        console.error('Error getting users:', error);
      }
    });
  }

  onViewChange(view: string) {
    this.localStorageService.set('view', view)
    this.selectedView = view;
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
    }, 500);
  }
}
