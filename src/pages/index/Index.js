import { AppBase, jgdata } from '@/lib/Index'
import BasePageBack from '@/components/basepageback/BasePageBack'
import BackBtn from '@/components/btns/backBtn/BackBtn.vue'
import Skeleton from '@/components/skeleton/Skeleton.vue'
import Browseimage from '@/components/browseimage/Browseimage.vue'
import Menu from '@/components/menu/Menu.vue'
import Cart from "@/pages/Cart/Cart.vue";


import { ref, defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'Index',
  extends: AppBase,
  // computed: {},
  data () {
    return {
      title: '',
      images: [],
      loadedTimeout: null
    }
  },
  setup () {
    const isLoading = ref(false)
    provide('isLoading', isLoading)

    function updateIsLoading (value) {
      isLoading.value = value
    }

    return {
      isLoading,
      updateIsLoading
    }
  },
  components: {
    BasePageBack,
    BackBtn,
    Menu,
    Skeleton,
    Browseimage,
    Cart,
  },
  // async created () {},
  async mounted () {
  },
  methods: {
    setUI () {
    },
    initData () {
      this.setUI()
      this.getTitle(this.$Lang('viewblogs-page-title', '部落格'), 'viewblogs')
      this.getBrowserImg()
      this.onLoadComplete()
    },
    getBrowserImg() {
      let shopInfo = jgdata.getShopInfo()
      console.log(shopInfo)
      if (shopInfo) {
        this.images = shopInfo.browseImage
      }
    },
    getTitle (defVal, paramKey) {
      let title = defVal
        const data = jgdata.getFunList()
        if (data && data.length > 0) {
          const item = data.find(e => e.parameter === paramKey)
          if (item) {
            title = item.text
          }
        }
        this.title = title
     },
     onclickMenu () {
      this.menuRef.openMenu()
    },
     /** 取得相關資料後，關閉loaded動畫 */
    onLoadComplete () {
      this.loadedTimeout = setTimeout(() => {
        this.updateIsLoading(false)
        clearInterval(this.loadedTimeout)
        window.clearInterval(this.loadedTimeout)
      }, 500)
    }
  }
})
