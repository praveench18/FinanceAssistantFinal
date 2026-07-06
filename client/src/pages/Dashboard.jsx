import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
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
        (sum, expense) => sum + Number(expense.amount),
        0
    );

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

                </div>

                <div className="chart-section">

                    <h2>Expenses by Category</h2>

                    {expenses.length === 0 ? (

                        <p>No expense data available.</p>

                    ) : (

                        <ExpenseChart expenses={expenses} />

                    )}

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
            </div>

        </div>

    );

}