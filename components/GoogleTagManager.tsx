import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtm from '../lib/gtm'
import { GTM_ID } from '../lib/gtm'

const handleRouteChange = () => {
  gtm.pageview()
}

const GoogleTagManager: FC = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (GTM_ID) {
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  return <>{children}</>
}

export default GoogleTagManager
