import React, { useState, useEffect } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { database as db } from "../../utils/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Expenses = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchExpenses(user.uid);
      }
    });
  }, []);

  const fetchExpenses = (uid) => {
    const expensesRef = ref(db, `expenses/${uid}`);
    onValue(expensesRef, (snapshot) => {
      const expenseList = [];
      snapshot.forEach((childSnapshot) => {
        expenseList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setExpenses(expenseList);
    });
  };

  const addExpense = (e) => {
    e.preventDefault();
    const expensesRef = ref(db, `expenses/${userId}`);
    push(expensesRef, { amount, description, category, date });
    setAmount("");
    setDescription("");
    setCategory("");
    setDate("");
    toast.success("New expense added")
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 px-10">
        <div className="w-full border border-black p-5">
          <h2 className="text-center text-xl font-bold">Add Expense</h2>
          <form onSubmit={addExpense} className="space-y-4 w-full py-5">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Add Amount
              </label>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                id="amount"
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                id="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="Category"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="text"
                placeholder="Category"
                id="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="date"
                value={date}
                id="date"
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Expense
            </button>
          </form>
        </div>
        <div className="border border-black text-center space-y-5 overflow-scroll">
          <h3 className="font-bold mt-2">Expense List</h3>

          <table className="w-full px-5 overflow-scroll">
            <thead className="border border-black">
              <tr className="flex justify-between">
                <td className="border-r border-black w-full text-center">Amount</td>
                <td className="border-r border-black w-full text-center">description</td>
                <td className="border-r border-black w-full text-center">Category</td>
                <td className="border-r border-black w-full text-center">Date</td>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="flex justify-between border border-black">
                  <td className="border-r border-black w-full text-center py-2">₹{expense.amount}</td>
                  <td className="border-r border-black w-full text-center py-2">{expense.description}</td>
                  <td className="border-r border-black w-full text-center py-2">
                    {expense.category ?expense.category : "Null"}
                  </td>
                  <td className="border-r border-black w-full text-center py-2 flex items-center justify-center gap-2">
                    {expense.date}
                    
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

export default Expenses;
