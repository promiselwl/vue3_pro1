import { useUserStore } from "@/store/user"  //引用用户登录数据(本地存储)
import { computed } from "vue"

// useUserStore()
export const getAvatar = () => {
  const userStore = useUserStore()//使用本地存储
  const avatarSrc = computed(() => userStore.userInfo.photo || require('@/assets/1.jpg'))
  return {
    avatarSrc
  }
}


