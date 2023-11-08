<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $expense = Expense::all();

        return response()->json($expense);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'description' => 'required',
            'category' => 'required'
        ]);

        $expense = new Expense;
        $expense->amount = $request->amount;
        $expense->report_id = $request->report_id;
        $expense->description = $request->description;
        $expense->category = $request->category;
        $expense->save();

        return response()->json(['message' => 'Expense created successfully', 'expense' => $expense], 201);
    }

    public function destroy(string $id)
    {
        $expense = Expense::find($id);
        if ($expense) {
            $expense->delete();

            return response()->json(['message' => 'Expense deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Expense not found'], 404);
        }
    }
}
