import _ from "lodash";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllRestaurantData } from "../../actions/fetchAllRestaurantData";
import { IMG_CDN_URL } from "../../constants/constant";
import { SUCCESS } from "../../constants/responseStatus";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import RestaurantCardSkeleton from "../SkeletonCardLoaders/RestaurantCardSkeleton/RestaurantCardSkeleton";
import styles from "./AllRestaurantsContainer.module.css";

export default function AllRestaurantsContainer(props) {
  const { filter } = props;
  const [restuarantCardsData, setRestuarantCardsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const getData = async () => {
    const response = await fetchAllRestaurantData(offset, filter);
    if (response?.status === SUCCESS) {
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setRestuarantCardsData((restuarantCardsData) => [
          ...restuarantCardsData,
          ...response?.data?.data?.cards,
        ]);
        setOffset((prevOffset) => prevOffset + 15);
      }
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    setRestuarantCardsData([]);
    getData();
  }, [filter]);

  return (
    <InfiniteScroll
      dataLength={restuarantCardsData.length}
      next={getData}
      hasMore={hasMore}
      loader={<RestaurantCardSkeleton count={4} />}
    >
      <div className={styles.allResturantContainer}>
        {restuarantCardsData.length ? (
          _.map(restuarantCardsData, (card, index) => {
            const {
              data: {
                data: {
                  cloudinaryImageId,
                  name,
                  cuisines,
                  id,
                  avgRating,
                  deliveryTime,
                  costForTwoString,
                  aggregatedDiscountInfo,
                },
              },
            } = card;
            return (
              <RestaurantCard
                imgUrl={`${IMG_CDN_URL}${cloudinaryImageId}`}
                title={name}
                cuisines={cuisines}
                key={index}
                id={id}
                rating={avgRating}
                deliveryTime={deliveryTime}
                costForTwo={costForTwoString}
                offers={aggregatedDiscountInfo?.descriptionList?.[0]?.meta}
              />
            );
          })
        ) : (
          <RestaurantCardSkeleton count={16} />
        )}
      </div>
    </InfiniteScroll>
  );
}
