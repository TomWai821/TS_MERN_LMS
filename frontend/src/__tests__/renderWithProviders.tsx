import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { ModalProvider } from '../Context/ModalContext';
import { AuthProvider } from '../Context/User/AuthContext';
import { AlertProvider } from '../Context/AlertContext';
import { Suspense } from 'react';

export const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => 
{
    return render(
        <MemoryRouter future={{ v7_relativeSplatPath: true }} initialEntries={[route]}>
            <AuthProvider>
                <AlertProvider>
                    <ModalProvider>
                        <Suspense fallback={<div>Loading...</div>}>
                            {ui}
                        </Suspense>
                    </ModalProvider>
                </AlertProvider>
            </AuthProvider>
        </MemoryRouter>
    );
};