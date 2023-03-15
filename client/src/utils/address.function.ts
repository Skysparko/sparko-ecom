import { instance } from "./functions";

export const addAddress = (
  country: string,
  state: string,
  countryCode: string,
  fullName: string,
  mobile: string,
  pinCode: string,
  address1: string,
  address2: string,
  landmark: string,
  city: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  defaultAddress: string
) => {
  setIsLoading(true);
  const mobileNumber = countryCode + mobile;

  instance
    .post("/address/create-address", {
      country,
      state,
      mobileNumber,
      fullName,
      defaultAddress,
      pinCode,
      address1,
      address2,
      landmark,
      city,
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        location.href = "http://localhost:3000/user/addresses";
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};
