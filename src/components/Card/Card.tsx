import React from 'react';
import './Card.css';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addItemToBasket } from '../../redux/actions/index';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Card = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleLoadingClose = () => {
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="grow">
        <img src={props.image} alt={props.name} />
      </div>

      <div>
        <h3 className="left">{props.name}</h3>
        <p className="left closeTop">{props.price} TL</p>
        <div className="grow left closeTop">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AddShoppingCartIcon />}
            size={'large'}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                handleLoadingClose();
                setOpen(true);
              }, 500);
              props.addItemToBasket({
                id: props.id,
                name: props.name,
                price: props.price,
                image: props.image,
              });
            }}
          >
            Satın Al
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ürün Sepete Eklendi!"
      />
      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={handleLoadingClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    CartReducer: state.CartReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItemToBasket: (event: any) => dispatch(addItemToBasket(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
