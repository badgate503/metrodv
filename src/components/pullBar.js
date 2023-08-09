import React ,{useContext}from 'react'
import {store} from "../store";
import { FormControl,InputLabel,Select,MenuItem,makeStyles } from '@material-ui/core';

/*
<label>数据排序：
                <select onChange={() => { dispatch({type: 'changeOrder'})}}>
                    <option value="ascend">降序</option>
                    <option value="decend">升序</option>
                </select>
            </label>
*/
function PullBar() {
    const {state, dispatch} = useContext(store);
    const useStyles = makeStyles((theme) => ({
        maindiv:{
           marginLeft:10,
           marginTop:15,
           marginRight:10,
        },
     }));
     const classes = useStyles();
    return (
        <div className={classes.maindiv}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">顺序</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="排序"
                defaultValue={10}
                onChange={() => { dispatch({type: 'changeOrder'})}}
            >
                <MenuItem value={10}>降序</MenuItem>
                <MenuItem value={20}>升序</MenuItem>
            </Select>
            </FormControl>
        </div>
                
    )
    
}

export default PullBar;
