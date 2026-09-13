const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// CREATE - register a new transaction
router.post('/', async (req, res) => {
    try{
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ - retrieve all transactions
router.get('/', async (req, res) => {
    try{
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - edit an existing transaction by ID
router.put('/:id', async (req, res) => {
    try{
        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if(!updated) return res.status(404).json({ error: 'Transaction not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - remove transaction by ID
router.delete('/:id', async (req, res) => {
    try{
        const deleted = await Transaction.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({ error: 'Transaction not found' });
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// function below - get totals and breakdowns for the dashboard
// '/summary' works eventhough it's not '/:id' because route order MATTERS in EXPRESS.
// If router.get('/:id') existed above this and came first, Express would think "summary" is 
// an :id value and never reach this route.
// current file only has '/:id' for PUT and DELETE, not GET. 
router.get('/summary', async (req, res) => {
    try {
        // the Transaction.find() - similar to GET route, fetches every transaction,
        // but here its used to calculate summary stats rather than returning raw list. 
      const transactions = await Transaction.find();
  
      let totalIncome = 0;
      let totalExpenses = 0;

      // object below - builds a list/set of sorts by adding up expenses per category.
      const categoryTotals = {};
      const monthlyTotals = {};
  
      transactions.forEach((t) => {
        if (t.type === 'income') {
          totalIncome += t.amount;
        } else {
          totalExpenses += t.amount;
            // categoryTotals[t.category] || 0 - handles first time a category appears
            // starts at if it doesn't exist yet
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        }

        // Group by month (Ex: "2026-09") and becomes grouping key
        const monthKey = new Date(t.date).toISOString().slice(0, 7);

        // line below - [monthkey] initialization, first time a see a given month, we create an entry like '{ month: "2026-09", income: 0, expenses: 0 }'
        // every transaction after adds to the existing bucket.
        if (!monthlyTotals[monthKey]) {
          monthlyTotals[monthKey] = { month: monthKey, income: 0, expenses: 0 };
        }
        if (t.type === 'income') {
          monthlyTotals[monthKey].income += t.amount;
        } else {
          monthlyTotals[monthKey].expenses += t.amount;
        }
      });
  
      const balance = totalIncome - totalExpenses;
      // savings rate - calculated as a percentage of icome you kept instead of spent.
      // the "totalIncome > 0 ? ... : 0" so I dont get a divide-by-zero error, if there's no income recorded yet.
      const savingsRate = totalIncome > 0
        ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
        : 0;

        // I have to convert monthlyTotals obj into sorted array
        // Object.values just grabs the values (ignoring keys), and turns them to plain arrays.
        const monthlyBreakdown = Object.values(monthlyTotals).sort((a, b) =>
            a.month.localeCompare(b.month)
        // .sort((a, b) => a.month.localeCompare(b.month)) - sort chronologically using string comparison using YYYY-MM format.
        );
  
      res.json({
        totalIncome,
        totalExpenses,
        balance,
        savingsRate,
        categoryTotals,
        monthlyBreakdown
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;