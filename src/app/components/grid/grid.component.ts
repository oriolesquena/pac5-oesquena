import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() users: User[];
}
