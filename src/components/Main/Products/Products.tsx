import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import './Products.css';
import Card from '../../Card/Card';
import productsJSON from '../../../productsJSON';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 30,
      minWidth: '75%',
      backgroundColor: '#e9e8ed',
      // backgroundColor: '#c4c1c6',
      [theme.breakpoints.down('sm')]: {
        paddingTop: 75,
        minWidth: '100%',
      },
    },
  }),
);
function Products(props: any) {
  const classes = useStyles();
  let data = productsJSON;
  if (props.FilterReducer.length > 0) {
    let isGender = false;
    let isColor = false;
    let isSize = false;
    let isPrice = false;
    for (let index0 = 0; index0 < props.FilterReducer.length; index0++) {
      if (JSON.parse(props.FilterReducer[index0]).filterNameKey === 'gender') {
        isGender = true;
      }
      if (JSON.parse(props.FilterReducer[index0]).filterNameKey === 'size') {
        isSize = true;
      }
      if (JSON.parse(props.FilterReducer[index0]).filterNameKey === 'color') {
        isColor = true;
      }
      if (JSON.parse(props.FilterReducer[index0]).filterNameKey === 'price') {
        isPrice = true;
      }
    }
    let tempData = data.slice();
    if (isGender) {
      const tempDataGender = tempData.filter((item) => {
        for (let index = 0; index < props.FilterReducer.length; index++) {
          if (
            JSON.parse(props.FilterReducer[index]).filterNameKey === 'gender'
          ) {
            if (
              item.gender.indexOf(
                JSON.parse(props.FilterReducer[index]).key,
              ) !== -1
            ) {
              return item;
            }
          }
        }
      });
      tempData = tempDataGender;
    }
    if (isSize) {
      const tempDataSize = tempData.filter((item) => {
        for (let index = 0; index < props.FilterReducer.length; index++) {
          if (JSON.parse(props.FilterReducer[index]).filterNameKey === 'size') {
            if (
              item.availableSizes.indexOf(
                JSON.parse(props.FilterReducer[index]).key,
              ) !== -1
            ) {
              return item;
            }
          }
        }
      });
      tempData = tempDataSize;
    }
    if (isColor) {
      const tempDataColor = tempData.filter((item) => {
        for (let index = 0; index < props.FilterReducer.length; index++) {
          if (
            JSON.parse(props.FilterReducer[index]).filterNameKey === 'color'
          ) {
            if (
              item.colors.indexOf(
                JSON.parse(props.FilterReducer[index]).key,
              ) !== -1
            ) {
              return item;
            }
          }
        }
      });
      tempData = tempDataColor;
    }
    if (isPrice) {
      const tempDataPrice = tempData.filter((item) => {
        for (let index = 0; index < props.FilterReducer.length; index++) {
          if (
            JSON.parse(props.FilterReducer[index]).filterNameKey === 'price'
          ) {
            if (
              item.price >=
                JSON.parse(JSON.parse(props.FilterReducer[index]).key).min &&
              item.price <=
                JSON.parse(JSON.parse(props.FilterReducer[index]).key).max
            ) {
              return item;
            }
          }
        }
      });
      tempData = tempDataPrice;
    }
    data = tempData;
  }

  return (
    <div className={classes.root}>
      <div className={'exampleDiv'}>
        <p className="p">Ürünler</p>
        <div className="exampleDivIcons">
          <Button
            variant="contained"
            disabled
            color="secondary"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Sırala...
          </Button>
          <FormatListBulletedIcon />
          <AppsIcon />
        </div>
      </div>
      <div className={'cardsDiv'}>
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
      {data.length === 0 ? (
        <div className="errorP">
          <p>Seçtiğiniz kriterlere uygun ürün bulunamamıştır.</p>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    FilterReducer: state.FilterReducer,
  };
};
export default connect(mapStateToProps)(Products);
