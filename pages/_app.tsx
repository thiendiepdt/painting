import React, { FC } from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { globalStyles } from '../shared/styles'
import GoogleTagManager from '../components/GoogleTagManager'
import { Provider } from 'react-redux'
import store from '../store'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React)
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <GoogleTagManager>
      {globalStyles}
      <Provider store={store}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </GoogleTagManager>
  )
}

export default MyApp
