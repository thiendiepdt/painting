export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
declare const window: any

export const pageview = (url?: string): void => {
  window.dataLayer({
    event: 'pageview',
    page: url,
  })
}
