import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Expenses.css";
import { toast } from "react-toastify";
export default function Expenses() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expense/all");
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchExpenses();
    }, []);

    const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;
    try {
        const res = await API.delete(`/expense/delete/${id}`);
        toast.success(res.data.message);
        fetchExpenses();
    } catch (err) {
        console.log(err);
    }
};
return (
    <div className="expense-page">
        <Sidebar />
        <div className="expense-content">
        <div className="expense-card">

        <h2>Expense History</h2>
        </div>
        <table className="expense-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {expenses.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            No expenses found.
                        </td>
                    </tr>
                ) : (
                    expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.title}</td>
                        <td>₹ {expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{expense.expenseDate}</td>
                        <td>
                            <button
                            className="edit-btn"
                            onClick={() =>
                                navigate("/add", {
                                    state: {
                                        expense
                                    }
                                })
                            }
                        >
                        Edit
                        </button>
                         <button
                            className="delete-btn"
                            onClick={() => deleteExpense(expense.id)}
                            >
                            Delete
                            </button>
                        </td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
            </div>
        </div>
    );
}