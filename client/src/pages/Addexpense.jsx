import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./AddExpense.css";
export default function AddExpense() {

    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        expenseDate: ""
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/expense/add", expense);

            toast.success(res.data.message);

            if (res.data.success) {
                navigate("/expenses");
            }

        } catch (err) {
            console.log(err);
            toast.error("Failed to add expense");
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
                        placeholder="Enter expense title"
                        onChange={handleChange}
                    />

                    </div>
                    <div className="form-group">

                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
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
                    >
                    
                    </button>

                </form>
                </div>
            </div>

        </div>

    );

}