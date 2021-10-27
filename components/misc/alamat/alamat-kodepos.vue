<template lang="pug">
.flex
    b-form-group(label='Kodepos', label-for='frm-kodepos')
        b-form-input#frm-kodepos(
            type='text',
            :value='kodepos',
            @input='$emit("change", $event)'
        )
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        kodepos: {
            type: String,
            default: '',
        },
    },
    setup(props) {},
})
</script>
