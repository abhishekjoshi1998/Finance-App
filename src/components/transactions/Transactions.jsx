import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database as db } from "../../utils/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTransactions(user.uid);
      }
    });
  }, []);

  const fetchTransactions = (uid) => {
    const transactionsRef = ref(db, `/`);
    const fetchedTransactions = [];
    onValue(transactionsRef, (snapshot) => {
      snapshot.child(`incomes/${uid}`).forEach((incomeSnap) => {
        fetchedTransactions.push({
          id: incomeSnap.key,
          type: "Income",
          ...incomeSnap.val(),
        });
      });
      snapshot.child(`expenses/${uid}`).forEach((expenseSnap) => {
        fetchedTransactions.push({
          id: expenseSnap.key,
          type: "Expense",
          ...expenseSnap.val(),
        });
      });
      setTransactions(fetchedTransactions);
    });
  };

  const deleteTransaction = (type, id) => {
    const path =
      type === "Income"
        ? `incomes/${userId}/${id}`
        : `expenses/${userId}/${id}`;
    remove(ref(db, path));
    toast.success(`${type === "Income" ? "Income" : "Expense"}Transaction Deleted`);
    fetchTransactions(userId)
  };

  const filteredTransactions = transactions.filter((t) =>
    filter === "All" ? true : t.type === filter
  );

  return (
    <div className="md:px-10 px-2">
      <nav className="flex justify-between px-10 items-center py-2 border border-black">
        <div className="w-full flex justify-center">
          <h2>Transactions</h2>
        </div>
        <div className="w-full flex justify-center">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </nav>

      <div className="overflow-scroll w-full"> 
        <table className="w-full md:px-5">
          <thead className="border border-black">
            <tr className="flex justify-between">
              <td className="border-r border-black w-full text-center">
                Amount
              </td>
              <td className="border-r border-black w-full text-center">Type</td>
              <td className="border-r border-black w-full text-center">
                Category
              </td>
              <td className="border-r border-black w-full text-center">Date</td>
              <td className="border-r border-black w-full text-center">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="flex justify-between border border-black"
              >
                <td className="border-r border-black w-full text-center py-2">
                  ₹{t.amount}
                </td>
                <td className="border-r border-black w-full text-center py-2">
                  {t.type}
                </td>
                <td className="border-r border-black w-full text-center py-2">
                  {t.category ? t.category : "Null"}
                </td>
                <td className="border-r border-black w-full text-center py-2">
                {t.date}
                </td>
                <td className="border-r border-black w-full text-center py-2 flex items-center justify-center gap-2">
                <button onClick={() => deleteTransaction(t.type, t.id)} className="px-2 py-1 rounded-lg bg-red-500">
                  Delete
                </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Transactions;
