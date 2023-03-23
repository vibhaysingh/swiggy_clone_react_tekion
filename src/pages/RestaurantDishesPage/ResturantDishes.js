import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../store/Context/dataContext';
import AboutResturant from '../../components/AboutResturant/AboutResturant';
import DeliveryTimeInfo from '../../components/AboutResturant/DeliveryTimeInfo';
import DishSkeleton from "../../components/SkeletonCardLoaders/DishSkeleton";
import DishDropdown from '../../components/DishDropdown/DishDropdown';
import OfferCard from '../../components/OfferCard/OfferCard';
import styles from './ResturantsDishes.module.css';
import {fetchRestaurantData} from "../../actions/fetchResturantData";
import {SUCCESS} from "../../utils/constants/actionResponseStatus";
function ResturantDishes() {
  const {  restaurantDishesInfo,  setRestaurantDishesInfo } = useContext(DataContext);
  const resturantId = useParams().id;

  const getData = async () => {
     const response = await fetchRestaurantData(resturantId);
     if(response.status===SUCCESS) {
       const data = response.data;
       const offers = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers;
       const info = data?.data?.cards[0]?.card?.card?.info;
       const dropdownHeading = data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
       setRestaurantDishesInfo(() => {
         return {
           id: info?.id,
           offers: offers,
           costForTwoMsg: info?.costForTwoMessage,
           deliveryTime: info?.sla?.deliveryTime,
           resturantName: info?.name,
           avgRating: info?.avgRatingString,
           ratingCount: info?.totalRatingsString,
           cuisines: info?.cuisines,
           area: info?.locality,
           dropdownHeading: dropdownHeading,
           resturantImageId: info?.cloudinaryImageId
         }
       })
     }
  }
  useEffect(() => {
    if (!restaurantDishesInfo || restaurantDishesInfo.id !== resturantId) {
      getData();
    }
  },[])


  return (
    restaurantDishesInfo && restaurantDishesInfo.id === resturantId ? (
      <div className={styles.dishesContainer}>
        <AboutResturant
            resturantName={restaurantDishesInfo.resturantName}
            avgRating={restaurantDishesInfo.avgRating}
            ratingCount={restaurantDishesInfo.ratingCount}
            cuisines={restaurantDishesInfo.cuisines}
            area={restaurantDishesInfo.area}
        />
        <DeliveryTimeInfo
            costForTwoMsg={restaurantDishesInfo.costForTwoMsg}
            deliveryTime={restaurantDishesInfo.deliveryTime}
        />
        <OfferCard
            offers={restaurantDishesInfo.offers}
        />
        <DishDropdown
            dropdownHeading={restaurantDishesInfo.dropdownHeading}
            resturantName={restaurantDishesInfo.resturantName}
            area={restaurantDishesInfo.area}
            resturantImageId={restaurantDishesInfo.resturantImageId}
        />
      </div>) : <DishSkeleton />
  )
}
export default ResturantDishes