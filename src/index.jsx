

import App from './App'
import './assets/css/index.css'
import './assets/css/style.css'
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

const root = createRoot(document.querySelector('#root'))

root.render(
    <QueryClientProvider client={queryClient}>
            <App />
        <ReactQueryDevtools initialIsOpen />
        <Toaster />
    </QueryClientProvider>
)