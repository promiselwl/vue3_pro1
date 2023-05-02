import { defineStore } from 'pinia'
import { getLocal, setLocal } from "@/utils/storage"
import getRoutePool from '@/assets/js/handleData'//获取路由完整菜单路由值
import { toRaw } from 'vue'//把proxy值转化普通对象



export const useAppStore = defineStore('APPSTORE', {
    state: () => {
        return {
            // 面包屑存储的值
            sidebarOpened: getLocal('__sidebarOpened__', true),
            //如果本地存储没有返回true 有值用它存储的值
            // 新增标签存储的值
            tagsViewList: getLocal('__tagsViewList__', [])
        }
    },
    actions: {
        // 面包屑折叠
        changeSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened//取反
            setLocal('__sidebarOpened__', this.sidebarOpened)
        },
        // 新增标签
        addTagViewList(tag) {
            const routePool = getRoutePool()
            // 判断是否是菜单项路由 比如401,404
            const isFind = routePool.find(item => item.path === tag.path)
            if (!isFind) return
            //判断是否在 tagsViewList 已经存在 不存在就新增标签并且进行本地存储
            const isExit = this.tagsViewList.find(item => item.path === tag.path)
            if (!isExit) {
                // 不存在就新增
                this.tagsViewList.push(tag)
                setLocal('__tagsViewList__', toRaw(this.tagsViewList))

            }
        },
        // 剪切标签
        removeTagViewList(type, index) {
            // index当前操作的tag下标 type为类型
            let tagsViewList = this.tagsViewList
            // 数组的splice方法第一个参数是从数值下标值开始剪，参数二剪掉的个数，参数三为剪的位置及替换项
            switch (type) {
                // 删除自己
                case 'me':
                    tagsViewList.splice(index, 1)
                    break;
                // 删除其他项
                case 'other':
                    // 把删除的项赋值给 tagsViewList
                    tagsViewList = tagsViewList.splice(index, 1)
                    break;
                // 删除后面的项
                case 'right':
                    tagsViewList.splice(index + 1)
                    break;
            }
            console.log(this.tagsViewList);
            this.tagsViewList =tagsViewList
            setLocal('__tagsViewList__', toRaw(this.tagsViewList))//设置本地存储
        }
    },

})