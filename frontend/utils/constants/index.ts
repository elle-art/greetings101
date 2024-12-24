export * from './api';

// csrf token
import Cookies from 'js-cookie';

console.log('CSRF Token FROM INDEX:', Cookies.get('csrftoken'));

export function getCSRFToken() {
  return Cookies.get('csrftoken') || '';
}
