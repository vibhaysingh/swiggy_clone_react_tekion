import React, { createContext, useState } from 'react';
export const RestaurantDishContext = createContext();
export const DataProvider = ({ children }) => {
    const [restaurantDishesInfo, setRestaurantDishesInfo] = useState(null);

    return (
        <RestaurantDishContext.Provider value={{ restaurantDishesInfo, setRestaurantDishesInfo }}>
            {children}
        </RestaurantDishContext.Provider>
    );
};