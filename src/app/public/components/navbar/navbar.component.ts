import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../features/clients/services/user.service';
import { User } from '../../../features/auth/models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  userId?: string;
  usuario?: User;
  constructor(
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService, private userService: UserService
  ) { }
  ngOnInit(): void {
    this.userId = this.sessionStorageService.getItem('userId');
    this.findUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    this.sessionStorageService.clear();
    this.toastr.success('Ha cerrado sesión con éxito');
  }

  findUser(): void {
    this.userService.getUserById(this.userId!).subscribe({
      next: (user) => {
        this.usuario = user;
      }
    });
  }
}
