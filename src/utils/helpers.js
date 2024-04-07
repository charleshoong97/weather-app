export const getDisplayCelcius = (temp) => {
  return temp ? temp.toString().split(".")[0] : "";
};

export const getLocationDisplay = (location) => {
  return (
    location?.name +
    ", " +
    (location?.state ? location.state + ", " : "") +
    location?.country
  );
};
