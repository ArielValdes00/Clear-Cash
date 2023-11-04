<?php

use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/api/report', [ReportController::class, 'index']);
Route::post('/api/report', [ReportController::class, 'store']);
Route::delete('/api/report/{id}', [ReportController::class, 'destroy']);
