import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA46BE"
];

export default function ExpenseChart({ expenses }) {

    const categoryData = [];

    expenses.forEach((expense) => {

        const existing = categoryData.find(
            item => item.category === expense.category
        );

        if (existing) {
            existing.amount += Number(expense.amount);
        } else {
            categoryData.push({
                category: expense.category,
                amount: Number(expense.amount)
            });
        }

    });

    return (

        <PieChart width={420} height={320}>

            <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
            >
                {categoryData.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>

            <Tooltip />
            <Legend />

        </PieChart>

    );

}