import _ from "lodash";
export const getOffers = _.property("data.cards[1].card.card.gridElements.infoWithStyle.offers");
export const getInfo = _.property("data.cards[0].card.card.info");
export const getDropdownHeading = _.property("data.cards[2].groupedCard.cardGroupMap.REGULAR.cards");

