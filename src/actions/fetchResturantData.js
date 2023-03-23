import {ERROR, SUCCESS} from "../constants/responseStatus";

export async function fetchRestaurantData(resturantId){
    const restaurantDataLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9580044&lng=77.7089009&restaurantId=${resturantId}&submitAction=ENTER`;

    try{
        let response = await fetch(restaurantDataLink);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        let data = await response.json();
        return {status:SUCCESS,data};
    }catch (error) {
        return {status:ERROR,error:error.message}
    }
}