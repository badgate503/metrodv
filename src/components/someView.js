import React ,{useContext}from 'react'
import {store} from "../store";
import {makeStyles,List,ListItem,ListItemText,Divider ,FormLabel,checkbox} from '@material-ui/core';
function SomeView() {
    const {state, dispatch} = useContext(store);
    const useStyles = makeStyles((theme) => ({
        maindiv:{
           marginTop:'10px',
           marginLeft:'15px',
        },
     }));
     const classes = useStyles();
    return (
        <div>
            <div className={classes.maindiv}>
                <FormLabel id="demo-radio-buttons-group-label">动态展示 &gt; </FormLabel>
            </div>
            <List component="nav" aria-label="mailbox folders">
                <Divider />
                <ListItem button onClick={() => dispatch({type: 'tabViews',idx:1})}>
                    <ListItemText primary="里程数据变化" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => dispatch({type: 'tabViews',idx:2})}>
                    <ListItemText primary="经济数据变化" />
                </ListItem>
                

                <Divider />
                <ListItem button onClick={() => dispatch({type: 'tabViews',idx:3})}>
                    <ListItemText primary="经济/里程分布" />
                </ListItem>
                <Divider />
            </List>
        </div>
        
        
                
    )
    
}

export default SomeView;
