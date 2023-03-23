import React, { Fragment, useState } from 'react';
import Caraousel from "../../components/Caraousel/Caraousel";
import AllRestaurantsContainer from "../../components/AllRestaurantsContainer/AllRestaurantsContainer";
import RestaurantsFilterBar from "../../components/RestaurantsFilterBar/RestaurantsFilterBar";
function Homepage() {
    const [filter, setFilter] = useState('RELEVANCE');

    return (
        <Fragment>
            <Caraousel />
            <RestaurantsFilterBar handlefilter={setFilter} />
            <AllRestaurantsContainer filter={filter} />
        </Fragment>
    )
}
export default Homepage