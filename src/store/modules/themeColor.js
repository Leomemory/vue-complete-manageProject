export default {
    state: {
        newThemeColor:"#545c64",
        oldThemeColor:"#545c64"
    },
    getters: {},
    mutations: {
        newThemeColor(state,newThemeColor){  // 改变状态
            state.newThemeColor = newThemeColor;
        },
        oldThemeColor(state,oldThemeColor){
        	state.oldThemeColor = oldThemeColor;
        }
    },
    actions: {
    	onThemeChange({commit, state}, data){
    		commit('newThemeColor',data.newThemeColor)
    		commit('oldThemeColor',data.oldThemeColor)
    	}
    }
}