<template lang="pug">
.container.p-5(style='max-width: 960px')
    .card
        .card-header Origin
        .card-body
            h5 Warehouse 1
            div JNE CGK: CGK10000
    .card
        .card-header Destination
        .card-body
            .flex
                label Weight
                .input-group
                    .input-group-prepend
                        label.input-group-text kg
                    b-form-input#input-1(
                        type='number',
                        placeholder='1',
                        :value='$store.state.apps.jne.weight',
                        @change='res.CekTarifJne'
                    )
            .flex.pt-4
                .row
                    .col
                        .flex.py-1
                            label.text-muted Provinsi
                            b-overlay(
                                :show='$store.state.apps.jne.loading',
                                rounded='sm',
                                variant='transparent',
                                spinner-type='grow',
                                spinner-small
                            )
                                SelectProvinsi

                    .col
                        .flex.py-1
                            label.text-muted Kabupaten
                            b-overlay(
                                :show='$store.state.apps.jne.loading',
                                rounded='sm',
                                variant='transparent',
                                spinner-type='grow',
                                spinner-small
                            )
                                SelectKabupaten

                    .col
                        .flex.py-1
                            label.text-muted Kecamatan
                            b-overlay(
                                :show='$store.state.apps.jne.loading',
                                rounded='sm',
                                variant='transparent',
                                spinner-type='grow',
                                spinner-small
                            )
                                SelectKecamatan
                    .col
                        .flex.py-1
                            label.text-muted Kelurahan
                            b-overlay(
                                :show='$store.state.apps.jne.loading',
                                rounded='sm',
                                variant='transparent',
                                spinner-type='grow',
                                spinner-small
                            )
                                SelectKelurahan

            .flex.pt-4
                table.table.table-theme.v-middle.table-hover.table-condensed
                    thead
                        tr.text-muted.text-sm
                            // th.font-weight-400(width='28px') Origin
                            th.text-muted.font-weight-400(width='110px') Service
                            th.text-muted.font-weight-400(width='110px') Code
                            th.text-muted.font-weight-400 Tipe
                            th.text-muted.font-weight-400(width='120px') Price
                            th.text-muted.font-weight-400(width='60px') Etd
                    tbody
                        tr(
                            v-for='p in $store.state.apps.jne.prices',
                            :key='p.service_code'
                        )
                            // td {{ p.origin_name }}
                            // td {{ p.destination_name }}
                            td {{ p.service_display }}
                            td {{ p.service_code }}
                            td {{ p.goods_type }}
                            td {{ p.currency }}.{{ p.price | currency }}
                            td {{ p.etd_from }}
                            // td {{ p.etd_thru }}
                            // td {{ p.times }}
</template>
<script>
import { onMounted, reactive, useContext } from '@nuxtjs/composition-api'
import SelectProvinsi from '~/components/page/page_jne/SelectProvinsi'
import SelectKabupaten from '~/components/page/page_jne/SelectKabupaten'
import SelectKecamatan from '~/components/page/page_jne/SelectKecamatan'
import SelectKelurahan from '~/components/page/page_jne/SelectKelurahan'

export default {
    name: 'JNE',
    components: {
        SelectProvinsi,
        SelectKabupaten,
        SelectKecamatan,
        SelectKelurahan,
    },
    layout: 'default',
    // middleware: 'auth',
    setup() {
        const { store } = useContext()
        const res = reactive({
            CekTarifJne: (c) => {
                store.commit('apps/jne/SET', { k: 'weight', v: c })
                store.dispatch('apps/jne/getJneTarif')
            },
        })
        onMounted(() => {})
        return { res }
    },
}
</script>
