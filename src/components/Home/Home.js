import React, { Fragment, useState } from 'react';
import Caraousel from "../Caraousel/Caraousel";
import CardContainer from "../Allresturants/CardContainer";
import FoodNavbar from "../FilterBar/FoodNavbar";


function Home() {
    const [filter, setFilter] = useState('RELEVANCE');
    return (
        <Fragment>
            <Caraousel />
            <FoodNavbar handlefilter={setFilter} />
            <CardContainer filter={filter} />
        </Fragment>
    )
}

export default Home