import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import FilterListIcon from '@material-ui/icons/FilterList';
import filterJSON from '../../../filterJSON.js';
import { changeFilters } from '../../../redux/actions/index';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Filter.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      width: '100%',
      maxWidth: '25%',
      backgroundColor: '#e9e8ed',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        paddingLeft: 30,
      },
    },
    menuText: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
    smallDiv: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 70,
        maxHeight: 70,
        minWidth: '100%',
        backgroundColor: '#e9e8ed',
      },
    },
    fullFilter: {
      display: 'none',
      backgroundColor: '#e9e8ed',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        position: 'absolute',
        marginTop: 69,
        zIndex: 1,
        paddingBottom: 25,
      },
    },
    listBigItemStyle: {
      marginTop: 50,
      paddingLeft: 15,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
    },
    listBigItemStyleFirst: {
      marginTop: 22,
      paddingLeft: 15,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
    },
    text: {
      color: 'black',
      fontSize: 20,
    },
    subText: {
      fontSize: 18,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function CheckboxList(props: any) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<Array<Object>>([]);
  const [filterStatus, changeFilterStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // Create an open array later
  const [open, setOpen] = React.useState<Array<number>>([]);

  const handleToggle = (value: object) => () => {
    setLoading(true);
    setTimeout(() => {
      handleLoadingClose();
    }, 500);
    const currentIndex = checked.indexOf(JSON.stringify(value));
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(JSON.stringify(value));
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.changeFilters(newChecked);
    setChecked(newChecked);
  };

  //   const handleClick = () => {
  //     setOpen(!open);
  //   };

  const handleOpen = (value: number) => {
    const currentIndex = open.indexOf(value);
    const newOpened = [...open];

    if (currentIndex === -1) {
      newOpened.push(value);
    } else {
      newOpened.splice(currentIndex, 1);
    }
    setOpen(newOpened);
  };
  const handleLoadingClose = () => {
    setLoading(false);
  };

  const renderFilters = (
    <div>
      {filterJSON.filter.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <div className={'mainDiv'}>
            <ListItem
              className={
                index === 0
                  ? classes.listBigItemStyleFirst
                  : classes.listBigItemStyle
              }
              button
              onClick={() => handleOpen(index)}
            >
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText
                primary={value.filterName.name}
                classes={{ primary: classes.text }}
              />
              {open.indexOf(index) === -1 ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse
              in={open.indexOf(index) === -1 ? false : true}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding style={{ paddingLeft: 15 }}>
                {value.filters.map((insideValue, insideIndex) => {
                  return (
                    <ListItem
                      key={`${insideValue.key}${insideIndex}`}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggle({
                        key: insideValue.key,
                        filterNameKey: value.filterName.key,
                      })}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            checked.indexOf(
                              JSON.stringify({
                                key: insideValue.key,
                                filterNameKey: value.filterName.key,
                              }),
                            ) !== -1
                          }
                          color="default"
                          tabIndex={-1}
                          disableRipple
                          size="medium"
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${insideValue.name}`}
                        classes={{ primary: classes.subText }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <List className={classes.root}>
        <p className="filterText">Filtrele</p>
        {renderFilters}
      </List>
      <div className={classes.grow}>
        <div className={classes.smallDiv}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => changeFilterStatus(!filterStatus)}
          >
            <MenuIcon />
          </IconButton>
          <p className={classes.menuText}>Filtrele</p>
        </div>
        {filterStatus ? (
          <List className={classes.fullFilter}>{renderFilters}</List>
        ) : null}
        <Backdrop
          className={classes.backdrop}
          open={loading}
          onClick={handleLoadingClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    FilterReducer: state.FilterReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeFilters: (event: any) => dispatch(changeFilters(event)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckboxList);
