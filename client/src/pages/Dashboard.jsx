import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import MonthlyExpenseChart from "../components/MonthlyExpensechart";
import ExpenseChart from "../components/Expensechart";
import "./Dashboard.css";
export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expense/all");
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),0
    );
    const highestExpense = expenses.reduce(
    (max, expense) =>
        Number(expense.amount) > Number(max.amount || 0)
            ? expense
            : max,
    {}
    );
    const averageExpense =
        expenses.length > 0
            ? (totalExpense / expenses.length).toFixed(2)
            : 0;
    const categoryTotals = {};
    expenses.forEach((expense) => {
        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) +
            Number(expense.amount);

    });

    const highestCategory =
    Object.keys(categoryTotals).length
        ? Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])[0]
        : ["None", 0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpense = expenses
    .filter((expense) => {

        const date = new Date(expense.expenseDate);        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );

    })
    .reduce(
        (sum, expense) => sum + Number(expense.amount), 0
    );
    const categoryTotals = {};
        expenses.forEach((expense) => {
            categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) +Number(expense.amount);
       });

const highestCategory =
    Object.keys(categoryTotals).length > 0
        ? Object.entries(categoryTotals).sort(
              (a, b) => b[1] - a[1])[0]: ["None", 0];
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome, {user?.name}</h1>
                <div
                    className="card"
                >
                    <div
                        className="card green"
                    >
                        <h3>Total Expenses</h3>
                        <h2>₹ {totalExpense}</h2>
                    </div>
                    <div
                        className="card blue"
                    >
                        <h3>Total Transactions</h3>
                        <h2>{expenses.length}</h2>
                    </div>
                    <div className="card orange">

                        <h3>This Month</h3>
                        <h2>₹ {monthlyExpense}</h2>
                    </div>
                    <div className="card purple">
                        <h3>Top Category</h3>
                        <h2>{highestCategory[0]}</h2>
                        <p>₹ {highestCategory[1]}</p>
                    </div>
                </div>
                <div className="chart-section">
                    <h2>Expenses by Category</h2>
                    {expenses.length === 0 ? (
                        <p>No expense data available.</p>) : (
                        <ExpenseChart expenses={expenses} />
                    )}
                </div>
                <div className="chart-section">
                    <h2>Monthly Expense Trend</h2>
                    <MonthlyExpenseChart expenses={expenses} />
                </div>
                 <div className="recent-section">
                    <h2>Recent Expenses</h2>
                    <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.slice(0,5).map((expense)=>(
                            <tr key={expense.id}>
                                <td>{expense.title}</td>
                                <td>₹ {expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.expenseDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className="insight-section">
                <h2>Financial Insights</h2>
                <div className="insight-grid">
                    <div className="insight-card">
                        <h4>Highest Expense</h4>
                        <p>{highestExpense.title || "N/A"}</p>
                        <h3>₹ {highestExpense.amount || 0}</h3>
                    </div>
                    <div className="insight-card">
                        <h4>Highest Category</h4>
                        <p>{highestCategory[0]}</p>
                        <h3>₹ {highestCategory[1]}</h3>
                    </div>
                    <div className="insight-card">
                        <h4>Average Expense</h4>
                        <h3>₹ {averageExpense}</h3>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );

}