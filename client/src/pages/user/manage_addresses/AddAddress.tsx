import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import { instance } from "../../../utils/functions";
import axios from "axios";
import { addAddress } from "../../../utils/address.function";
import { Hint } from "react-autocomplete-hint";
import { IHintOption } from "react-autocomplete-hint/dist/src/IHintOption";

interface countryType {
  country_name: String;
  country_short_name: String;
  country_phone_code: Number;
}

export default function AddAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [countriesList, setCountriesList] = useState<Array<countryType>>();
  const [statesList, setStatesList] = useState<Array<{ state_name: String }>>();
  const [citiesList, setCitiesList] = useState([""]);

  //form States
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("false");

  useEffect(() => {
    instance
      .get("http://localhost:8080/api/v1/address/countries")
      .then((response) => {
        // console.log(response.data);
        setCountriesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    instance
      .get(`http://localhost:8080/api/v1/address/states/${country}`)
      .then((response) => {
        setStatesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 px-5  max-xs:text-sm max-vxs:px-2">
      <h1 className="m-auto text-3xl font-semibold max-xs:text-2xl ">
        Add a new address
      </h1>
      <form
        className=" m-auto flex flex-col gap-5 max-vs:w-[95%] "
        onSubmit={(e) => {
          e.preventDefault();
          addAddress(
            country,
            state,
            countryCode,
            fullName,
            mobile,
            pinCode,
            address1,
            address2,
            landmark,
            city,
            setIsLoading,
            defaultAddress
          );
        }}
      >
        <span className=" flex flex-col">
          <label htmlFor="country">Country/Region</label>
          <select
            name="country"
            id="country"
            className="rounded border border-gray-500 
            p-2 shadow-sm"
            onChange={(e) => {
              setCountry(e.target.value);
              const countryC = countriesList?.find((item) => {
                if (item.country_name === e.target.value) {
                  return item;
                }
              });

              setCountryCode(`+${countryC!.country_phone_code}`);

              instance
                .get(
                  `http://localhost:8080/api/v1/address/states/${e.target.value}`
                )
                .then((response) => {
                  setStatesList(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            value={country}
          >
            {countriesList?.map((item) => (
              <option key={`${item.country_name}`}>{item.country_name}</option>
            ))}
          </select>
        </span>
        <span className="flex flex-col ">
          <label htmlFor="full_name">Full name</label>
          <input
            type="text"
            id="full_name"
            className="rounded border border-gray-500 p-2
            shadow-inner"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="mobile_number">Mobile number</label>
          <span className=" flex gap-1">
            <input
              type="tel"
              name="country_code"
              id="country_code"
              readOnly
              value={countryCode}
              required
              className="w-16 rounded border border-gray-500 p-2
              shadow-inner max-vs:w-14"
            />
            <input
              type="number"
              id="mobile_number"
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="flex-grow rounded border border-gray-500
            p-2 shadow-inner max-vs:w-[90%] max-vs:flex-shrink max-vs:flex-grow-0"
            />
          </span>
        </span>
        <span className="flex flex-col ">
          <label htmlFor="pin_code">Pin code</label>
          <input
            type="number"
            id="pin_code"
            onChange={(e) => setPinCode(e.target.value)}
            required
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="address_part_1">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            id="address_part_1"
            onChange={(e) => setAddress1(e.target.value)}
            required
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="address_part_2">Area, Street, Sector, Village</label>
          <input
            type="text"
            id="address_part_2"
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            onChange={(e) => setLandmark(e.target.value)}
            required
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-sm:grid-rows-2 ">
          <span className="flex flex-col">
            <label htmlFor="town">Town/City</label>
            <Hint options={citiesList} allowTabFill>
              <input
                type="text"
                id="town"
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-[100%] rounded border border-gray-500
              p-2 shadow-inner "
              />
            </Hint>
          </span>
          <span className=" flex flex-col">
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="rounded border border-gray-500 p-[0.610rem]
            shadow-inner"
              defaultValue="--Select state--"
              onChange={async (e) => {
                try {
                  setState(e.target.value);
                  let cityArray = [""];
                  const response = await instance.get(
                    `http://localhost:8080/api/v1/address/cities/${e.target.value}`
                  );
                  response.data.forEach((element: { city_name: string }) => {
                    cityArray.push(element.city_name);
                  });
                  console.log(cityArray);
                  setCitiesList(cityArray);
                } catch (error) {
                  console.log(error);
                }
              }}
              required
            >
              <option>--Select state--</option>
              {statesList?.map((item) => (
                <option key={`${item.state_name}`}>{item.state_name}</option>
              ))}
            </select>
          </span>
        </div>
        <span className="flex gap-2">
          <input
            type="checkbox"
            id="default_address"
            onChange={(e) => setDefaultAddress(`${e.target.checked}`)}
          />
          <label htmlFor="default_address">Make this my default address</label>
        </span>
        <button className="m-auto flex w-44 justify-center rounded bg-sky-800 p-2 text-base text-white">
          {isLoading ? (
            <TailSpin
              height="24"
              width="24"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <>Add address</>
          )}
        </button>
      </form>
    </div>
  );
}
