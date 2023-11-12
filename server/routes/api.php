<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'getAllUsers']);
Route::get('/users/{id}', [AuthController::class, 'getUserById']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/report', [ReportController::class, 'index']);
Route::post('/report', [ReportController::class, 'store']);
Route::get('/report/{id}', [ReportController::class, 'show']);
Route::delete('/report/{id}', [ReportController::class, 'destroy']);
Route::get('/expense', [ExpenseController::class, 'index']);
Route::post('/expense', [ExpenseController::class, 'store']);
Route::delete('/expense/{id}', [ExpenseController::class, 'destroy']);
