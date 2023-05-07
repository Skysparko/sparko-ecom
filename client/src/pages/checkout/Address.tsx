import React, { SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressType, getAllAddresses } from "../../redux/address.slice";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  deleteAddress,
  setAddressDefault,
} from "../../utils/address.functions";

type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Address(props: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //getting user from redux store
  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
        address: string;
      };
    }) => state.user
  );
  // getting addresses from redux store
  const addressesState = useSelector(
    (state: { address: { value: Array<addressType>; loading: boolean } }) =>
      state.address
  );
  const { value: addresses, loading } = addressesState ?? {};
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [showOtherAddress, setShowOtherAddress] = React.useState(false);
  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllAddresses());
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold ">Your Addresses</h1>
      <section className="flex gap-5">
        {/* if the user address is in the address list then that address will be added to the card  */}

        <input
          type="radio"
          name="address"
          className="cursor-pointer"
          id="AutoAddress"
          defaultChecked
        />
        <label htmlFor="AutoAddress" className="w-full cursor-pointer">
          {addresses.map(
            (item, i) =>
              item._id === user.address && (
                <div
                  key={i}
                  className="w-full rounded-md  border-2 border-gray-500 bg-white p-5 pb-2 shadow-lg max-vxs:p-2"
                >
                  {/* fetched info for address */}
                  <div className=" grid h-full  grid-rows-[1fr,0.1fr] gap-5 ">
                    <span className="flex flex-col gap-2">
                      <h1 className="border-b border-black pb-2">
                        Default Address
                      </h1>
                      <h1 className="mt-3 font-semibold">{item.fullName}</h1>
                      <h2>{item.address1}</h2>
                      <h2>{item.address2}</h2>
                      <h2>
                        {item.city},{item.state} {item.pinCode}
                      </h2>
                      <h2>{item.country}</h2>
                      <h2>Phone Number:{item.mobileNumber}</h2>
                    </span>
                    {/* actions button  */}
                    <span className="flex gap-2 ">
                      {/* edit address button */}
                      <button
                        className="text-sky-700"
                        onClick={() =>
                          navigate(`edit-address?address=${item._id}`)
                        }
                      >
                        Edit
                      </button>
                      <span>|</span>
                      {/* delete address button  */}
                      <button
                        className="text-sky-700"
                        onClick={() => deleteAddress(item._id)}
                      >
                        Remove
                      </button>
                    </span>
                  </div>
                </div>
              )
          )}
        </label>
      </section>
      {showOtherAddress && (
        <section className="flex gap-5">
          <input
            type="radio"
            name="address"
            className="cursor-pointer"
            id="ManAddress"
          />
          {/* populating all the addresses expect default one */}
          <label htmlFor="ManAddress" className="w-full cursor-pointer">
            {addresses.map(
              (item, i) =>
                item._id !== user.address && (
                  // fetched info for address

                  <div
                    key={i}
                    className=" w-full rounded-md border-2  border-gray-500 bg-white p-3 pb-2 shadow-lg max-vxs:p-2"
                  >
                    <div className="grid h-full grid-rows-[1fr,0.1fr] gap-5 ">
                      <span className="flex flex-col gap-2 align-top">
                        <h1 className="mt-3 font-semibold">{item.fullName}</h1>
                        <h2>{item.address1}</h2>
                        <h2>{item.address2}</h2>
                        <h2>
                          {item.city},{item.state} {item.pinCode}
                        </h2>
                        <h2>{item.country}</h2>
                        <h2>Phone Number:{item.mobileNumber}</h2>
                      </span>
                      {/* action buttons  */}
                      <span className=" flex items-center gap-2 ">
                        {/* edit button  */}
                        <button
                          className="text-sky-700"
                          onClick={() =>
                            navigate(`edit-address?address=${item._id}`)
                          }
                        >
                          Edit
                        </button>
                        <span>|</span>
                        {/* remove address  */}
                        <button
                          className="text-sky-700"
                          onClick={() => deleteAddress(item._id)}
                        >
                          Remove
                        </button>
                        <span>|</span>
                        {/* set as default address  */}
                        <button
                          className="text-sky-700"
                          onClick={() => setAddressDefault(item._id)}
                        >
                          Set as Default
                        </button>
                      </span>
                    </div>
                  </div>
                )
            )}
          </label>
        </section>
      )}

      <span className="m-auto flex gap-2">
        <button
          className="rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow "
          onClick={() => {
            props.setActiveStep(2);
          }}
        >
          Use This Address
        </button>
        <button
          className="rounded border border-gray-400 px-5  py-2 shadow "
          onClick={(e) => {
            setShowOtherAddress(true);
            (e.target as HTMLButtonElement).style.display = "none";
          }}
        >
          Change
        </button>
      </span>
    </div>
  );
}
