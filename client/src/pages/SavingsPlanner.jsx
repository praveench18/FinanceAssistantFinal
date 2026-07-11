import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./SavingsPlanner.css";

export default function SavingsPlanner() {

    const [goal, setGoal] = useState("");
    const [months, setMonths] = useState("");
    const [monthlySaving, setMonthlySaving] = useState(null);

    const calculate = (e) => {

        e.preventDefault();

        if (!goal || !months) return;

        setMonthlySaving(
            (goal / months).toFixed(2)
        );

    };
    return (
        <div className="planner-page">
            <Sidebar />
            <div className="planner-content">
                <div className="planner-card">
                    <h2>Savings Planner</h2>
                    <form onSubmit={calculate}>
                        <input
                            type="number"
                            placeholder="Goal Amount"
                            value={goal}
                            onChange={(e)=>setGoal(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Months"
                            value={months}
                            onChange={(e)=>setMonths(e.target.value)}
                        />
                        <button type="submit">
                            Calculate
                        </button>
                    </form>
                    {monthlySaving && (
                        <div>
                            <h3>
                                Save ₹ {monthlySaving} every month
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}