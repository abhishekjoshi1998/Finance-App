import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database as db } from "../../utils/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Savings = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchData(user.uid);
      }
    });
  }, []);

  const fetchData = (uid) => {
    onValue(ref(db, `incomes/${uid}`), (snapshot) => {
      let totalIncome = 0;
      snapshot.forEach((snap) => (totalIncome += snap.val().amount));
      setIncome(totalIncome);
    });

    onValue(ref(db, `expenses/${uid}`), (snapshot) => {
      let totalExpenses = 0;
      snapshot.forEach((snap) => (totalExpenses += snap.val().amount));
      setExpenses(totalExpenses);
    });
  };

  useEffect(() => {
    setSavings(income - expenses);
  }, [income, expenses]);

  return (
    <div className="space-y-10 mt-10">
      <h2 className="font-bold text-2xl text-center">Savings Overview</h2>

      <div className="w-full flex justify-center items-center md:px-5 px-2">
        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-green-500 text-white p-5 rounded-lg flex flex-col items-center">
              <p>Total Income</p>
              <p className="text-2xl">${income}</p>
            </div>
            <div className="bg-red-500 text-white p-5 rounded-lg flex flex-col items-center">
              <p>Total Expenses</p>
              <p className="text-2xl">${expenses}</p>
            </div>
            <div className="bg-blue-500 text-white p-5 rounded-lg flex flex-col items-center">
              <p>Current Savings</p>
              <p className="text-2xl">${savings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
