import React ,{useContext}from 'react'
import {store} from "../store";
import {FormControl,FormLabel,Checkbox,RadioGroup,FormControlLabel,makeStyles} from '@material-ui/core';

function MapControlView(){
    const {state, dispatch} = useContext(store);
     
     
     const useStyles = makeStyles((theme) => ({
        maindiv:{
           marginLeft:15,
           marginTop:10,
        },
        chb:{
        },
        mapstf1:{
            color:"#111111"
        }
     }));
     const classes = useStyles();
     if(state.barIdx == undefined) return null;
    let label1 = "> " + state.ranges[state.barIdx][2]
    let label2 = state.ranges[state.barIdx][1] + "~" + state.ranges[state.barIdx][2]
    let label3 = state.ranges[state.barIdx][0] + "~" + state.ranges[state.barIdx][1]
    let label4 = "< " + state.ranges[state.barIdx][0]
    return (
        <div className={classes.maindiv}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                   aria-labelledby="demo-radio-buttons-group-label"
                   row
                   name="radio-buttons-group">
                        <FormControlLabel value="length"    classes={{label:classes.chb}}  control={<Checkbox classes={{checkbox:classes.mapstf1}} defaultChecked size="small"
                           onChange={() => dispatch({type: 'controlMap',idx:4})}/>} label={label1}/>
                        <FormControlLabel value="economy"      classes={{label:classes.chb}}  control={<Checkbox defaultChecked size="small"
                           onChange={() => dispatch({type: 'controlMap',idx:3})}/>} label={label2} />
                        <FormControlLabel value="mapping" classes={{label:classes.chb}}  control={<Checkbox defaultChecked size="small" 
                           onChange={() => dispatch({type: 'controlMap',idx:2})}/>} label={label3} />
                        <FormControlLabel value="mapping" classes={{label:classes.chb}}  control={<Checkbox defaultChecked size="small" 
                           onChange={() => dispatch({type: 'controlMap',idx:1})} />} label={label4} />
                </RadioGroup>
            </FormControl>
        </div>
        
    )
}
export default MapControlView;