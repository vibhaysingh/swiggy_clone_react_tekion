import React, { Fragment, useState } from 'react';
import Caraousel from "../../components/Caraousel/Caraousel";
import CardContainer from "../../components/Allresturants/CardContainer";
import RestaurantsFilterBar from "../../components/RestaurantsFilterBar/RestaurantsFilterBar";
function Home() {
    const [filter, setFilter] = useState('RELEVANCE');
    return (
        <Fragment>
            <Caraousel />
            <RestaurantsFilterBar handlefilter={setFilter} />
            <CardContainer filter={filter} />
        </Fragment>
    )
}
export default Home