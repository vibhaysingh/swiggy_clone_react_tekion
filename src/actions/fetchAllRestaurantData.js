import { ERROR, SUCCESS } from "../constants/responseStatus";
import axios from "axios";
import { responseData } from "../constants/restaurantData";

function getRestaurantData() {
  return Promise.resolve(responseData);
}

export async function fetchAllRestaurantData(offset, filter) {
  const swiggyApiLink= `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&offset=${offset}&sortBy=${filter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`)}`;
  try {
    // let response = await axios.get(swiggyApiLink); //axios

    // if (response.status !== 200) {
    //   throw new Error(response.statusText);
    // }
    let response = await getRestaurantData();
    return { status: SUCCESS, data: response };
  } catch (error) {
    return { status: ERROR, error: error.message };
  }
}
