import { act } from "react-dom/test-utils";

// 不同请求的处理
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            };
        case 'init': {
            let newData = [];
            // TODO: use action.payload to update newData
            newData = action.payload;
            return {
                ...state,
                chartData: newData,
                barIdx: "length",
                barOrder: "decend",
                dataIndex:0,
                mapStf1:true,
                mapStf2:true,
                mapStf3:true,
                mapStf4:true,
                dataNameByMap:null,
                ranges:{stations:[36,85,220],length:[53,114,514],avgfootfall:[408,2033,10000],line:[2,4,10],indensity:[0.33,0.51,1]},
                viewing:1,
                choosenYear:"2022",
            };
        }
        case 'initIn': {
            let newData = [];
            // TODO: use action.payload to update newData
            newData = action.payload;
            return {
                ...state,
                indData: newData,
            };
        }
        case 'initTiming': {
            let newData = [];
            // TODO: use action.payload to update newData
            newData = action.payload;
            console.log(newData);
            return {
                ...state,
                timeLength: newData,
            };
        }
        case 'initGdp': {
            let newData = [];
            // TODO: use action.payload to update newData
            newData = action.payload;
            console.log(newData);
            return {
                ...state,
                timeGDP: newData,
            };
        }
        case 'changeBarIdx':{
           
            return {
                ...state,
                barIdx: action.newIdx
            };
        }
        case 'changeOrder':{
            
            return {
                ...state,
                barOrder: state.barOrder == "decend" ? "ascend" : "decend"
            };
            
        }
        case 'dataZoom':{
            console.log(action.dataIndex)
            return {
                ...state,
                dataIndex:action.dataIndex
            };
        }
        case 'controlMap':{
            
            let mapStf = [];
            switch (action.idx){
                case 1:{return{...state,mapStf1:!state.mapStf1}}
                case 2:{return{...state,mapStf2:!state.mapStf2}}
                case 3:{return{...state,mapStf3:!state.mapStf3}}
                case 4:{return{...state,mapStf4:!state.mapStf4}}
                default:
            }
            
        }
        case 'dataZoomByMap':{
            return {
                ...state,
                dataNameByMap:action.dataName
            };
        }
        case 'clearDataByMap':{
            return {
                ...state,
                dataNameByMap:null
            };
        }
        case 'tabViews':{
            return {
                ...state,
                viewing:action.idx
            }
        }
        case 'changeYear':{
            return {
                ...state,
                choosenYear:action.idx
            }
        }
        default:
            throw new Error();
    }
}

export default reducer;