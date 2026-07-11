import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Addexpense.css";
import { toast } from "react-toastify";
export default function Addexpense() {

    const navigate = useNavigate();
    const location = useLocation();
    const editExpense = location.state?.expense;
    const [expense, setExpense] = useState(
    editExpense || {    
    title: "",
    amount: "",
    category: "",
    expenseDate: ""
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await API.post("/expense/add", expense);
        if (res.data.success) {
            toast.success("Expense added successfully!");
            setExpense({
                title: "",
                amount: "",
                category: "",
                expenseDate: ""
            });

            // Stay on the page for the next expense
        }
    } catch (err) {
        toast.error("Failed to add expense");
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="add-page">
            <Sidebar />
            <div className="add-content">
                <div className="add-card">
                    <h2>Add Expense</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={expense.title}
                        placeholder="Enter expense title"
                        onChange={handleChange}
                    />

                    </div>
                    <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Others">Others</option>
                    </select>

                    </div>
                    <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="expenseDate"
                        onChange={handleChange}
                    />

                    </div>
                    <button 
                        type="submit"
                        className="add-btn"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Expense"}
                    </button>

                </form>
                </div>
            </div>
        </div>
    );
}