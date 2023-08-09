// 本文件是界面UI的根目录

import React from 'react';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";
import Overview from "./Overview";
import DetailViewA from "./DetailViewA";
import DetailViewB from "./DetailViewB"
import RadioBar from './radioBar';
import PullBar from "./pullBar"
import IndependentView from "./independentView"
import SomeView from "./someView"
import MapView from "./mapView"
import {useContext}from 'react'
import {store} from "../store";
import MapControlView from "./mapControlView"
import tempView from "./temporalView"
import TempView from './temporalView';

// 这是JSS的写法，相当于声明了一些css的类
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#FCFCFC',
        //backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'

    },
    view: {
        backgroundColor:'#F0F0F0',
        backgroundImage:'linear-gradient(135deg, #F0F0F0 0%, #FDFDFD 100%)',
        borderRadius: '10px',
        boxShadow: '4px 4px 7px #ccc',
    },
    titleView:{
        position: 'absolute',
        height:160,
        top:610,
        left: 610,
        width: 160,
        
    },
    controlPanel: {
        position: 'absolute',
        top: 70,
        height:320,
        left: 70,
        width: 130,
    },
    overview: {
        position: 'absolute',
        top: 70,
        height:320,
        left: 210,
        width: 870,
    },
    independentView: {
        position: 'absolute',
        top: 70,
        height:320,
        left: 1090,
        width:500,
    },


    someView:{
        position: 'absolute',
        height:200,
        top:400,
        left: 610,
        width: 160,
    },
    mapView: {
        position: 'absolute',
        height:300,
        top:400,
        left:70,
        width:530,
    },
    mapControlView: {
        position: 'absolute',
        height:60,
        left:70,
        top:710,
        width:530,
    },
    detailView: {
        position: 'absolute',
        top:400,
        height: 370,
        left: 780,
        width:810
    },
    titleText:{
        marginLeft:10,
        marginTop:10,
    },
    titleText1:{
        fontSize:15,
        fontStyle:'bold',
        color:'#444'
    },
    titleText2:{
        fontSize:23,
        color:'#444'
    },
    titleText3:{
        fontSize:13,
        color:'#444',
        
    },
    dev:{
        marginTop:20,
    }
}))

function DetailViews() {
    const {state, dispatch} = useContext(store);
    if(state.viewing==undefined)return null;
    if (state.viewing==1) {
        return <DetailViewA />;
    }else if(state.viewing==2){
        return <DetailViewB />;
    }else{
        return <TempView/>;
    }
}
function Title(){
    const classes = useStyles();
    return <div className={classes.titleText}>
        <a className={classes.titleText1}>全国轨道交通系统</a><br/>
        <a className={classes.titleText2}>数据可视化</a>
        <div className={classes.dev}>
            <a className={classes.titleText3} href="https://github.com/badgate503/metrodv">On Github</a><br/>
        <a className={classes.titleText3}>Developed with </a><br/>
        <a className={classes.titleText1}>React & Echarts</a>
        </div>
        
    </div>
}
// App组件
function App() {
    // 使用上述的css样式
    
    const classes = useStyles();
    // 使用classes.root使用样式中定义的root类
    // 可视化项目中，若干视图一般采用绝对布局，方便后续调整各个视图的位置与大小
    // 目前四个视图都是一样的，查看AssistView的注释
    return <div className={classes.root}>
        <div className={clsx(classes.view, classes.controlPanel)}><RadioBar/><PullBar/></div>
        <div className={clsx(classes.view, classes.mapView)}><MapView/></div>
        <div className={clsx(classes.view, classes.overview)}><Overview/></div>
        <div className={clsx(classes.view, classes.someView)}><SomeView/></div>
        <div className={clsx(classes.view, classes.titleView)}><Title/></div>
        <div className={clsx(classes.view, classes.independentView)}><IndependentView /></div>
        <div className={clsx(classes.view, classes.mapControlView)}><MapControlView/></div>
        <div className={clsx(classes.view, classes.detailView)}><DetailViews/></div>
    </div>;
}

export default App;
