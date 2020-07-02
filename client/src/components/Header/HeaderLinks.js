import React, { useState, useContext } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';

import UserLoginDialog from '../../pages/User';
import Snackbar from '../Snackbar';

import { authContext } from '../../contexts/AuthContext';

const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
};

const tooltip = {
    tooltip: {
      padding: "10px 15px",
      minWidth: "130px",
      color: "#555555",
      lineHeight: "1.7em",
      background: "#FFFFFF",
      border: "none",
      borderRadius: "3px",
      boxShadow:
        "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
      maxWidth: "200px",
      textAlign: "center",
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
      fontSize: "0.875em",
      fontStyle: "normal",
      fontWeight: "400",
      textShadow: "none",
      textTransform: "none",
      letterSpacing: "normal",
      wordBreak: "normal",
      wordSpacing: "normal",
      wordWrap: "normal",
      whiteSpace: "normal",
      lineBreak: "auto"
    }
  };

const styles = theme => ({
    list: {
      ...defaultFont,
      fontSize: "14px",
      margin: 0,
      paddingLeft: "0",
      listStyle: "none",
      paddingTop: "0",
      paddingBottom: "0",
      color: "inherit"
    },
    listItem: {
      float: "left",
      color: "inherit",
      position: "relative",
      display: "block",
      width: "auto",
      margin: "0",
      padding: "0",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        "&:after": {
          width: "calc(100% - 30px)",
          content: '""',
          display: "block",
          height: "1px",
          marginLeft: "15px",
          backgroundColor: "#e5e5e5"
        }
      }
    },
    listItemText: {
      padding: "0 !important"
    },
    navLink: {
      color: "inherit",
      position: "relative",
      padding: "0.9375rem",
      fontWeight: "400",
      fontSize: "12px",
      textTransform: "uppercase",
      borderRadius: "3px",
      lineHeight: "20px",
      textDecoration: "none",
      margin: "0px",
      display: "inline-flex",
      "&:hover,&:focus": {
        color: "inherit",
        background: "rgba(200, 200, 200, 0.2)"
      },
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 30px)",
        marginLeft: "15px",
        marginBottom: "8px",
        marginTop: "8px",
        textAlign: "left",
        "& > span:first-child": {
          justifyContent: "flex-start"
        }
      }
    },
    notificationNavLink: {
      color: "inherit",
      padding: "0.9375rem",
      fontWeight: "400",
      fontSize: "12px",
      textTransform: "uppercase",
      lineHeight: "20px",
      textDecoration: "none",
      margin: "0px",
      display: "inline-flex",
      top: "4px"
    },
    registerNavLink: {
      top: "3px",
      position: "relative",
      fontWeight: "400",
      fontSize: "12px",
      textTransform: "uppercase",
      lineHeight: "20px",
      textDecoration: "none",
      margin: "0px",
      display: "inline-flex"
    },
    navLinkActive: {
      color: "inherit",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    icons: {
      width: "20px",
      height: "20px",
      marginRight: "3px"
    },
    socialIcons: {
      position: "relative",
      fontSize: "20px !important",
      marginRight: "4px"
    },
    dropdownLink: {
      "&,&:hover,&:focus": {
        color: "inherit",
        textDecoration: "none",
        display: "block",
        padding: "10px 20px"
      }
    },
    ...tooltip,
    marginRight5: {
      marginRight: "5px"
    }
  });
  
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { auth, dispatch } = useContext(authContext);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const handleClose = () => { setOpenLoginDialog(false); }
  const handleOpen = () => { setOpenLoginDialog(true); }
  const [snackbar, setSnackbar] = useState(false);
  const [info, setInfo] = useState({variant: 'error', message: ''})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);
  const handleLogout = () => {
    setInfo({variant: 'success', message: 'Logout successfully!'})
    setSnackbar(true);
    setAnchorEl(null);
    setTimeout(() => {
      dispatch({type: 'LOGOUT'})
    }, 800);
  }
  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <ListItemText primary='under construction!'></ListItemText>
      </ListItem> */}
      <ListItem className={classes.listItem}>
          <Button
            className={classes.navLink}
            aria-describedby="popper"
            onClick={auth.isAuthenticated ? handleClick : handleOpen}
          >
          <AccountCircle />
          </Button>
      </ListItem>
      <UserLoginDialog open={openLoginDialog} handleClose={handleClose}/>
      <Popover open={openPopper} anchorEl={anchorEl} id="popper"
        onClose={()=> setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          <Paper>
            <List>
              <ListItem button><ListItemText primary="Profile"></ListItemText></ListItem>
              <ListItem button><ListItemText primary="Logout" onClick={() => handleLogout()}></ListItemText></ListItem>
            </List>
          </Paper>
      </Popover>
      <Snackbar open={snackbar} props={info} handleClose={() => setSnackbar(false)}/>
    </List>
  );
}