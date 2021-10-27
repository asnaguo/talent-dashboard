<template lang="pug">
.flex
    b-form-group(label='Kabupaten', label-for='frm-kabupaten')
        b-form-select#frm-kabupaten(
            :value='kabupaten',
            :options='res.datas',
            @change='$emit("change", $event)'
        )
</template>
<script>
import {
    defineComponent,
    onMounted,
    reactive,
    useContext,
    watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        provinsi: {
            type: String,
            default: '',
        },
        kabupaten: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { $axios, store } = useContext()

        const res = reactive({
            datas: [],
            getKabupaten: (q) => {
                $axios
                    .post(
                        `v1/alamat/kabupaten`,
                        {
                            provinsi: q,
                        },
                        {
                            headers: {
                                'X-APIKEY': store.state.apikey.alamat,
                            },
                        }
                    )
                    .then((r) => {
                        res.datas = r.data
                    })
            },
        })

        watch(
            () => props.provinsi,
            (newValue) => {
                res.getKabupaten(newValue)
            }
        )

        onMounted(() => {
            res.getKabupaten(props.provinsi)
        })

        return { res }
    },
})
</script>
