<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\OutageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'queue'], function () use ($router) {
    $router->get('/', [QueueController::class, 'index']);
    $router->get('/{id}',  [QueueController::class, 'show']);
    $router->post('/', [QueueController::class, 'store']);
    $router->patch('/{id}', [QueueController::class, 'update']);
    $router->delete('/{id}', [QueueController::class, 'destroy']);
});

Route::group(['prefix' => 'outage'], function () use ($router) {
    $router->get('/', [OutageController::class, 'index']);
    $router->get('/{id}',  [OutageController::class, 'show']);
    $router->post('/', [OutageController::class, 'store']);
    $router->patch('/{id}', [OutageController::class, 'update']);
    $router->delete('/{id}', [OutageController::class, 'destroy']);
});
