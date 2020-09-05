import React from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import { removeItemFromBasket } from '../redux/actions/index';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MiniCart from './MiniCart/MiniCart';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      backgroundColor: '#7f7d81',
      padding: 5,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      marginLeft: '1%',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    miniMenuTexts: {
      display: 'none',
      fontSize: 15,
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    miniMenuTextsDiv: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 4,
      paddingLeft: '5%'
    }
  }),
);

function PrimarySearchAppBar(props: any) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = React.useState(false);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleCartClose = () => {
    setOpenCart(!openCart);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <div className={classes.sectionMobile}>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      </Menu>
    </div>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <div className={classes.sectionMobile}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleCartClose();
          }}
        >
          <IconButton
            aria-label={
              'show ' + props.CartReducer.length + ' items in the basket'
            }
            color="inherit"
          >
            <Badge badgeContent={props.CartReducer.length} color="secondary">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Sepet</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <IconButton aria-label="show men's sections" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <p>Erkek</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <IconButton aria-label="show women's section" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <p>Kadın</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <IconButton aria-label="show children's section" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <p>Çocuk</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <IconButton aria-label="show accesroies" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <p>Aksesuar</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Bildirimler</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profil</p>
        </MenuItem>
      </Menu>
      {openCart ? (
        <MiniCart fullScreen={true} handleCartClose={handleCartClose} />
      ) : null}
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        style={{
          backgroundColor: '#9f9ca1',
          minHeight: 100,
          justifyContent: 'center',
        }}
        position="static"
      >
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Basic E-Commerce
            </Typography>
          <div className={classes.miniMenuTextsDiv}>
            <Link href="#" color="inherit">
              <Typography className={classes.miniMenuTexts} variant="h6" noWrap>
                Erkek
              </Typography>
            </Link>
            <Link href="#" color="inherit">
                <Typography className={classes.miniMenuTexts} variant="h6" noWrap>
                  Kadın
                </Typography>
              </Link>
              <Link href="#" color="inherit">
                <Typography className={classes.miniMenuTexts} variant="h6" noWrap>
                  Çocuk
                </Typography>
              </Link>
              <Link href="#" color="inherit">
                <Typography className={classes.miniMenuTexts} variant="h6" noWrap>
                  Aksesuar
                </Typography>
              </Link>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              onClick={() => handleCartClose()}
              aria-label={
                'show ' + props.CartReducer.length + ' items in the basket'
              }
              color="inherit"
            >
              <Badge badgeContent={props.CartReducer.length} color="secondary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            {openCart ? <MiniCart handleCartClose={handleCartClose} /> : null}
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Ara..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    CartReducer: state.CartReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeItemFromBasket: (event: any) => dispatch(removeItemFromBasket(event)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimarySearchAppBar);
