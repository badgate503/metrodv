import React, { useContext } from 'react';
import { store } from "../store";
import ReactEcharts from "echarts-for-react";
import 'echarts/map/js/china';
import echarts from "echarts"
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

function TempView(){
    const {state, dispatch} = useContext(store);
    if(state.timeLength==undefined||state.timeGDP==undefined)return null;
    let cData = []
    for(let key in state.timeLength){
        if(state.timeLength[key]['年份']==state.choosenYear){
            let timeLengthData = state.timeLength[key];
            let timeGdpData = state.timeGDP[key];
            let cityName = Object.keys(timeLengthData)
            
            for(let cit in cityName){
                if(cityName[cit]=='年份')continue;
                cData.push([timeGdpData[cityName[cit]],timeLengthData[cityName[cit]],timeLengthData[cityName[cit]],cityName[cit],state.choosenYear])
            }

        }
    }
    


    const data = [
        cData
        
      ];
    const getOption = () => {
        return {
            
              title: {
                text: '经济数据与地铁里程分布',
                left: '5%',
                top: '1%'
              },
              legend: {
                right: '10%',
                top: '3%',
                data: ['城市']
              },
              grid: {
                left: '8%',
                top:"25%",
                bottom:30
              },
              xAxis: {
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
                name:'GDP(亿)',
              },
              yAxis: {
                name:'里程(公里)',
              },
              series: [
                {
                  name: '城市',
                  data: data[0],
                  type: 'scatter',
                  symbolSize: function (data) {
                    return Math.sqrt(data[2])*3;
                  },
                  emphasis: {
                    focus: 'series',
                    label: {
                      show: true,
                      formatter: function (param) {
                        return param.data[3];
                      },
                      position: 'top'
                    }
                  },
                  itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                      {
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                      },
                      {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                      }
                    ])
                  }
                },
                
              ]
        }
    }


    const classes = makeStyles((theme) => ({
        maindiv:{
           marginLeft:10,
           marginTop:10,
           
        },
        slideDiv:{
            marginLeft:60,
            marginRight:60,
            marginTop:20,
        }
     }));
     let onclick = (params)=>
        {
            dispatch({type:"changeYear",idx:params.target.outerText})
        }
        
    
    return <div  className={classes().maindiv}>
        <ReactEcharts 
            option={getOption()}  
            onEvents={onclick}  
            notMerge={true}

        />
        <div className={classes().slideDiv}>
            <Slider
                aria-label="Always visible"
                valueLabelDisplay="on"
                defaultValue={2022}
                step={1}
                marks
                onChangeCommitted={onclick}
                min={1993}
                max={2022}
            />
        </div>
        
    </div>
}

export default TempView