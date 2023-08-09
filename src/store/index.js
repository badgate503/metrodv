// 本文件处理数据逻辑

import React, {createContext, useReducer, useEffect} from 'react';
import {fetchCsvData} from "./api";
import initialState from './data';
import reducer from './reducer';

// 创建数据中心的这样一个上下文，一般称为store
const store = createContext();

// 包装成数据组件
function StateProvider({children}) {
    // 绑定数据以及数据处理方法
    const [state, dispatch] = useReducer(reducer, initialState);

    // 初始化时，读取本地数据
    useEffect(() => {
        fetchCsvData('./datav.csv')
          .then(res => {
              dispatch({
                type:'init',
                payload: res
              })
          })
        fetchCsvData('./dataIn.csv')
          .then(res => {
              dispatch({
                type:'initIn',
                payload: res
              })
          })
        fetchCsvData('./data2.csv')
          .then(res => {
              dispatch({
                type:'initTiming',
                payload: res
              })
          })
        fetchCsvData('./data3.csv')
          .then(res => {
              dispatch({
                type:'initGdp',
                payload: res
              })
          })
    }, [])
    
    // 为子元素包裹上数据的上下文环境，方便所有子元素读取
    return <store.Provider value={{state, dispatch}}>
        {children}
    </store.Provider>
}

export {store, StateProvider}
