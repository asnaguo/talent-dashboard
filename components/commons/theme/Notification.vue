<template lang="pug">
BNavItemDropdown.ml-2(noCaret)
  template(v-slot:button-content)
    button.btn.btn-light.position-relative.btn-sm.px-1(type='button')
      IconNotification(height='18px', fill='#999')
      span.position-absolute.translate-middle.badge.rounded-pill.bg-danger(
        style='top: -10px; right: -10px'
      )
        | 99+
  BDropdownItem
    .flex.wsl
      h6.text-muted Notifications
    .flex.d-flex.justify-content-center.py-2
      IconClipboard(color='#ececec', height='60px')
    .flex.d-flex.justify-content-center
      .text-sm.text-muted
        em You don't have any notifications at the moment
  //- BDropdownItem
  //-   .text-sm [PENTING] Gratis Ongkir RP0 + Voucher Alfamart
  //- BDropdownItem
  //-   .text-sm [PENTING] Gratis Ongkir RP0 + Voucher Alfamart
  //- BDropdownItem
  //-   .text-sm [PENTING] Gratis Ongkir RP0 + Voucher Alfamart
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default defineComponent({
  name: 'Notification',
  components: {
    BNavItemDropdown,
    BDropdownItem,
  },
  setup() {},
})
</script>