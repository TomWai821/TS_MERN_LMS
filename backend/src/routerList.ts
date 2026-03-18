import { Router, Express } from 'express'

// routes
import userRoutes from './routes/user';
import bookRoutes from './routes/books';
import definitionRoutes from './routes/definition'
import contactRoutes from './routes/contact'
import recommendRoutes from './routes/recommend'
import healthRoutes from './routes/health'

const routerList:Record<string, Router> = 
{
    '/api/user': userRoutes,
    '/api/book': bookRoutes,
    '/api/definition': definitionRoutes,
    '/api/contact': contactRoutes,
    '/api/recommend': recommendRoutes,
    '/health': healthRoutes,
}

export const routerHandler = (app: Express) => 
{
    Object.entries(routerList).forEach(([path,router]) =>
    {
        app.use(path,router);
    })
}