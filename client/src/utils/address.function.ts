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
  const mobileNumber = `${countryCode}-${mobile}`;

  instance
    .post("/address/add", {
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

export const editAddress = (
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
  defaultAddress: string,
  id: string
) => {
  setIsLoading(true);
  const mobileNumber = `${countryCode}-${mobile}`;

  instance
    .put(`/address/edit/${id}`, {
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
interface countryType {
  id: Number;
  name: String;
  iso2: String;
}

export const getCountriesList = (
  setCountriesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >
) => {
  instance
    .get("http://localhost:8080/api/v1/address/countries")
    .then((response) => {
      // console.log(response.data);
      setCountriesList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStatesList = (
  setStatesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >,
  countrySymbol: string
) => {
  instance
    .get(`http://localhost:8080/api/v1/address/states/${countrySymbol}`)
    .then((response) => {
      setStatesList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCountryPhoneCode = (
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>,
  countrySymbol: string
) => {
  instance
    .get(`http://localhost:8080/api/v1/address/countries/${countrySymbol}`)
    .then((response) => {
      setCountryPhoneCode(`+${response.data.phonecode}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleCountryChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  countriesList: countryType[] | undefined,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setCountrySymbol: React.Dispatch<React.SetStateAction<string>>,
  setStatesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >,
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>
) => {
  const country = countriesList?.find((item) => {
    if (item.name === e.target.value) {
      return item;
    }
  });
  const countrySymbol = `${country?.iso2}`;
  setCountry(e.target.value);
  setCountrySymbol(countrySymbol);
  getStatesList(setStatesList, countrySymbol);
  getCountryPhoneCode(setCountryPhoneCode, countrySymbol);
};

export const getCitiesNamesList = (
  stateSymbol: string,
  countrySymbol: string,
  setCitiesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let cityArray = [""];
  instance
    .get(
      `http://localhost:8080/api/v1/address/cities/${stateSymbol}/${countrySymbol}`
    )
    .then((response) => {
      response.data.forEach((element: { name: string }) => {
        cityArray.push(element.name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  setCitiesList(cityArray);
};

export const handleStateChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  statesList: countryType[] | undefined,
  setStateSymbol: React.Dispatch<React.SetStateAction<string>>,
  countrySymbol: string,
  setCitiesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState(e.target.value);
  const StateC = statesList?.find((item) => {
    if (item.name === e.target.value) {
      return item;
    }
  });
  const stateSymbol = `${StateC?.iso2}`;
  setStateSymbol(stateSymbol);
  getCitiesNamesList(stateSymbol, countrySymbol, setCitiesList);
};

export const deleteAddress = (id: string) => {
  instance
    .delete(`http://localhost:8080/api/v1/address/delete/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const setAddressDefault = (id: string) => {
  instance
    .get(`http://localhost:8080/api/v1/address/default/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchUserAddress = async () => {
  try {
    const res = await instance.get("http://localhost:8080/api/v1/address/");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSpecificAddress = (
  id: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>,
  setFullName: React.Dispatch<React.SetStateAction<string>>,
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>,
  setPinCode: React.Dispatch<React.SetStateAction<string>>,
  setAddress1: React.Dispatch<React.SetStateAction<string>>,
  setAddress2: React.Dispatch<React.SetStateAction<string>>,
  setLandmark: React.Dispatch<React.SetStateAction<string>>,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setDefaultAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  instance
    .get(`http://localhost:8080/api/v1/address/${id}`)
    .then((response) => {
      const mobile = response.data.mobileNumber.split("-");
      setCountry(response.data.country);
      setCity(response.data.city);
      setFullName(response.data.fullName);
      setLandmark(response.data.landmark);
      setAddress1(response.data.address1);
      setAddress2(response.data.address2);
      setCountryPhoneCode(mobile[0]);
      setMobileNumber(mobile[1]);
      setPinCode(response.data.pinCode);
      setState(response.data.state);

      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
