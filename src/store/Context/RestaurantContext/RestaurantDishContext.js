import React, { createContext, useState } from 'react';
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [restaurantDishesInfo, setRestaurantDishesInfo] = useState(null);

    return (
        <DataContext.Provider value={{ restaurantDishesInfo, setRestaurantDishesInfo }}>
            {children}
        </DataContext.Provider>
    );
};