// composables/useLoading.ts

import { useState } from '#app'

export const useLoading = () => {
  const isLoading = useState<boolean>('isLoading')

  return {
    isLoading,
  }
}
