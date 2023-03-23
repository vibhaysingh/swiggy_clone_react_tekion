import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IMG_CDN_URL } from "../../constants/constant";
import RestaurantCardSkeleton from '../SkeletonCardLoaders/RestaurantCardSkeleton/RestaurantCardSkeleton';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import {fetchAllRestaurantData} from "../../actions/fetchAllRestaurantData";
import styles from "./AllRestaurantsContainer.module.css";
import {SUCCESS} from "../../constants/responseStatus";
export default function AllRestaurantsContainer(props) {
  const {filter} = props;
  const [restuarantCardsData, setRestuarantCardsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const getData = async () => {
     const response = await fetchAllRestaurantData(offset,filter);
     if(response?.status===SUCCESS) {
       if (response.data.length === 0) {
         setHasMore(false);
       } else {
         setRestuarantCardsData((restuarantCardsData) => [...restuarantCardsData, ...response?.data?.data?.cards]);
         setOffset((prevOffset) => prevOffset + 15);
       }
     }
     else{
       console.log(response);
     }
  }
  useEffect(()=>{
    setRestuarantCardsData([]);
    getData();
    console.log("filter-useEffect")
  },[filter])

  return (

    <InfiniteScroll
      dataLength={restuarantCardsData.length}
      next={getData}
      hasMore={hasMore}
      loader={<RestaurantCardSkeleton count={4} />}
    >
      <div className={styles.allResturantContainer}>
        {
          restuarantCardsData.length ?
            (restuarantCardsData.map((card, index) =>
              <RestaurantCard
                imgUrl={`${IMG_CDN_URL}${card?.data?.data?.cloudinaryImageId}`}
                title={card?.data?.data?.name}
                cuisines={card?.data?.data?.cuisines}
                key={index}
                id={card?.data?.data?.id}
                rating={card?.data?.data?.avgRating}
                deliveryTime={card?.data?.data?.deliveryTime}
                costForTwo={card?.data?.data?.costForTwoString}
                offers={card?.data?.data?.aggregatedDiscountInfo?.descriptionList[0]?.meta}
              />
            )) : (<RestaurantCardSkeleton count={16} />)
        }
      </div>
    </InfiniteScroll>
  )
}
