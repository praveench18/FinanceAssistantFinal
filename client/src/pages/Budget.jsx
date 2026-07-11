import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Budget.css";

export default function Budget() {
    const [budget, setBudget] = useState("");
    const [expenses, setExpenses] = useState([]);
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    useEffect(() => {
        fetchBudget();
        fetchExpenses();
    }, []);

    const fetchBudget = async () => {
        try {
            const res = await API.get(
                `/budget/current?month=${month}&year=${year}`
            );
            setBudget(res.data.amount);
        } catch (err) {
            console.log(err);
        }
    };

    const saveBudget = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/budget/save", {
                amount: budget,
                month,
                year
            });
            toast.success(res.data.message);
            fetchBudget();
        } catch (err) {
            toast.error("Failed to save budget.");
        }
    };
    const fetchExpenses = async () => {
    try {
        const res = await API.get("/expense/all");
        setExpenses(res.data);
    } catch (err) {
        console.log(err);
    }
    };
    const currentMonthExpense = expenses
        .filter((expense) => {

    const date = new Date(expense.expenseDate);

    return (
        date.getMonth() + 1 === month &&
        date.getFullYear() === year
    );
    })
    .reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const remaining = Number(budget || 0) - currentMonthExpense;
    return (
        <div className="budget-page">
            <Sidebar />
            <div className="budget-content">
                <div className="budget-card">
                    <h2>Monthly Budget</h2>
                <div className="budget-stats">
                <div className="budget-box">
                    <h4>Budget</h4>
                    <h2>₹ {budget || 0}</h2>
                </div>
                <div className="budget-box">
                    <h4>Spent</h4>
                    <h2>₹ {currentMonthExpense}</h2>
                </div>
                <div className="budget-box">
                    <h4>Remaining</h4>
                    <h2>₹ {remaining}</h2>
                </div>
            </div>
            <p className="budget-status">
                {remaining >= 0
                    ? "🟢 Within Budget"
                    : `🔴 Overspending by ₹${Math.abs(remaining)}`}
            </p>
                <form onSubmit={saveBudget}>
                    <label>Budget Amount</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) =>
                            setBudget(e.target.value)
                        }
                        placeholder="Enter monthly budget"
                    />
                    <button
                        className="save-btn"
                        type="submit"
                    >
                        Save Budget
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
}