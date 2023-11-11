<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user_id;
        $reports = Report::with('expenses')->where('user_id', $userId)->get();
        return response()->json($reports);
    }
    public function store(Request $request)
    {
        $request->validate([
            'month' => 'required',
            'income' => 'required',
            'user_id' => 'required',
        ]);

        $report = new Report;
        $report->month = $request->month;
        $report->income = $request->income;
        $report->user_id = $request->user_id;
        $report->save();

        $report = Report::with('expenses')->find($report->id);

        return response()->json(['message' => 'Report created successfully', 'report' => $report], 201);
    }


    public function show($id)
    {
        $report = Report::with('expenses')->find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        return response()->json($report);
    }

    public function destroy($id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully'], 200);
    }
}
