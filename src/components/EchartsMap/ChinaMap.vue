<template>
	<!-- ChinaMap Page-->
	<div class="ChinaMap" ref="chart"></div>
</template>

<script>
import echarts from 'echarts';
import '../../../node_modules/echarts/map/js/china.js';
export default{
	props:['mapflag'],
	data(){
		return {
			chart: null,
            cityMap: ''
		}
	},
	beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    watch:{
    	mapflag(newVal){
    		// console.log('newVal',newVal)
    		this.setCity()
    		this.chinaConfigure()
    	}
    },
	methods:{
		//对获取的省份文字进行处理
        setCity(){
            if(JSON.parse(localStorage.getItem("WhereInfo")).city.indexOf("省")){
                this.cityMap = JSON.parse(localStorage.getItem("WhereInfo")).city.split("省")[0];
                // console.log(this.cityMap);
            }
        },
        chinaConfigure(){
        	 let myChart = echarts.init(this.$refs.chart); //这里是为了获得容器所在位置    
	         var mapName = 'china'
	         var city = this.city;
	         var schoolName = localStorage.getItem("schoolName");
	         var data = [
	            {name:"北京",value:177},
	            {name:"天津",value:42},
	            {name:"河北",value:102},
	            {name:"山西",value:81},
	            {name:"内蒙古",value:47},
	            {name:"辽宁",value:67},
	            {name:"吉林",value:82},
	            {name:"黑龙江",value:66},
	            {name:"上海",value:24},
	            {name:"江苏",value:92},
	            {name:"浙江",value:114},
	            {name:"安徽",value:109},
	            {name:"福建",value:116},
	            {name:"江西",value:91},
	            {name:"山东",value:119},
	            {name:"河南",value:137},
	            {name:"湖北",value:116},
	            {name:"湖南",value:114},
	            {name:"重庆",value:91},
	            {name:"四川",value:125},
	            {name:"贵州",value:62},
	            {name:"云南",value:83},
	            {name:"西藏",value:66},
	            {name:"陕西",value:80},
	            {name:"甘肃",value:56},
	            {name:"青海",value:10},
	            {name:"宁夏",value:18},
	            {name:"新疆",value:67},
	            {name:"广东",value:123},
	            {name:"广西",value:59},
	            {name:"海南",value:54},
	            {name:"台湾",value:80},
	          ];
	        var geoCoordMap = {};
	        /*获取地图数据*/
	        myChart.showLoading();
	        var mapFeatures = echarts.getMap(mapName).geoJson.features;
	        myChart.hideLoading();
	        mapFeatures.forEach(function(v) {
	            // 地区名称
	            var name = v.properties.name;
	            // 地区经纬度
	            geoCoordMap[name] = v.properties.cp;

	        });

	        var max = 480,
                min = 9; 
	        var maxSize4Pin = 100,
	            minSize4Pin = 20;
	        var convertData = function(data) {
	            var res = [];
	            for (var i = 0; i < data.length; i++) {
	                var geoCoord = geoCoordMap[data[i].name];
	                if (geoCoord) {
	                    res.push({
	                        value: geoCoord.concat(data[i].value,data[i].name),
	                    });
	                }
	            }
	            return res;
	        };

	        var option = {
	            geo: {
	                show: true,
	                map: mapName,
	                label: {
	                    normal: {
	                        show: false
	                    },
	                    emphasis: {
	                        show: false,
	                    }
	                },
	                roam: false,
	                itemStyle: {
	                    normal: {
	                        areaColor: '#293286',
	                        borderColor: '#6acae7',
	                        borderWidth: 1.2,
	                    },
	                    emphasis: {
	                        areaColor: '#2B91B7',
	                    }
	                }
	            },
	            series: [{
	                    name: '散点',
	                    type: 'scatter',
	                    coordinateSystem: 'geo',
	                    data: convertData(data),
	                    symbolSize: function(val) {
	                        return val[2] / 20;
	                    },
	                    label: {
	                        normal: {
	                            formatter: '{b}',
	                            position: 'right',
	                            show: true
	                        },
	                        emphasis: {
	                            show: true
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: '#293286'
	                        }
	                    }
	                },
	                {
	                    type: 'map',
	                    map: mapName,
	                    geoIndex: 0,
	                    aspectScale: 0.75, //长宽比
	                    showLegendSymbol: false, // 存在legend时显示
	                    label: {
	                        normal: {
	                            show: true
	                        },
	                        emphasis: {
	                            show: false,
	                            textStyle: {
	                                color: '#fff'
	                            }
	                        }
	                    },
	                    roam: true,
	                    itemStyle: {
	                        normal: {
	                            areaColor: 'red',
	                            borderColor: '#293286',
	                        },
	                        emphasis: {
	                            areaColor: '#293286'
	                        }
	                    },
	                    animation: false,
	                    data: data
	                },
	                {
	                    name: '点',
	                    type: 'scatter',
	                    coordinateSystem: 'geo',
	                    symbol: 'pin', //气泡
	                    symbolSize: function(name,val) {
	                        return 66;
	                    },
	                    label: {
	                        normal: {
	                            show: true,
	                            textStyle: {
	                                color: '#fff',
	                                fontSize: 9,
	                            },
	                            formatter(val){
	                                // console.log(val) 
	                                return "选择的学校"
	                            }
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: '#F62157', //标志颜色
	                        }
	                    },
	                    zlevel: 6,
	                    data: convertData(data.filter(val =>
	                        this.cityMap == val.name
	                    ))
	                },
	                {
	                    name: 'Top 5',
	                    type: 'effectScatter',
	                    coordinateSystem: 'geo',
	                    data: convertData(data),
	                    symbolSize: function(val) {
	                        return val[2] / 20;
	                    },
	                    showEffectOn: 'render',
	                    rippleEffect: {
	                        brushType: 'fill'
	                    },
	                    hoverAnimation: true,
	                    label: {
	                        normal: {
	                            formatter: '{b}',
	                            position: 'right',
	                            show: true
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: '#fffaac',
	                            shadowBlur: 10,
	                            shadowColor: '#fffaac'
	                        }
	                    },
	                    zlevel: 1
	                },

	            ]
	        };
	        myChart.setOption(option);
        }
	},
	mounted(){
		this.setCity();
        this.chinaConfigure();
	}
}
</script>

<style scoped>
.ChinaMap{
	width: 80%;
    height: 300px;
    margin: 0 auto;
}
</style>
