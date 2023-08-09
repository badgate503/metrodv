import React, { cloneElement, useContext } from 'react';
import { store } from "../store";
import ReactEcharts from "echarts-for-react";
import 'echarts/map/js/china';
import { makeStyles } from '@material-ui/core/styles';

function IndependentView() {
    const { state, dispatch } = useContext(store);
    let chartDataArr = [];
    let detailedDataArr = [];
    let cityName = ""
    for (let key in state.chartData) {
        chartDataArr[key] = state.chartData[key];
    }
    if(state.indData==undefined) return null;
    if (state.indData[0] == undefined) return null;
    if (chartDataArr[state.dataIndex] == undefined) return null;
    
    chartDataArr.sort((x, y) => state.barOrder == "ascend" ? (x[state.barIdx] - y[state.barIdx]) : (y[state.barIdx] - x[state.barIdx]));
    for(let key in state.indData){
        if(state.dataNameByMap!=null){
            if(state.indData[key].city==state.dataNameByMap)detailedDataArr.push(state.indData[key]);
            cityName = state.dataNameByMap
    
        }else{
            if(state.indData[key].city==chartDataArr[state.dataIndex].city)detailedDataArr.push(state.indData[key]);
            cityName = chartDataArr[state.dataIndex].city
        }
        
    }
    

    const sortDataArr=detailedDataArr.map(item=>{
        return {name:item.name,value:item.value,color:item.color}
    })
    sortDataArr.sort((y,x) => x.value-y.value);
    const makePieData=sortDataArr.map(item=>{
        return {name:item.name,value:item.value}
    })
    const PieColorData=sortDataArr.map(item=>{
        return item.color
    })
    const getOption = () => {
        return {
            legend: {
                left:0,
                textStyle: {
                    //图例字体大小
                    fontSize: 12,
                },
                itemHeight: 8,
                itemWidth:12,
                orient: 'vertical',
                type: 'scroll',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} km"
            },
            color:PieColorData,
            toolbox: {
                show: true,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            title:{
                text:cityName,
                left:'50%',
                top:'52%',
                textStyle:{
                  color:'#031f2d',
                  fontSize:16,
                  align:'center'
                }
            },
            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [40, 120],
                    center: ['55%', '55%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: makePieData
                }
            ]
        }
    }
    const classes = makeStyles((theme) => ({
        maindiv:{
           marginLeft:10,
           marginTop:10,
           marginRight:10,
        },
     }));
    
    return <div className={classes().maindiv}>
       
        <ReactEcharts
            option={getOption()}
        />
    </div>
}

export default IndependentView;