import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { IMG_CDN_URL } from "../constant";
import styles from "./CardContainer.module.css";
import CardSkeleton from './CardSkeleton';
import FoodCard from './FoodCard';



export default function CardContainer(props) {

  console.log(props.filter);
  const [foodCards, setFoodCads] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const swiggyApiLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&offset=${offset}&sortBy=${props.filter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`;





  const getData = async () => {
    try {
      let rawData = await fetch(swiggyApiLink);
      let data = await rawData.json();
      if (data.length === 0) {
        setHasMore(false);
      }
      else {
        setFoodCads((foodCards) => [...foodCards, ...data?.data?.cards]);
        console.log(data);
        setOffset((prevOffset) => prevOffset + 15);
      }
    } catch (e) {
      console.log(e)
    }
  }

 

  useEffect(() => {
    getData();
  }, []);


  return (

    <InfiniteScroll
      dataLength={foodCards.length}
      next={getData}
      hasMore={hasMore}
      loader={<CardSkeleton count={4} />}

    >
      <div className={styles.card_container}>
        {
          foodCards.length ?
            (foodCards.map((card) =>
              <FoodCard
                imgUrl={`${IMG_CDN_URL}${card.data.data.cloudinaryImageId}`}
                title={card.data.data.name}
                cuisines={card.data.data.cuisines}
                key={uuidv4()}
                rating={card.data.data.avgRating}
                deliveryTime={card.data.data.deliveryTime}
                costForTwo={card.data.data.costForTwoString}
                offers={card.data.data.aggregatedDiscountInfo?.descriptionList[0].meta}

              />)) : (<CardSkeleton count={16} />)
        }
        {/* {foodCards.length ? (<CardSkeleton count={4} />):(<div></div>)} */}
      </div>
    </InfiniteScroll>
  )
}
