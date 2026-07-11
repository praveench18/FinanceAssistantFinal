export const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Others"
];
categories.map(category => (
    <option key={category}>
        {category}
    </option>
))