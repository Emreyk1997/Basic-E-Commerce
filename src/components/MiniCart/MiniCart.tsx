import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { removeItemFromBasket } from '../../redux/actions/index';
import CartItem from './CartItem/CartItem';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './MiniCart.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);


function MiniCart(props: any) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const handleLoadingOpen = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleLoadingClose = () => {
    setLoading(false);
  };
  return (
    <div>
      <div className={props.fullScreen ? 'cart-dropdownFull' : 'cart-dropdown'}>
        <div style={{ marginLeft: 'auto', marginTop: -15 }}>
          <IconButton onClick={() => props.handleCartClose()}>
            <ClearIcon />
          </IconButton>
        </div>

        {props.fullScreen &&
        props.CartReducer &&
        props.CartReducer.length > 0 ? (
          <p style={{ fontSize: 22, fontWeight: 'bold' }}>Sepetim</p>
        ) : null}
        <div className={props.fullScreen ? 'cart-items-full' : 'cart-items'}>
          {props.CartReducer && props.CartReducer.length > 0 ? (
            props.CartReducer.map((item: any, index: number) => {
              return (
                <CartItem
                  quantity={item.quantity}
                  basketItem={item.basketItem}
                  fullScreen={props.fullScreen}
                  id={item.id}
                  handleLoadingOpen={handleLoadingOpen}
                />
              );
            })
          ) : (
            <p style={{ color: 'black' }}>Sepet Boş</p>
          )}
        </div>
        {props.CartReducer && props.CartReducer.length > 0 ? (
          <div className="button">
            <Button
              variant="contained"
              color="secondary"
              size={'large'}
              className={'buttonStyle'}
            >
              Satın Al
            </Button>
          </div>
        ) : null}
      </div>
      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={() => handleLoadingClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
