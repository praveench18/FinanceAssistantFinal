import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./Reports.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {

        const date = new Date(expense.expenseDate);

        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );

    });

    const monthlyTotal = monthlyExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );
    const categorySummary = {};

    monthlyExpenses.forEach((expense) => {

    categorySummary[expense.category] =
        (categorySummary[expense.category] || 0) +
        Number(expense.amount);

});
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Finance Assistant Report", 14, 20);
        doc.setFontSize(12);
        doc.text(`Total Expenses: ₹ ${totalExpense}`, 14, 35);
        doc.text(`Monthly Expenses: ₹ ${monthlyTotal}`, 14, 45);
        autoTable(doc, {
            startY: 55,
            head: [["Title", "Amount", "Category", "Date"]],
            body: expenses.map((expense) => [
                expense.title,
                expense.amount,
                expense.category,
                expense.expenseDate
            ])
        });
        doc.save("Finance_Report.pdf");
    };

    const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(
        expenses.map((expense) => ({
            Title: expense.title,
            Amount: expense.amount,
            Category: expense.category,
            Date: expense.expenseDate
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Expenses"
    );
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });
    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );
    saveAs(file, "Finance_Report.xlsx");
};
return (
        <div className="report-page">
            <Sidebar />
            <div className="report-content">
                <h2>Financial Report</h2>
                <div className="report-summary">
                    <h3>This Month's Expense</h3>
                    <h2>₹ {monthlyTotal}</h2>
                    <h3>Category Summary</h3>
                    {Object.entries(categorySummary).map(([category, amount]) => (
                        <p key={category}>
                            {category} : ₹ {amount}
                        </p>
                    ))}
                </div>
                    <button className="export-btn" onClick={exportPDF}>
                    Export PDF
                </button>
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
