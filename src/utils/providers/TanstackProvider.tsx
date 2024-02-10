'use client';

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TanstackProvider = ({ children }: {children: ReactNode}) => {
    // instantiate queryClient...
    const queryClient = new QueryClient({
        defaultOptions: {
          queries:  {
            refetchOnWindowFocus: false,
          }
        }
    })

  return (
    <QueryClientProvider client={queryClient}>
        { children }
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default TanstackProvider