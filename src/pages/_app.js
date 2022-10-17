import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'

import { SessionProvider as AuthProvider } from 'next-auth/react'
// we are giving entire application access to nextauth. so authentication state can  be used throughout nextJS build

const MyApp = ({ 
    Component, 
    pageProps: { session, ...pageProps },

  }) => {
  return (
    // we are wrapping with <AuthProvider> with field 'session'
    <AuthProvider session={session}>   
       {/* below code was already there  */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
