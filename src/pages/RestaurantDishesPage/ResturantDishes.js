import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantData } from "../../actions/fetchResturantData";
import AboutResturant from "../../components/AboutRestaurantDetails/AboutRestaurant/AboutResturant";
import DeliveryTimeInfo from "../../components/AboutRestaurantDetails/DeliveryTimeInfo/DeliveryTimeInfo";
import DishDropdown from "../../components/DishDropdowns/DishDropdown";
import OfferCard from "../../components/OfferCard/OfferCard";
import DishCardSkeleton from "../../components/SkeletonCardLoaders/DishCardSkeleton/DishCardSkeleton";
import { SUCCESS } from "../../constants/responseStatus";
import { getDropdownHeading, getInfo, getOffers } from "../../readers/swiggy";
import { RestaurantDishContext } from "../../store/Context/RestaurantContext/RestaurantDishContext";
import styles from "./ResturantsDishes.module.css";

function ResturantDishes() {
  const { restaurantDishesInfo, setRestaurantDishesInfo } = useContext(
    RestaurantDishContext
  );
  const resturantId = useParams().id;

  const getData = async () => {
    const response = await fetchRestaurantData(resturantId);
    if (response.status === SUCCESS) {
      const data = response.data;
      const offers = getOffers(data);
      const info = getInfo(data);
      const dropdownHeading = getDropdownHeading(data);
      setRestaurantDishesInfo(() => {
        return {
          id: info?.id,
          offers: offers,
          costForTwoMsg: info?.costForTwoMessage,
          deliveryTime: info?.sla?.deliveryTime,
          restaurantName: info?.name,
          avgRating: info?.avgRatingString,
          ratingCount: info?.totalRatingsString,
          cuisines: info?.cuisines,
          area: info?.locality,
          dropdownHeading: dropdownHeading,
          resturantImageId: info?.cloudinaryImageId,
        };
      });
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    if (!restaurantDishesInfo || restaurantDishesInfo.id !== resturantId) {
      getData();
    }
  }, []);

  return restaurantDishesInfo && restaurantDishesInfo.id === resturantId ? (
    <div className={styles.dishesContainer}>
      <AboutResturant
        restaurantName={restaurantDishesInfo.restaurantName}
        avgRating={restaurantDishesInfo.avgRating}
        ratingCount={restaurantDishesInfo.ratingCount}
        cuisines={restaurantDishesInfo.cuisines}
        area={restaurantDishesInfo.area}
      />
      <DeliveryTimeInfo
        costForTwoMsg={restaurantDishesInfo.costForTwoMsg}
        deliveryTime={restaurantDishesInfo.deliveryTime}
      />
      <OfferCard offers={restaurantDishesInfo.offers} />
      <DishDropdown
        dropdownHeading={restaurantDishesInfo.dropdownHeading}
        restaurantName={restaurantDishesInfo.restaurantName}
        area={restaurantDishesInfo.area}
        resturantImageId={restaurantDishesInfo.resturantImageId}
      />
    </div>
  ) : (
    <DishCardSkeleton />
  );
}

export default ResturantDishes;
