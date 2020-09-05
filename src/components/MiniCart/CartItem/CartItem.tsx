import React from 'react';
import './CartItem.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { removeItemFromBasket } from '../../../redux/actions/index';

const CartItem = (props: any) => (
  <div className={props.fullScreen ? 'cart-item-full' : 'cart-item'}>
    <img
      className={props.fullScreen ? 'imgItemFull' : 'imgItem'}
      src={props.basketItem.image}
    />
    <div className={props.fullScreen ? 'item-full' : 'item-details'}>
      <span className={props.fullScreen ? 'nameFull' : 'name'}>
        {props.basketItem.name}
      </span>
      <span className={props.fullScreen ? 'priceFull' : 'price'}>
        {props.quantity} x {props.basketItem.price} TL
      </span>
    </div>
    <div
      style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
    >
      <IconButton
        onClick={() => {
          props.handleLoadingOpen();
          props.removeItemFromBasket(props.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  </div>
);
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
