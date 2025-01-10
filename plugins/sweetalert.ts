import Swal from 'sweetalert2'
import type { SweetAlertResult } from 'sweetalert2'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: {
        fire: (options: any): Promise<SweetAlertResult<any>> => Swal.fire(options)
      }
    }
  }
})