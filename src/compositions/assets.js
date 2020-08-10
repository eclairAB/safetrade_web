import { asyncGetApi } from '@/http'
import { ref, computed, watch } from '@vue/composition-api'

export const useAssets = (context) => {
  const { $store, $nextTick } = context.root
  const assets = computed(() => {
    return $store.getters['assets/assets']
  })
  const activeAsset = computed(() => {
    return assets.value.find((asset) => asset.name === 'cash')
  })

  $nextTick(() => {
    if (!activeAsset.value) {
      $store.dispatch('assets/fetchAssets')
    }
  })
  return { assets, activeAsset }
}

export const useAssetPrices = (context) => {
  const { $store } = context.root
  const { activeAsset } = useAssets(context)
  const fetchingPrices = ref(false)
  const nextPageUrl = ref(null)

  const fetchPrices = async ({ url }) => {
    await $store.dispatch('assets/setIsFetchingPrices', true)
    const { data } = await asyncGetApi(
      url ? url : `assets/${activeAsset.value.id}/price-history`
    )
    await $store.dispatch('assets/addAssetPrices', data.data)
    await $store.dispatch('assets/setIsFetchingPrices', false)
    nextPageUrl.value = data.next_page_url
    return data.data
  }

  const assetPrices = computed(() => $store.getters['assets/assetPrices'])
  const isFetchingPrices = computed(
    () => $store.getters['assets/isFetchingPrices']
  )
  const oldestTime = computed(() => {
    return $store.getters['assets/oldestTime']
  })
  watch(activeAsset, async (activeAsset) => {
    if (activeAsset && activeAsset.id && !fetchingPrices.value) {
      fetchingPrices.value = true
      await fetchPrices({})
      fetchingPrices.value = false
    }
  })

  return { assetPrices, isFetchingPrices, nextPageUrl, fetchPrices, oldestTime }
}
