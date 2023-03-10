import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AboutResturant from '../AboutResturant/AboutResturant';
import DeliveryTimeInfo from '../AboutResturant/DeliveryTimeInfo';
import DishDropdown from '../DishDropdown/DishDropdown';
import OfferCard from '../OfferCard/OfferCard';
import styles from './ResturantsDishes.module.css';



function ResturantDishes() {


  const [dishesInfo, setdishesInfo] = useState({});
  const resturantId = useParams().id;
  const menuLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/v4/full?lat=21.1702401&lng=72.83106070000001&menuId=${resturantId}`;

  const getData = async () => {
    try {
      let rawData = await fetch(menuLink);
      let data = await rawData.json();
      setdishesInfo(() => {
        return {
          offers: data.data.offerMeta,
          costForTwoMsg: data.data.costForTwoMsg,
          deliveryTime: '32 MINS',
          resturantName: data.data.name,
          avgRating: data.data.avgRatingString,
          ratingCount: data.data.totalRatingsString,
          cuisines: data.data.cuisines,
          area: data.data.area,
          menu: data.data.menu.items,
          dropdownHeading: data.data.menu.widgets
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getData();

  }, [])


  console.log(dishesInfo);

  return (
    <div className={styles.dishes_container}>
      <AboutResturant resturantName={dishesInfo.resturantName} avgRating={dishesInfo.avgRating} ratingCount={dishesInfo.ratingCount} cuisines={dishesInfo.cuisines} area={dishesInfo.area} />
      <DeliveryTimeInfo costForTwoMsg={dishesInfo.costForTwoMsg} deliveryTime={dishesInfo.deliveryTime} />
      <OfferCard offers={dishesInfo.offers} />
      <DishDropdown dropdownHeading={dishesInfo.dropdownHeading} menu={dishesInfo.menu} />
    </div>
  )
}

export default ResturantDishes