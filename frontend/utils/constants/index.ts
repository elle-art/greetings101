"use client";
export * from './api';

// csrf token
import Cookies from 'js-cookie';

export function getCSRFToken() {
  return Cookies.get('csrftoken') || '';
}
