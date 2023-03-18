import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dishesInfo, setdishesInfo] = useState(null);

    return (
        <DataContext.Provider value={{ dishesInfo, setdishesInfo }}>
            {children}
        </DataContext.Provider>
    );
};