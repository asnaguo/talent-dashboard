<template lang="pug">
.flex 
    AlamatBox(
        :provinsi='res.alamat.provinsi',
        :kabupaten='res.alamat.kabupaten',
        :kecamatan='res.alamat.kecamatan',
        :kelurahan='res.alamat.kelurahan',
        :kodepos='res.alamat.kodepos',
        :alamat='res.alamat.alamat',
        @change='res.Change($event)'
    )
</template>
<script>
import {
    defineComponent,
    reactive,
    useContext,
    onMounted,
    onBeforeMount,
} from '@nuxtjs/composition-api'
import AlamatBox from '~/components/misc/alamat'

export default defineComponent({
    components: {
        AlamatBox,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            alamat: {
                provinsi: '',
                kabupaten: '',
                kecamatan: '',
                kelurahan: '',
                kodepos: '',
                alamat: '',
            },
            Change: (data) => {
                store.dispatch('auth/register/SaveFormAlamat', data)
            },
        })
        onBeforeMount(async () => {
            await store.dispatch('auth/register/LoadFormAlamat').then((r) => {
                if (r) {
                    res.alamat = r
                }
            })
        })
        onMounted(async () => {})

        return { res }
    },
})
</script>
