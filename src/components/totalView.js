import React ,{useContext}from 'react'
import {store} from "../store";
import {FormControl,FormLabel,Radio,RadioGroup,FormControlLabel,makeStyles} from '@material-ui/core';
import DetailView from './DetailView';

function TotalView(){
    const {state, dispatch} = useContext(store);
    const useStyles = makeStyles((theme) => ({
        radio: {
           fontSize: 14, // 修改字体大小
           marginTop:1,
        },
        maindiv:{
           marginLeft:10,
           marginTop:10,
        },
        radioMar:{
         marginTop:5,
        }
     }));
     
     const classes = useStyles();
    return (
        <div className={classes.maindiv}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                   aria-labelledby="demo-radio-buttons-group-label"
                   defaultValue="length"
                   row
                   name="radio-buttons-group">
                        <FormControlLabel value="length"    classes={{label:classes.radio}}  control={<Radio size="small"
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'length'})}/>} label="历年里程数据" />
                        <FormControlLabel value="economy"      classes={{label:classes.radio}}  control={<Radio size="small"
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'economy'})}/>} label="历年经济数据" />
                        <FormControlLabel value="mapping" classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'mapping'})}/>} label="经济/里程分布" />
                </RadioGroup>
            </FormControl>
            <div><DetailView/></div>
        </div>
        
    )
}
export default TotalView;