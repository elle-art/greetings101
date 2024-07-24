import '@testing-library/jest-dom';
import 'whatwg-fetch';
import mockRouter from 'next-router-mock';

// Mock the Next.js router
jest.mock('next/router', () => require('next-router-mock'));
