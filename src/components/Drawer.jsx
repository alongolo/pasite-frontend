import React from "react";
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { BsShieldShaded } from 'react-icons/bs';
import { SiMicrogenetics } from 'react-icons/si';
import { GiDrippingTube } from 'react-icons/gi';
import { GiShieldEchoes } from 'react-icons/gi';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

/**
 * the menu of the phylogenetic trees
 */
export default function MiniDrawer({generatingTypeHandler}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [itemSelected, setItemSelected] = React.useState(["defense"]);

    const handleDrawerOpen = () => {
        if (open == true) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    };

    const arrayRemove = (arr, value) =>{

        return arr.filter(function(geeks){
            return geeks != value;
        });

    }

    const handleSelectedItem = item => {
        generatingTypeHandler(item)
        let isActive = itemSelected.includes(item);
        if (isActive){
            setItemSelected(arrayRemove(itemSelected, item));
        }
        else{
            let newArr = [...itemSelected,item];
            setItemSelected([...newArr]);
        }
    }

    return (
        <div className={classes.root}>
            <Drawer
                PaperProps={{ style: { position: 'absolute' ,height:'90.7%',marginTop:'4.5%'},width:'70%' }}
                BackdropProps={{ style: { position: 'absolute' } }}
                ModalProps={{
                    container: document.getElementById('drawer'),
                    style: { position: 'absolute' }
                }}
                anchor='right'
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                    Choose Display:
                </div>
                <Divider/>
                <List>

                    <ListItem button selected={itemSelected.includes("defense")} key="defense" onClick={()=> handleSelectedItem("defense")}>
                        <ListItemIcon><BsShieldShaded/></ListItemIcon>
                        <ListItemText primary="Defense Systems"/>
                    </ListItem>
                    <ListItem button selected={itemSelected.includes("cluster")} key="cluster" onClick={() => handleSelectedItem("cluster")}>
                        <ListItemIcon><SiMicrogenetics/></ListItemIcon>
                        <ListItemText primary="Gene Cluster"/>
                    </ListItem>
                    <ListItem button selected={itemSelected.includes("isolation")} key="isolation" onClick={() => handleSelectedItem("isolation")}>
                        <ListItemIcon><GiDrippingTube/></ListItemIcon>
                        <ListItemText primary="Isolation Type"/>
                    </ListItem>
                    <ListItem button selected={itemSelected.includes("distinct systems")} key="distinct systems" onClick={() => handleSelectedItem("distinct systems")}>
                        <ListItemIcon><GiShieldEchoes/></ListItemIcon>
                        <ListItemText primary="Number of Distinct Systems"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}