import { ERROR, SUCCESS } from "../constants/responseStatus";
import axios from "axios";
import {responseData} from "../constants/data"

function getData() {
  return Promise.resolve(responseData);
}
export async function fetchAllRestaurantData(offset, filter) {
  // const swiggyApiLink = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&offset=${offset}&sortBy=${filter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`;
  try {
    // let response = await axios.get(swiggyApiLink); //axios
    let response = await getData();
    // if (response.status !== 200) {
    //   throw new Error(response.statusText);
    // }
    let data = response;
    return { status: SUCCESS, data: response };
  } catch (error) {
    return { status: ERROR, error: error.message };
  }
}

// https://proxy.cors.sh/
