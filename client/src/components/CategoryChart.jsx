import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2c3e50', '#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#1abc9c', '#e67e22'];

function CategoryChart({ categoryTotals }) {
  if (!categoryTotals || Object.keys(categoryTotals).length === 0) {
    return <p>No expense data yet to chart.</p>;
  }

  // Transform { Food: 20, Transport: 10 } into [[ name: 'Food', value: 20 ], ...] (array of key-value pairs)
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div>
      <h3>Spending by Category</h3>
      {/* ResponsiveContainer - makes chart auto resize to fit its parent container's width,
        instead of being a fixed pixel size. Fixed height, flexible width. */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            // innerRadius cuts a hole in the middle(donut pie chart); if set to 0, you get a regular pie chart.
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {/* bttm section - by default, Recharts would make every slice the same color. This loops assigns each
            slice a diff. color from the COLORS array. 'index % ...' cycles back to start of the color lists in case
            there's categories > colors defines. */}
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* line below - customizes what shows when I hover over a slice, formatting raw numbers as currency. */}
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            {/* line below - auto generates the color-coded list of category names below/beside chart. */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;