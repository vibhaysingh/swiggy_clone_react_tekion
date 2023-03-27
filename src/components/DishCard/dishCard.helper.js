import _ from "lodash";
import fallBackImage from '../../assets/images/Placeholder.png';
import { dishImageURL } from '../../constants/constant';

export const getDishDetails = (dishInfo, cartItems) => {
    return {
        dishPrice: Math.max(dishInfo.price ? dishInfo.price / 100 : 0, dishInfo.defaultPrice ? dishInfo.defaultPrice / 100 : 0),
        isVeg: dishInfo.isVeg,
        itemCount: _.find(cartItems, (item) => item.id === dishInfo.id)?.quantity,
        dishImageLink: dishInfo.imageId ? (`${dishImageURL}${dishInfo.imageId}`) : fallBackImage,

    }
}