import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (!isAuthenticated) {   
    window.location.href = '/login';
    return false;
  }
  return true;
};
