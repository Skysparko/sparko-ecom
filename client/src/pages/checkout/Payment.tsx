import React, { useRef, useState } from "react";
import CreditCardInput from "react-credit-card-input";
type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};
function showCardForm() {
  const cardForm: HTMLSpanElement = document.querySelector("#cardForm")!;
  const upiForm: HTMLSpanElement = document.querySelector("#upiForm")!;

  cardForm.classList.remove("hidden");
  if (!upiForm.classList.contains("hidden")) {
    upiForm.classList.add("hidden");
  }
}

function showUpiForm() {
  const cardForm: HTMLSpanElement = document.querySelector("#cardForm")!;
  const upiForm: HTMLSpanElement = document.querySelector("#upiForm")!;
  upiForm.classList.remove("hidden");
  if (!cardForm.classList.contains("hidden")) {
    cardForm.classList.add("hidden");
  }
}

export default function Payment(props: Props) {
  const [cardNumber, setCardNumber] = useState(0);
  const [expiry, setExpiry] = useState(0);
  const [cvc, setCvc] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">Payment Method</h1>
      <section className="flex cursor-pointer flex-col gap-2   px-5">
        <span className="flex gap-2" onClick={showCardForm}>
          <input
            type="radio"
            name="payment"
            className="cursor-pointer"
            id="card"
          />
          <label htmlFor="card" className="w-full cursor-pointer  ">
            Pay with Debit/Credit/ATM Cards
          </label>
        </span>
        <span className="hidden px-5" id="cardForm"></span>
      </section>
      <section className="flex flex-col gap-2   px-5" onClick={showUpiForm}>
        <span className="flex gap-2  ">
          <input
            type="radio"
            className="cursor-pointer"
            name="payment"
            id="upi"
          />
          <label htmlFor="upi" className="w-full cursor-pointer">
            UPI
          </label>
        </span>
        <span className="hidden px-5" id="upiForm">
          hi bro
        </span>
      </section>
      <section className="flex gap-2 px-5">
        <input
          type="radio"
          className="cursor-pointer"
          name="payment"
          id="cod"
        />
        <label htmlFor="cod" className="cursor-pointer">
          Cash on Delivery/Pay on Delivery
        </label>
      </section>
      <span className="m-auto flex gap-2 px-5">
        <button
          className="rounded border border-gray-400  px-5  py-2 shadow "
          onClick={() => {
            props.setActiveStep(1);
          }}
        >
          Change Address
        </button>
        <button
          className="rounded border border-gray-400 bg-sky-700 px-5 py-2   text-white shadow "
          onClick={(e) => {
            props.setActiveStep(3);
          }}
        >
          Proceed
        </button>
      </span>
    </div>
  );
}
