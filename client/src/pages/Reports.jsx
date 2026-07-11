import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./Reports.css";

export default function Reports() {
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
        <div className="report-page">
            <Sidebar />
            <div className="report-content">
                <h2>Financial Report</h2>
                <div className="report-card">
                    <h3>Total Expenses</h3>
                    <h1>₹ {totalExpense}</h1>
                </div>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
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
    );
}