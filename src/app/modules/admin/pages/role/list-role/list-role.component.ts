import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRole {
  roles: string[] = ['Admin', 'User', 'Manager'];

  editRole(role: string) {
    console.log('Edit role:', role);
  }
}