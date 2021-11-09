<template lang="pug">
.flex(style='height: 800px; width: 100%')
    //- .flex
        .flex(v-for='c in locations', :key='c._id')
            | {{ c.loc }}
    no-ssr
        l-map(:zoom='13', :center='center')
            l-tile-layer(url='https://{s}.tile.osm.org/{z}/{x}/{y}.png')

            .flex
                l-circle(
                    v-for='c in locations',
                    :key='"circle_" + c._id',
                    :lat-lng='c.loc',
                    :radius='5000',
                    :color='c.color'
                )

                l-marker(
                    v-for='(c, index) in locations',
                    :key='c.id',
                    :lat-lng='c.loc',
                    :draggable='true',
                    @update:latLng='res.ChangeLocation(index, c._id, $event)',
                    fillOpacity='0.1'
                )
                    l-icon
                        .flex.justify-content-center
                            .flex.d-flex.justify-content-center
                                i.mdi.mdi-36px.mdi-map-marker-radius.text-danger
                            .flex.d-flex.justify-content-center(
                                style='white-space: nowrap; font-size: 13px; font-weight: 500; color: #000; margin: 0 auto'
                            )
                                .flex(
                                    style='display: block; margin-top: 3px; background: #fff; padding: 0 5px; border-radius: 3px'
                                ) {{ c.fullname }}
</template>
<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        center: {
            type: Array,
            default: () => {},
        },
        locations: {
            type: Array,
            default: () => {},
        },
    },
    emits: ['change'],
    setup(props, { emit }) {
        const res = reactive({
            name: '',
            ChangeLocation: (index, id, value) => {
                try {
                    if (
                        props.locations[index].loc[0] !==
                        [value.lat, value.lng][0]
                    ) {
                        emit('change', {
                            index,
                            _id: id,
                            value,
                            name: res.name,
                        })
                    } else {
                        require('consola').info('tetap sami')
                    }
                } catch (error) {}
            },
        })
        return { res }
    },
})
</script>
