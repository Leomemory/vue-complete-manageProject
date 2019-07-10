import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

// 与components里有一一对应的状态文件
import dialog_store from '@/components/dialog_store.js';//引入某个store对象

import theme_color from '@/store/modules/themeColor.js';
import Menu from '@/store/modules/menu.js'

export default new vuex.Store({
    modules: {
        dialog: dialog_store,
        themeColor: theme_color,
        menu: Menu
    }
})