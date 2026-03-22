import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/Appcontext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'

//cleck helps for login and logout secure

const PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('missing published key')
  
}

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
          <App />
        </ClerkProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
