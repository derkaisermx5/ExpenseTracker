import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function MonthlyChart({ monthlyBreakdown }) {
  if (!monthlyBreakdown || monthlyBreakdown.length === 0) {
    return <p>No monthly data yet to chart.</p>;
  }

  return (
    <div>
      <h3>Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyBreakdown}>
            {/* data={...} - BarChart takes whole array directly as data prop, w/o needing manual reshaping. backend already
            returns [{month, income, expenses}] which is ready to use as is.*/}
            
            {/* line below - adds dashed background grid lines, so its easier to read values. */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* line below -  tells chart to use 'month' field from each obj as horizontal axis labels*/}
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />

          {/* <Bar> component - Recharts auto places them side-by-side (grouped) for each month instead of stacking them, since they're
          different <Bar> elements. */}
          <Bar dataKey="income" fill="#27ae60" name="Income" />
          <Bar dataKey="expenses" fill="#e74c3c" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;