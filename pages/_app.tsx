import '../styles/globals.css'
import "../styles/editor.css";
import type { AppProps } from 'next/app'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
 
 export default function MyApp({ Component, pageProps }: AppProps) {
   const [queryClient] = useState(() => new QueryClient())
 
   return (
     <QueryClientProvider client={queryClient}>
       <Hydrate state={pageProps.dehydratedState}>
         <Component {...pageProps} />
       </Hydrate>
     </QueryClientProvider>
   )
 }
