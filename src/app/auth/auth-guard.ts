import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const email = localStorage.getItem('email');
  const pass = localStorage.getItem('password');
  if(email && pass){
    return true
  } else{
  router.navigate(['/login']);
  return false
  }
};
