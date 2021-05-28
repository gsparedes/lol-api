import {Request} from 'express';

export const shouldSkipAuth = ({method, path}: Request) => (method === 'GET' && path === '/status/_healthz');
