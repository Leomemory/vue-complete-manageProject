<template>
	<!-- WorldMap Page-->
	<div class="WorldMap" ref="chart"></div>
</template>

<script>
import echarts from 'echarts';
import '../../../node_modules/echarts/map/js/world.js';
export default{
	props:['mapflag'],
	data(){
		return{
			chart: null,
            cityMap:''
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
    		this.setCity()
    		this.worldConfigure()
    	}
    },
    methods:{
    	setCity(){
            if(JSON.parse(localStorage.getItem("WhereInfo")).city.indexOf("省")){
                this.cityMap = JSON.parse(localStorage.getItem("WhereInfo")).city.split("省")[0];
            }
        },
    	worldConfigure(){
    		let myChart = echarts.init(this.$refs.chart); //这里是为了获得容器所在位置    
            var mapName = 'world';
            var data = [
			    {name:"北京",value:100,geographic:[116.405285,39.904989]},
			    {name:"天津",value:100,geographic:[117.190182,39.125596]},
			    {name:"上海",value:100,geographic:[121.472644,31.231706]},
			    {name:"澳门",value:100,geographic:[113.54909,22.198951]},
			    {name:"重庆",value:102,geographic: [107.7539, 30.1904]},
			    {name:"芬兰",value:181,geographic: [24.909912, 60.169095]},
			    {name:"美国",value:132,geographic: [-100.696295, 33.679979]},
			    {name:"英国",value:32,geographic: [-2.5830348,54.4598409]},
			    {name:"加拿大",value:142,geographic: [-102.646409, 59.994255]},
			    {name:"澳大利亚",value:52,geographic: [135.193845, -25.304039]},
			    {name:"德国",value:62,geographic: [13.402393, 52.518569]},
			    {name:"日本",value:42,geographic: [139.710164, 35.706962]},
			    {name:"法国",value:22,geographic: [2.8719426,46.8222422]},
			    {name:"荷兰",value:32,geographic: [5.0752777,52.358465]},
			    {name:"韩国",value:102,geographic: [126.979208, 37.53875]},
			    {name:"意大利",value:72,geographic: [12.56738,41.87194]},
			    {name:"新西兰",value:12,geographic: [171.12582, -43.632107]},
			    {name:"新加坡",value:82,geographic: [103.819836, 1.352083]},
			    {name:"爱尔兰",value:52,geographic: [-7.692054, 53.142368]},
			    {name:"芬兰",value:35,geographic: [25.748151, 61.924106]},
			    {name:"捷克",value:32,geographic: [15.472962, 49.817491]},
			    {name:"匈牙利",value:98,geographic: [19.503304, 47.162495]},
			    {name:"瑞典",value:32,geographic: [18.643501, 60.128264]},
			    {name:"瑞士",value:15,geographic: [8.227512, 46.818188]},
			    {name:"西班牙",value:22,geographic: [-3.74922, 40.463667]},
			    {name:"希腊",value:112,geographic: [21.824312, 39.074208]},
			    {name:"挪威",value:20,geographic: [8.468946, 60.471986]},
			    {name:"葡萄牙",value:22,geographic: [-8.224454, 39.399872]},
			    {name:"比利时",value:32,geographic: [4.469936, 50.503885]},
			    {name:"奥地利",value:32,geographic: [14.550072, 47.516233]},
			    {name:"波兰",value:32,geographic: [19.145136, 51.919436]},
			    {name:"丹麦",value:32,geographic: [9.501785, 56.263918]},
			    {name:"阿根廷",value:32,geographic: [-63.616672, -38.405558]},
			    {name:"巴西",value:132,geographic: [-51.92528, -14.235004]},
			    {name:"俄罗斯联邦",value:32,geographic: [105.318756, 61.523959]},
			    {name:"南非",value:32,geographic: [22.937506, -30.558235]},
			    {name:"阿联酋",value:132,geographic: [53.847818, 23.424076]},
			    {name:"爱沙尼亚",value:132,geographic: [25.013607, 58.595274]},
            ];

            var geoCoordMap = {};
			/*获取地图数据*/
			myChart.showLoading();
			var mapFeatures = echarts.getMap(mapName).geoJson.features;
			myChart.hideLoading();
			data.forEach(function(v) {
			    // 地区名称
			    var name = v.name;
			    // 地区经纬度
			    geoCoordMap[name] = v.geographic;

			});

			var max = 480, 
			    min = 9; // todo 
			var maxSize4Pin = 100,
			    minSize4Pin = 20;
			var convertData = function(data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var geoCoord = geoCoordMap[data[i].name];
			        if (geoCoord) {
			            res.push({
			                value: geoCoord.concat(data[i].value),
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
			                    areaColor: '#2B91B7'
			                }
			            },
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
			        },
			        {
			            type: 'map',
			            map: mapName,
			            geoIndex: 0,
			            aspectScale: 0.75, //长宽比
			            showLegendSymbol: false, // 存在legend时显示
			            roam: true,
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
			                        // console.log('formatter:',val) 
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
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            data: convertData(data),
			            symbolSize: function(val) {
			                return val[2] / 30;
			            },
			            opacity:function(val){
			              return val/2;
			            },
			            showEffectOn: 'render',
			            rippleEffect: {
			                brushType: 'stroke'
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
			                    shadowBlur: 1,
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
    	this.worldConfigure()
    }
}
</script>

<style scoped>
.WorldMap{
	width: 90%;
    height: 300px;
    margin: 0 auto;
}
</style>
