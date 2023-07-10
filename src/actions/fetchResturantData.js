import { ERROR, SUCCESS } from "../constants/responseStatus";
import axios from "axios";

export async function fetchRestaurantData(resturantId) {
  const restaurantDataLink = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9580044&lng=77.7089009&restaurantId=${resturantId}&submitAction=ENTER`)}`;
  try {
    console.log("hello ")
    let response = await axios.get(restaurantDataLink);
    console.log("respnse ",response)
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return { status: SUCCESS, data: JSON.parse(response.data.contents) };
  } catch (error) {
    return { status: ERROR, error: error.message };
  }
}
