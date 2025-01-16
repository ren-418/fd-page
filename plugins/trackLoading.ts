// plugins/trackLoading.ts

import { defineNuxtPlugin, useState } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize a global loading state
  const isLoading = useState<boolean>('isLoading', () => false)

  // Hook into the page:start event
  nuxtApp.hook('page:start', () => {
    isLoading.value = true
    console.log('Loading started')
  })
  // Hook into the page:finish event
  nuxtApp.hook('page:finish', (component) => {
    isLoading.value = false
    if (component === undefined) {
      console.error('Loading finished with error: component is undefined')
    } else {
      console.log('Loading finished successfully')
    }
  })
})
