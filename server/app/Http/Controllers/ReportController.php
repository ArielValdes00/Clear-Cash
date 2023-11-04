<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::all();

        return response()->json($reports);
    }

    public function store(Request $request)
    {
        $request->validate([
            'month' => 'required',
            'income' => 'required',
        ]);

        $report = new Report;
        $report->month = $request->month;
        $report->income = $request->income;
        $report->save();

        return response()->json(['message' => 'Report created successfully', 'report' => $report], 201);
    }

    public function destroy($id)
    {
        $report = Report::find($id);

        if ($report) {
            $report->delete();

            return response()->json(['message' => 'Report deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Report not found'], 404);
        }
    }
}