import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { database as db } from "../../utils/firebase.config";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Income from "../income/Income";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState({});
  const [frequentCategory, setFrequentCategory] = useState("");
  const [expensiveCategory, setExpensiveCategory] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchFinancialData(user.uid);
      } else {
        setUserId(null);
        setIncome(0);
        setExpenses(0);
        setSavings(0);
        setExpenseCategories({});
      }
    });
  }, []);

  const fetchFinancialData = (uid) => {
    const incomeRef = ref(db, `incomes/${uid}`);
    const expensesRef = ref(db, `expenses/${uid}`);

    onValue(incomeRef, (snapshot) => {
      let totalIncome = 0;
      snapshot.forEach((childSnapshot) => {
        totalIncome += childSnapshot.val().amount;
      });
      setIncome(totalIncome);
    }); 

    onValue(expensesRef, (snapshot) => {
      let totalExpenses = 0;
      const categoryCount = {};
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        totalExpenses += Number(data.amount);
        categoryCount[data.category] = (categoryCount[data.category] || 0) + data.amount;
      });
      setExpenses(totalExpenses);
      setExpenseCategories(categoryCount);

      const categories = Object.keys(categoryCount);
      const maxFreqCategory = categories.reduce((a, b) => (categoryCount[a] > categoryCount[b] ? a : b), "");
      const maxExpensiveCategory = categories.reduce((a, b) => (categoryCount[a] >= categoryCount[b] ? a : b), "");

      setFrequentCategory(maxFreqCategory);
      setExpensiveCategory(maxExpensiveCategory);
    });
  };

 
  useEffect(() => {
    setSavings(income - expenses);
  }, [income, expenses]);

  const barData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(expenseCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [income, expenses, savings],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="px-10 mb-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-4">
        <div className="flex flex-col items-center gap-5 ">
          <h1 className="font-bold text-xl">Financial Overview</h1>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
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
          <div className="w-full">
            {expenseCategories && <Bar data={barData} /> }
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 ">
          <h1 className="font-bold text-xl">Expense Analysis</h1>
          <div className="flex gap-5">
          <div className="bg-yellow-600 text-white p-2 rounded-lg flex items-center gap-2 capitalize">
            <p>Most Frequent Expense Category:</p>
            <p className="text-xl">{frequentCategory}</p>
          </div>
          <div className="bg-yellow-600 text-white p-2 rounded-lg flex items-center gap-2 capitalize">
            <p>Most Expensive Category:</p>
            <p className="text-xl">{expensiveCategory}</p>
          </div>
          </div>
         
          <div className="flex gap-4 mt-4">
            <button onClick={() => navigate("/income")} className="bg-blue-500 text-white py-2 px-4 rounded">
              Income
            </button>
            <button onClick={() => navigate("/expenses")} className="bg-red-500 text-white py-2 px-4 rounded">
              Expenses
            </button>
            <button onClick={() => navigate("/savings")} className="bg-green-500 text-white py-2 px-4 rounded">
              Savings
            </button>
          </div>
          <div className="w-full h-1/2  flex justify-center">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
