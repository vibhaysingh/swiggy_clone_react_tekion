import {ERROR, SUCCESS} from "../utils/constants/actionResponseStatus";

export async function fetchRestaurantData(offset,filter){
    const swiggyApiLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&offset=${offset}&sortBy=${filter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`;
    try{
    let response = await fetch(swiggyApiLink);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    let data = await response.json();
    return {status:SUCCESS,data};
    }catch (error) {
        return {status:ERROR,error:error.message}
    }
}

