import React, { useEffect } from 'react';
import { swiggy_api_URL } from "../constant";
import styles from "./CardContainer.module.css";
import FoodCard from './FoodCard';



export default function CardContainer() {

  useEffect(() => {
    const getData = async () => {
      let rawData = await fetch(swiggy_api_URL);
      let data = await rawData.json();
      console.log(data);
    }
    getData();
  }, []);

  let FoodCards=[];

  for(let i=0;i<16;i++){
    FoodCards.push(<FoodCard/>);
  }

  return (
    <div className={styles.card_container}>
      {FoodCards.map((card)=>card)}
    </div>
  )
}
