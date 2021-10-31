export const state = () => ({
    results: [],
    result: {},
    selected: [],
    page: 1,
    count: {
        total: 0,
        pages: 1,
    },
    limit: 15,
    q: "",
    filterby: "fullname",
    sortby: "created",
    sort: "asc",
    fields: [
        {
            key: 'selected',
            label: '#',
            tdClass: 'wslctd',
            sort: false,
        },
        {
            key: 'avatar',
            label: 'Avatar',
            tdClass: 'wava',
            sort: false,
        },
        {
            key: 'fullname',
            label: 'Full Name',
            sort: true,
            // thClass: 'sortable',
        },
        {
            key: 'role',
            label: 'Role',
            sort: true,
        },
        {
            key: 'email',
            label: 'Email',
            sort: true,
        },
        { key: 'whatsapp', label: 'Whatsapp', sort: true },
        { key: 'status', label: 'Status', sort: true },
    ],
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETUSER(state, { i, v }) {
        state.results[i] = v
    },
    SELECTNONE(state) {
        state.results.map(x => {
            x.select = false
            return x
        })
    },
    SELECTALL(state) {
        state.results.map(x => {
            x.select = true
            return x
        })
    },
    SELECTINDEX(state, id) {
        state.results[id].select = !state.results[id].select
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
        let u = '?limit=' + state.limit
        u += '&page=' + state.page
        u += '&filterby=' + state.filterby
        u += '&q=' + state.q
        u += '&sort=' + state.sort
        u += '&sortby=' + state.sortby

        const { data } = await this.$axios.get(`/v1/users${u}`)
        if (data) {
            // dispatch('SetData', {
            //     k: 'results',
            //     v: data.results
            // })
            const ds = data.results
            const wx = ds.map((x) => {
                x.select = false
                return x
            })

            commit('SET', { k: 'results', v: wx })
            commit('SET', { k: 'count', v: data.count })

        }
    }
}

export default {
    state,
    mutations,
    actions
}
