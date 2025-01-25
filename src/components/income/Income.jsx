import React, { useState, useEffect } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { database as db } from "../../utils/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Income = () => {
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTransactions(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const fetchTransactions = async (id) => {
    const transactionsRef = ref(db, `/`);
    const fetchedTransactions = [];

    onValue(transactionsRef, (snapshot) => {
      snapshot.child(`incomes/${id}`).forEach((incomeSnap) => {
        fetchedTransactions.push({
          id: incomeSnap.key,
          type: "Income",
          ...incomeSnap.val(),
        });
      });
      setTransactions(fetchedTransactions); 
    });
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const newIncome = {
      amount: parseFloat(amount),
      description,
      date,
    };

    try {
      await push(ref(db, `incomes/${userId}`), newIncome);
      fetchTransactions(userId);
      setAmount("");
      setDescription("");
      setDate("");
      toast.success("New Income added")
    } catch (error) {
      console.error("Error adding income: ", error);
      toast.error("Eeeor adding Income!")
    }
  };

  const deleteTransaction = (id) => {
    const path = `incomes/${userId}/${id}`;
    remove(ref(db, path));
    toast.error("Income data removed")
    fetchTransactions(userId);
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions(userId);
    }
  }, [isClicked, userId]);

  return (
    <div className="mt-5 bg-gray-100">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 px-10">
        <div className="w-full border border-black">
          <div className="bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Income</h2>
            <form onSubmit={handleAddIncome} className="space-y-4 w-full">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Add Income
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center">
          <table className="w-[90%] px-5">
            <thead className="border border-black">
              <tr className="flex justify-between">
                <td className="border-r border-black w-full text-center">Amount</td>
                <td className="border-r border-black w-full text-center">Category</td>
                <td className="border-r border-black w-full text-center">Date</td>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="flex justify-between border border-black">
                  <td className="border-r border-black w-full text-center py-2">₹{t.amount}</td>
                  <td className="border-r border-black w-full text-center py-2">
                    {t.category ? t.category : "Null"}
                  </td>
                  <td className="border-r border-black w-full text-center py-2 flex items-center justify-center gap-2">
                    {t.date}
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="px-2 py-1 rounded-lg bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;
