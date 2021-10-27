<template lang="pug">
.flex
    b-form-group(label='Alamat lengkap', label-for='frm-alamatlengkap')
        b-form-textarea#frm-alamatlengkap(
            :value='alamat',
            rows='4',
            max-rows='6',
            @input='$emit("change", $event)'
        )
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        alamat: {
            type: String,
            default: '',
        },
    },
    setup(props) {},
})
</script>
