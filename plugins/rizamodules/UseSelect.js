import { computed, useContext } from '@nuxtjs/composition-api'

export default (stoor) => {
    const { store } = useContext()
    const Selected = () => {
        const scid = store.state[stoor].results.filter((x) => x.select === true)
        store.commit(stoor + '/SET', { k: 'selected', v: scid })
    }
    const SelectAll = (x) => {
        if (x) {
            store.commit(stoor + '/SELECTALL')
        } else {
            store.commit(stoor + '/SELECTNONE')
        }
        Selected()
    }
    const SelectRow = (x, item) => {
        store.commit(stoor + '/SELECTINDEX', x)
        Selected()
    }
    const Sort = (key) => {
        store.commit(stoor + '/SET', { k: 'sortby', v: key })
        const sort = computed(() => store.state[stoor].sort).value
        if (sort === 'asc') {
            store.commit(stoor + '/SET', { k: 'sort', v: 'desc' })
        } else {
            store.commit(stoor + '/SET', { k: 'sort', v: 'asc' })
        }
        store.dispatch(stoor + '/FetchAll')
    }
    return {
        Sort,
        SelectAll,
        SelectRow
    }
}
