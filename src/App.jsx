import { useRef, useState } from "react";
import calc from "./assets/icon-calculator.svg";
import formEmptyImg from './assets/formempty.png' 

const App = () => {
  const [monthlyPay, setMonthlyPay] = useState(null);
  const [totalPayForTheYears, setTotalPayForTheYears] = useState(null);
  const [mortgageType, setMortgageType] = useState("repayment");

  const [formEmpty, setFormEmpty] = useState(false);

  const amount = useRef();
  const years = useRef();
  const annualRate = useRef();

  function formSubmit(e) {
    e.preventDefault();

    // Read and convert input values
    const principal = parseFloat(amount.current.value);
    const annualRateValue = parseFloat(annualRate.current.value);
    const termYears = parseFloat(years.current.value);

    // Convert annual interest rate to a decimal and calculate rate per month
    const monthlyRate = (annualRateValue / 100) / 12;
    const totalPayments = termYears * 12;

    let monthlyPayment, totalAmountPaid;

    if (mortgageType === "repayment") {
      if (monthlyRate === 0) { // Handle the case of 0% interest
        monthlyPayment = principal / totalPayments;
      } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
      }
      totalAmountPaid = monthlyPayment * totalPayments;
      setMonthlyPay(monthlyPayment.toFixed(2));
      setTotalPayForTheYears(totalAmountPaid.toFixed(2));
    } else if (mortgageType === "interestOnly") {
      const monthlyInterestPayment = principal * (monthlyRate);
      totalAmountPaid = monthlyInterestPayment * totalPayments;
      setMonthlyPay(monthlyInterestPayment.toFixed(2));
      setTotalPayForTheYears(totalAmountPaid.toFixed(2));
    }


    setFormEmpty(true)
  }

  return (
    <main className="bg-blue-200 min-h-screen max-w-full flex justify-center items-center px-2">
      <div className="bg-white rounded-xl w-full max-w-4xl grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 shadow-lg shadow-slate-500 my-10">
        {/* left */}
        <form className="p-4 py-10" onSubmit={formSubmit}>
          <header className="flex justify-between items-center mb-5">
            <h2 className="font-medium text-2xl">Mortgage Calculator</h2>
            <span className="underline decoration-blue-300 cursor-pointer">
              Clear All
            </span>
          </header>

          <div className="inputs">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="amount" className="text-slate-600">
                Mortgage Amount
              </label>
              <div className="flex border border-solid border-blue-500 rounded-md overflow-hidden">
                <div className="bg-blue-200 py-2 px-2 rounded-l-md font-medium">
                  Ksh
                </div>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="form-input flex-1 py-2 px-2 outline-none font-semibold rounded-r-md box-border"
                  required
                  ref={amount}
                />
              </div>
            </div>

            {/* mortgage term and interest rate */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="term" className="text-slate-600">
                  Mortgage Term
                </label>
                <div className="flex flex-row-reverse border border-solid border-blue-500 rounded-md">
                  <div className="bg-blue-200 p-2 rounded-r-md font-medium">
                    years
                  </div>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    className="form-input w-full outline-none rounded-l-md p-2 font-semibold box-border"
                    required
                    ref={years}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="rate" className="text-slate-600">
                  Interest Rate
                </label>
                <div className="flex flex-row-reverse border border-solid border-blue-500 rounded-md">
                  <div className="bg-blue-200 p-2 rounded-r-md font-medium">
                    %
                  </div>
                  <input
                    type="text"
                    id="rate"
                    name="rate"
                    className="form-input p-2 w-full rounded-l-md font-semibold outline-none box-border"
                    ref={annualRate}
                    value={5.25}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* mortgage type */}
            <div className="mt-5 flex flex-col gap-2">
              <h2 className="text-slate-600">Mortgage Type</h2>
              <div className="border border-solid border-yellow-300 p-2 rounded-md hover:bg-yellow-100 flex gap-2 items-center">
                <input
                  type="radio"
                  name="type"
                  id="repayment"
                  className="form-radio text-yellow-300 outline-none"
                  checked={mortgageType === "repayment"}
                  onChange={() => setMortgageType("repayment")}
                />
                <label htmlFor="repayment" className="flex-1 font-medium">
                  Repayment
                </label>
              </div>
              <div className="border border-solid border-yellow-300 p-2 rounded-md hover:bg-yellow-100 flex gap-2 items-center">
                <input
                  type="radio"
                  name="type"
                  id="interestOnly"
                  className="form-radio text-yellow-300 outline-none"
                  checked={mortgageType === "interestOnly"}
                  onChange={() => setMortgageType("interestOnly")}
                />
                <label htmlFor="interestOnly" className="flex-1 font-medium">
                  Interest Only
                </label>
              </div>
            </div>

            <button className="flex gap-2 p-3 mt-8 bg-yellow-400 rounded-full px-8 cursor-pointer">
              <img src={calc} alt="" />
              <span className="font-medium">Calculate Repayments</span>
            </button>
          </div>
        </form>

        {/* right */}
        <div className="bg-slate-900 text-white p-6 py-10 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-[100px]">
          {formEmpty ? (
            <>
          <h2 className="text-2xl font-medium text-slate-200 mb-5">
            Your results
          </h2>
          <p className="text-slate-400 mb-8">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click &ldquo;calculate
            repayments&rdquo; again.
          </p>
          {/* repayment container */}
          <div className="shadow-lg shadow-black bg-gray-900 border-t-4 border-solid border-yellow-500 rounded-lg p-4">
            {/* monthly-repayments */}
            <div className="pb-4 mb-4 border-b border-solid border-slate-500">
              <p className="text-slate-400 pb-4">Your monthly repayments</p>
              <h2 className="font-bold text-5xl text-yellow-300">
                Ksh {monthlyPay}
              </h2>
            </div>
            {/* total repayment for the term */}
            <div className="pt-4">
              <p className="text-slate-400 pb-3">
                Total you&apos;ll repay over the term
              </p>
              <h2 className="font-bold text-3xl">Ksh {totalPayForTheYears}</h2>
            </div>
          </div>
          </> 
          ):(
            <div className="flex flex-col justify-center items-center h-full gap-4">
              <img src={formEmptyImg} alt="" />
              <div>
                <h2 className="text-slate-200 font-medium text-2xl text-center pb-4">Results shown here</h2>
                <p className="text-slate-400 text-center text-xl">Complete the form and click &ldquo;calculate repayments&rdquo; to see what your monthly repayments would be.</p>
              </div>
            </div>
          )}
         
        </div>
      </div>
    </main>
  );
};

export default App;
