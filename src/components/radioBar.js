import React ,{useContext}from 'react'
import {store} from "../store";
import { FormControl,RadioGroup,FormLabel,FormControlLabel,Radio,makeStyles,styled } from '@material-ui/core';

function RadioBar() {
    const {state, dispatch} = useContext(store);
    const useStyles = makeStyles((theme) => ({
       radio: {
       },
       maindiv:{
          marginLeft:15,
          marginTop:10,
       },
       radioMar:{
        marginBottom:10,
       }
    }));
    
    const classes = useStyles();
    return (
        <div className={classes.maindiv}>
            <FormControl>
               <div className={classes.radioMar}>
                  <FormLabel id="demo-radio-buttons-group-label">柱状图 &gt;</FormLabel>
               </div>
                <RadioGroup
                   aria-labelledby="demo-radio-buttons-group-label"
                   defaultValue="length"

                   name="radio-buttons-group">
                        <FormControlLabel value="stations"    classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'stations'})}/>} label="车站数" />
                        <FormControlLabel value="length"      classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'length'})}/>} label="里程" />
                        <FormControlLabel value="avgfootfall" classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'avgfootfall'})}/>} label="客流量" />
                        <FormControlLabel value="line"        classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'line'})}/>} label="线路数" />
                        <FormControlLabel value="indensity"   classes={{label:classes.radio}}  control={<Radio size="small" 
                           onChange={() => dispatch({type: 'changeBarIdx',newIdx:'indensity'})}/>} label="客流强度" />
                </RadioGroup>
            </FormControl>
        </div>                   
    )
    
}

export default RadioBar;

