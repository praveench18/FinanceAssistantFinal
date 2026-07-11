import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function MonthlyExpenseChart({ expenses }) {
    const monthlyTotals = {};
    expenses.forEach((expense) => {
        const date = new Date(expense.expenseDate);
        const month = date.toLocaleString("default", {
            month: "short"
        });
        monthlyTotals[month] =(monthlyTotals[month] || 0) + Number(expense.amount);
    });
    const data = Object.keys(monthlyTotals).map((month) => ({ month,amount: monthlyTotals[month]
    }));
    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                    dataKey="amount"
                    fill="#3b82f6"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}