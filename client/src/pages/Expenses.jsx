import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Expenses.css";
import { toast } from "react-toastify";
export default function Expenses() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");
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
const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch =
        expense.title
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesCategory =
        categoryFilter === "" ||
        expense.category === categoryFilter;

    return matchesSearch && matchesCategory;

});
const sortedExpenses = [...filteredExpenses];

switch (sortBy) {
    case "oldest":
        sortedExpenses.sort(
            (a, b) =>
                new Date(a.expenseDate) - new Date(b.expenseDate)
        );
        break;

    case "highest":
        sortedExpenses.sort(
            (a, b) => Number(b.amount) - Number(a.amount)
        );
        break;

    case "lowest":
        sortedExpenses.sort(
            (a, b) => Number(a.amount) - Number(b.amount)
        );
        break;

    default:
        sortedExpenses.sort(
            (a, b) =>
                new Date(b.expenseDate) - new Date(a.expenseDate)
        );
}
return (
    <div className="expense-page">
        <Sidebar />
        <div className="expense-content">
        <div className="expense-card">

        <h2>Expense History</h2>
        </div>
        <div className="search-box">

            <input
                type="text"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
            </select>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
            </select>

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
                {sortedExpenses.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            No expenses found.
                        </td>
                    </tr>
                ) : (
                    sortedExpenses.map((expense) => (
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