export const state = () => ({
    results: [],
    result: {},
    page: 1,
    total: 0,
    perpage: 15,
    q: "",
    filterby: "email",
    ascd: -1
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETUSER(state, { i, v }) {
        state.results[i] = v
    }
}
export const actions = {
    /**
     * Load Indexed
     */
    LoadData({ state, commit }) {
        // for (const [k] of Object.entries(state)) {
        //     try {
        //         const vv = await this.$localForage.user.getItem('users_' + k)
        //         commit("SET", { k, v: vv })
        //     } catch { }
        // }
        // await commit('SET', { k: 'loaded', v: true })
        return false
    },
    /**
     * save config ke indexed db
     */
    SetData({ commit }, { k, v }) {
        // await commit('SET', { k, v })
        // await this.$localForage.user.setItem('users_' + k, v)
        // return null
        return false
    },
    /**
     * get data
     */
    async FetchAll({ state, commit, dispatch }) {
        let u = '?limit=' + state.perpage
        u += '&page=' + state.page
        u += '&filterby=' + state.filterby
        u += '&q=' + state.q
        u += '&ascd=' + state.ascd

        const { data } = await this.$axios.get(`/v1/users${u}`)
        if (data) {
            // dispatch('SetData', {
            //     k: 'results',
            //     v: data.results
            // })

            commit('SET', { k: 'results', v: data.results })
            commit('SET', { k: 'total', v: data.count.total })
            commit('SET', { k: 'pages', v: data.count.pages })

        }
    }
}

export default {
    state,
    mutations,
    actions
}
