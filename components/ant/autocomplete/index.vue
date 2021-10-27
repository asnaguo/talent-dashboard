<template>
    <div class="ant-select">
        <AutoComplete
            :data-source="result"
            style="width: 200px"
            placeholder="input here"
            @select="handleSearch"
            @search="handleSearch"
            @change="handleSearch"
        >
        </AutoComplete>
    </div>
</template>
<script>
import { AutoComplete } from 'ant-design-vue'
import '../../../node_modules/ant-design-vue/lib/input/style/index.css' // or ant-design-vue/lib/button/style/css for css format file
import '../../../node_modules/ant-design-vue/lib/auto-complete/style/index.css' // or ant-design-vue/lib/button/style/css for css format file
import '../../../node_modules/ant-design-vue/lib/select/style/index.css' // or ant-design-vue/lib/button/style/css for css format file

export default {
    components: {
        AutoComplete,
    },
    data() {
        return {
            result: [],
        }
    },
    methods: {
        handleSearch(value) {
            let result
            if (!value || value.includes('@') >= 0) {
                result = []
            } else {
                result = ['gmail.com', '163.com', 'qq.com'].map(
                    (domain) => `${value}@${domain}`
                )
            }
            this.result = result
        },
    },
}
</script>