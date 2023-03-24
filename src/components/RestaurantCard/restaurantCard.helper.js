export const getCuisineString = (cuisines) => {
  let cuisinesString = "";
  for (let cuisine of cuisines) {
    cuisinesString = cuisinesString + cuisine + ", ";
  }
  return cuisinesString.slice(0, -2);
};

export const ratingStarStyle = {
  fontSize: "14px",
  color: "#fff",
};
