import { ERROR, SUCCESS } from "../constants/responseStatus";
import axios from "axios";

export async function fetchRestaurantData(resturantId) {
  const restaurantDataLink = `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9580044&lng=77.7089009&restaurantId=${resturantId}&submitAction=ENTER`;
  try {
    let response = await axios.get(restaurantDataLink);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    let data = response;
    return { status: SUCCESS, data: data.data };
  } catch (error) {
    return { status: ERROR, error: error.message };
  }
}
