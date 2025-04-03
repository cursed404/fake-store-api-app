import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios', () => ({
    get: jest.fn(),
    __esModule: true
}));