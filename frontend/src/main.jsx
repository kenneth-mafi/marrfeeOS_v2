import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MarrfeeOS from './MarrfeeOS.jsx'
import AppStoreProvider from './marrfeeOSHooks/GlobalProviders/AppStorePrivider/AppStoreProvider.jsx'
import ViewportProvider from './marrfeeOSHooks/GlobalProviders/ViewportProvider.jsx'
import TimeProvider from './marrfeeOSHooks/GlobalProviders/TimeProvider.jsx'
import BrowserProvider from './marrfeeOSHooks/GlobalProviders/BrowserProvider.jsx'
import DigIDDataProvider from './APPS/DIGID/frontend/src/hooks/DigIDDataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStoreProvider>
      <DigIDDataProvider>
        <BrowserProvider>
          <TimeProvider>
            <ViewportProvider>
                <MarrfeeOS />
            </ViewportProvider>
          </TimeProvider>
        </BrowserProvider>
      </DigIDDataProvider>
    </AppStoreProvider>
  </StrictMode>
)
