export default {
	state:{//state
        show:false
    },
    getters:{
    	not_show(state){
    		return !state.show;
    	}
    },
    mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
        }
    },
    actions:{
    	switch_dialog(context){  //这里的context和我们使用的$store拥有相同的对象和方法
    		context.commit('switch_dialog')  		
    	}
    }
}