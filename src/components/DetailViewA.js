import React, { useEffect } from 'react';
import * as echarts from 'echarts';


const DetailViewA = () => {
  const rawData = [
    ['Year', '上海', '北京', '广州', '深圳', '成都', '杭州', '南京', '重庆', '武汉', '西安', '天津'],
    [1993, 6, 42, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [1994, 6, 42, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [1995, 16.1, 42, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [1996, 21, 42, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [1997, 21.4, 42, 5.4, 0, 0, 0, 0, 0, 0, 0, 7],
    [1998, 21.4, 42, 5.4, 0, 0, 0, 0, 0, 0, 0, 7],
    [1999, 21.4, 53, 18.5, 0, 0, 0, 0, 0, 0, 0, 7],
    [2000, 65.5, 54, 18.5, 0, 0, 0, 0, 0, 0, 0, 7],
    [2001, 65.5, 54, 18.5, 0, 0, 0, 0, 0, 0, 0, 7],
    [2002, 65.5, 75, 27.4, 0, 0, 0, 0, 0, 0, 0, 7],
    [2003, 81.4, 114, 36.8, 0, 0, 0, 0, 0, 0, 0, 7],
    [2004, 93.9, 114, 36.8, 21, 0, 0, 0, 14, 10, 0, 45],
    [2005, 110.7, 114, 59.3, 21, 0, 0, 22, 19, 10, 0, 45],
    [2006, 161.3, 114, 111.7, 21, 0, 0, 22, 19, 10, 0, 72],
    [2007, 256.3, 142, 116.1, 22, 0, 0, 22, 19, 10, 0, 72],
    [2008, 258, 199, 116.1, 22, 0, 0, 22, 19, 10, 0, 72],
    [2009, 351.6, 227, 150.4, 25, 0, 0, 22, 19, 10, 0, 72],
    [2010, 450.6, 336, 234.7, 66, 19, 0, 85, 19, 29, 0, 72],
    [2011, 452.1, 372, 234.7, 178, 19, 0, 85, 75, 29, 20, 77],
    [2012, 466.5, 442, 234.7, 178, 41, 48, 85, 131, 57, 20, 132],
    [2013, 563.3, 465, 259.2, 178, 50, 48, 85, 169, 73, 45, 136],
    [2014, 574.3, 527, 259.2, 178, 61, 66, 180, 202, 95, 51, 140],
    [2015, 610.5, 554, 265.2, 178, 88, 82, 225, 202, 126, 51, 140],
    [2016, 615.6, 574, 308, 285, 108, 82, 225, 213, 181, 91, 166],
    [2017, 665.9, 608, 391, 285, 180, 107, 348, 264, 238, 91, 166],
    [2018, 704.9, 637, 475.3, 285, 226, 117, 378, 313, 305, 126, 217],
    [2019, 704.9, 699, 514.9, 303, 302, 134, 378, 330, 339, 132, 229],
    [2020, 729.2, 727, 531, 411, 519, 307, 378, 344, 339, 244, 229],
    [2021, 831, 783, 621.7, 419, 519, 342, 427, 370, 435, 259, 265],
    [2022, 831, 798, 694.1, 547, 519, 450, 508, 401, 435, 278, 276],
    [2023, 831, 810, 694.1, 547, 519, 516, 508, 485, 460, 300, 286]
  ];

  const cities = ['上海', '北京', '广州', '深圳', '成都', '杭州', '南京', '重庆', '武汉', '西安', '天津'];
  
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(cities, function (city) {
      var datasetId = `dataset_${city}`;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: `dataset_raw`,
        transform: {
          type: `filter`,
          config: {
            dimension: city
          }
        }
      });
      seriesList.push({
        type: `line`,
        datasetId: datasetId,
        showSymbol: false,
        smooth: true,
        name: city,
        lineStyle:{
          width:1,
          
        },
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[3] + ': ' + params.value[0];
          }
        },
        labelLayout: {
          moveOverlap: `shiftY`
        },
        emphasis: {
          focus: `series`
        },
        
        encode: {
          x: `Year`,
          y: city,
          label: [city],
          itemName: `Year`,
          tooltip: [city]
        }
      });
    });

    const option = {
      animationDuration: 8000,
      dataset: [
        {
          id: `dataset_raw`,
          source: rawData
        },
        ...datasetWithFilters
      ],
      title: {
        text: `1993-2022年主要城市轨道交通里程数变化`,
        x:"center",
        y:"20px",
      },
      tooltip: {
        order: `valueDesc`,
        trigger: `axis`
      },
      xAxis: {
        type: `category`,
        nameLocation: `middle`
      },
      yAxis: {
        name: `轨道交通里程(千米)`
      },
      grid: {
       
      },
      series: seriesList
    };
    
    myChart.setOption(option);
    
    return () => myChart.dispose();
    
}, []);

  return  <div style={{ width: '100%', height: '100%' }} id="main"></div>;
};

export default DetailViewA;