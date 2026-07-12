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
    const budgetAmount = Number(budget || 0);

    const percentageUsed = budgetAmount > 0
        ? ((currentMonthExpense / budgetAmount) * 100).toFixed(1) : 0;
        let budgetInsight = "";

    if (budgetAmount === 0) {
        budgetInsight = "⚠ Please set your monthly budget.";
    }
    else if (percentageUsed < 50) {
        budgetInsight =
            "🟢 Excellent! You are managing your budget very well.";
    }
    else if (percentageUsed < 80) {
        budgetInsight =
            "🟡 You are spending steadily. Keep monitoring your expenses.";
    }
    else if (percentageUsed <= 100) {
        budgetInsight =
            "🟠 You are close to reaching your monthly budget.";
    }
    else {
        budgetInsight =
            "🔴 Budget exceeded! Try reducing unnecessary expenses.";
    }
    const categoryTotals = {};

    expenses.filter((expense) => {
        const date = new Date(expense.expenseDate);

        return (
            date.getMonth() + 1 === month &&
            date.getFullYear() === year
        );
    })
    .forEach((expense) => {

        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) +
            Number(expense.amount);

    });
    let highestCategory = "";
    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {

        if (amount > highestAmount) {

            highestAmount = amount;
            highestCategory = category;

        }

    });
    let recommendation = "";

switch (highestCategory) {

    case "Food":
        recommendation =
            "Try cooking at home more often to reduce food expenses.";
        break;

    case "Travel":
        recommendation =
            "Consider public transport or carpooling to save money.";
        break;

    case "Shopping":
        recommendation =
            "Avoid impulse purchases and shop with a planned list.";
        break;

    case "Entertainment":
        recommendation =
            "Limit subscriptions and paid entertainment this month.";
        break;

    default:
        recommendation =
            "Monitor your spending in this category.";
}

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
                <div className="budget-box">
                <h4>Budget Used</h4>
                <h2>{percentageUsed}%</h2>
                </div>
            </div>
            <p className="budget-status">
                {remaining >= 0
                    ? "🟢 Within Budget"
                    : `🔴 Overspending by ₹${Math.abs(remaining)}`}
            </p>
            <p className="budget-insight">
            {budgetInsight}
            </p>
            <div className="category-analysis">
                <h3>Highest Spending Category</h3>
                <h2>
                    {highestCategory || "No expenses"}
                </h2>
                <h3>
                    ₹ {highestAmount}
                </h3>
                <p>
                    💡 {recommendation}
                </p>
            </div>
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