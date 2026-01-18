import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MarrfeeOS from './MarrfeeOS.jsx'
import AppStoreProvider from './marrfeeOSHooks/GlobalProviders/AppStorePrivider/AppStoreProvider.jsx'
import ViewportProvider from './marrfeeOSHooks/GlobalProviders/ViewportProvider.jsx'
import TimeProvider from './marrfeeOSHooks/GlobalProviders/TimeProvider.jsx'
import BrowserProvider from './marrfeeOSHooks/GlobalProviders/BrowserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserProvider>
      <TimeProvider>
        <ViewportProvider>
          <AppStoreProvider>
            <MarrfeeOS />
          </AppStoreProvider>
        </ViewportProvider>
      </TimeProvider>
    </BrowserProvider>
  </StrictMode>
)
