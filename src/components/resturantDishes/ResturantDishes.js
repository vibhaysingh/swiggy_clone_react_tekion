import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Store/Context/dataContext';
import AboutResturant from '../AboutResturant/AboutResturant';
import DeliveryTimeInfo from '../AboutResturant/DeliveryTimeInfo';
import DishSkeleton from "../CardLoader/DishSkeleton";
import DishDropdown from '../DishDropdown/DishDropdown';
import OfferCard from '../OfferCard/OfferCard';
import styles from './ResturantsDishes.module.css';

function ResturantDishes() {
  const { dishesInfo, setdishesInfo } = useContext(DataContext);
  const resturantId = useParams().id;
  const menuLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9580044&lng=77.7089009&restaurantId=${resturantId}&submitAction=ENTER`;



  const getData = async () => {
    try {
      let rawData = await fetch(menuLink);
      let data = await rawData.json();
      const offers = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers;
      const info = data?.data?.cards[0]?.card?.card?.info;
      const dropdownHeading = data?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards


      setdishesInfo(() => {
        return {
          id: info?.id,
          offers: offers,
          costForTwoMsg: info?.costForTwoMessage,
          deliveryTime: info.sla.deliveryTime,
          resturantName: info.name,
          avgRating: info?.avgRatingString,
          ratingCount: info?.totalRatingsString,
          cuisines: info.cuisines,
          area: info.locality,
          dropdownHeading: dropdownHeading,
          resturantImageId: info?.cloudinaryImageId
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (!dishesInfo || dishesInfo.id !== resturantId)
      getData();

  }, [])


  return (
    (dishesInfo && dishesInfo.id === resturantId) ? (
      <div className={styles.dishes_container}>
        <AboutResturant resturantName={dishesInfo.resturantName} avgRating={dishesInfo.avgRating} ratingCount={dishesInfo.ratingCount} cuisines={dishesInfo.cuisines} area={dishesInfo.area} />
        <DeliveryTimeInfo costForTwoMsg={dishesInfo.costForTwoMsg} deliveryTime={dishesInfo.deliveryTime} />
        <OfferCard offers={dishesInfo.offers} />
        <DishDropdown dropdownHeading={dishesInfo.dropdownHeading} resturantName={dishesInfo.resturantName} area={dishesInfo.area} resturantImageId={dishesInfo.resturantImageId} />
      </div>) :
      (<DishSkeleton />)
  )
}

export default ResturantDishes