<template lang="pug">
  .layout-default(ref="layout-default", @scroll="scrollHandler($event)", @click="closeEverything($event)")
    .network-status(:class="{ 'is-offline': isOffline }")
      .js-scroll-top
      app-header
      auto-complete
      shopping-list
      breadcrumbs-trail(:breadcrumbs="breadcrumbs")
      //- ref="nuxt" 要保留，有 js 會用到此資源
      nuxt(ref="nuxt")
      app-footer(:angel="{ name: 'project-name', color: '#0a3735' }")
      go-top(:class="{ active: isGoTopVisible }")
      .loading-mask(v-show="isDataLoading")
      transition(name="v-delay")
        toast-popup(key="toast-popup", v-if="toastPayload.description")
      transition-group(tag="div")
        dialog-popup(:key="i + item.title + item.description", :payload="item", :index="i", v-if="(item.title || item.description) && typeof item.confirmCallback === 'function'", v-for="item, i in dialogPayload")
    on-air-light(:class="{ 'is-offline': isOffline }")
</template>

<script>
  import AppHeader from '../../../common-elements/components/app-header.vue'
  import AppFooter from '../../../common-elements/components/app-footer.vue'
  import ShoppingList from '../../../common-elements/components/shopping-list.vue'
  import AutoComplete from '../../../common-elements/components/auto-complete.vue'
  import BreadcrumbsTrail from '../../../common-elements/components/breadcrumbs-trail.vue'
  import GoTop from '../../../common-elements/components/go-top.vue'
  import DialogPopup from '../../../common-elements/components/popups/dialog-popup.vue'
  import ToastPopup from '../../../common-elements/components/popups/toast-popup.vue'
  import OnAirLight from '../../../common-elements/components/on-air-light.vue'
  import _throttle from 'lodash/throttle'
  if (process.browser) {
    if (!window.jQuery) window.$ = window.jQuery = require('jquery')
    if (!window.velocity) window.velocity = require('velocity-animate')
  }
  export default {
    name: 'LayoutsDefault',
    components: {
      AppHeader,
      AppFooter,
      ShoppingList,
      AutoComplete,
      BreadcrumbsTrail,
      GoTop,
      DialogPopup,
      ToastPopup,
      OnAirLight
    },
    data () {
      return {
        ...require('../../../common-elements/assets/js/layouts/default/data'),
        isGoTopVisible: false // 是否顯示置頂按鈕
      }
    },
    computed: {
      breadcrumbs () {
        let breadcrumbs = [{
          id: `${this.$store.state.hostname}${process.env.routerBase}`,
          path: '/',
          name: ['系統名稱']
        }]
        return breadcrumbs
      }
    },
    beforeMount () {
      require('../../../common-elements/assets/js/layouts/default/before-mount').init(this)
      this.initToken()
    },
    mounted () {
      require('../../../common-elements/assets/js/layouts/default/mounted').init(this)
    },
    destroyed () {
      require('../../../common-elements/assets/js/layouts/default/destroyed').init(this)
    },
    methods: {
      ...require('../../../common-elements/assets/js/layouts/default/methods'),
      scrollHandler: _throttle(function (_event) {
        // 是否顯示置頂按鈕
        if (this.$refs['layout-default'].scrollTop > 700) this.isGoTopVisible = true
        else this.isGoTopVisible = false
      }, 512)
    }
  }
</script>

<style lang="sass" scoped src="@/assets/sass/layouts/default.sass" />
