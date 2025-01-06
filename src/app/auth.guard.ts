import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRole = route.data['role']; // Rola očekivana za ovu rutu
    if (expectedRole == undefined) {
      expectedRole = 'user';
    }

    console.log('expected role je ', expectedRole);

    const userRole = localStorage.getItem('role'); // Trenutna rola korisnika

    console.log(`Pokušaj pristupa: očekivana rola - ${expectedRole}, trenutna rola - ${userRole}`);

    if (userRole === expectedRole) {
      console.log(`Pristup dozvoljen za ${userRole}`);
      return true;
    } else {
      console.warn(`Pristup odbijen za ${userRole}`);
      alert('You do not have access to view this page. Please log in as a user!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
