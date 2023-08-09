import React, { useContext } from 'react';
import { store } from "../store";
import ReactEcharts from "echarts-for-react";
import 'echarts/map/js/china';
import { makeStyles } from '@material-ui/core/styles';

function Overview() {
    const {state, dispatch} = useContext(store);
    var titleLabel={stations:"车站数", length:"总里程数（千米）", avgfootfall:"月均客流量（万人/月）",line:"线路数",indensity:"客流强度（万人/千米/日）"};
    let chartDataArr = [];
    for (let key in state.chartData) {
        chartDataArr[key] = state.chartData[key];
    }
    
    var cityNames = new Array();
    var cityData = new Array();
    let selectedDataIndex = state.dataIndex
    let colorList = []  
    var i;
    chartDataArr.sort((x, y) => state.barOrder == "ascend" ? (x[state.barIdx] - y[state.barIdx]) : (y[state.barIdx] - x[state.barIdx]));
    for(i in state.chartData){
        if(chartDataArr[i]["cityeng"] == '') continue;
        cityNames.push(chartDataArr[i].city)
        cityData.push(chartDataArr[i][state.barIdx])
    }
    
    
    
    const getOption = () => {
        return {
            title : {
                x:'center', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                y: '5px',
                show:true,
                text: titleLabel[state.barIdx]
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            xAxis: {
                axisLabel: {
                    interval:0,
                    show: true,
                    textStyle: {
                        fontSize : 10,
                        overflow : 'breakAll'
                    },
                    formatter: function(params) {
                        var newParamsName = "";
                        var paramsNameNumber = params.length;
                        var provideNumber = 1; //一行显示几个字
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                        if (paramsNameNumber > provideNumber) {
                          for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                              tempStr = params.substring(start, paramsNameNumber);
                            } else {
                              tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                          }
                        } else {
                          newParamsName = params;
                        }
                        return newParamsName;
                      }
                },
                type: 'category',
                data: cityNames
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: 
            [{
                  type: 'inside'
            }],
            grid:{
                x:60,
                y:35,
                x2:50,
                y2:45,

            },
            
            series: [{
                data: cityData,
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: function (params) {
                        
                      if(params.dataIndex == selectedDataIndex) {
                        colorList[params.dataIndex] = '#598987'
                      } else {
                        colorList[params.dataIndex] = '#77A88D'
           
                      }
                      return colorList[params.dataIndex]          
                                      
                    }
                },
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        };
    };
    let onclick = {
        'click': (params)=>
        {
            dispatch({type:"clearDataByMap"})
            dispatch({
                type: 'dataZoom',
                dataIndex: params.dataIndex,
                seriesIndex: params.seriesIndex
            })
        }
        
    }
    const classes = makeStyles((theme) => ({
        maindiv:{
           marginLeft:10,
           marginTop:10,
           
        },
     }));
    return <div  className={classes().maindiv}>
        <ReactEcharts 
            option={getOption()}  
            onEvents={onclick}  
            notMerge={false}
            lazyUpdate={true}
        />
    </div>
}

export default Overview;
