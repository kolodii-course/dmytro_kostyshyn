<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\OutageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'auth'], function () use ($router) {
    $router->post('/registration', [AuthController::class, 'register']);
    $router->post('/login', [AuthController::class, 'login']);
    $router->post('/refresh', [AuthController::class, 'refresh']);
});


Route::group(['prefix' => 'user'], function () use ($router) {
    $router->get('/', [UserController::class, 'index'])->middleware('jwt.auth')->middleware('admin');
});

Route::group(['prefix' => 'queue'], function () use ($router) {
    $router->get('/', [QueueController::class, 'index']);
    $router->get('/{id}',  [QueueController::class, 'show']);
    $router->post('/', [QueueController::class, 'store'])->middleware('jwt.auth')->middleware('admin');
    $router->patch('/{id}', [QueueController::class, 'update'])->middleware('jwt.auth')->middleware('admin');
    $router->delete('/{id}', [QueueController::class, 'destroy'])->middleware('jwt.auth')->middleware('admin');
});

Route::group(['prefix' => 'outage'], function () use ($router) {
    $router->get('/', [OutageController::class, 'index']);
    $router->get('/{id}',  [OutageController::class, 'show']);
    $router->post('/', [OutageController::class, 'store'])->middleware('jwt.auth')->middleware('admin');
    $router->patch('/{id}', [OutageController::class, 'update'])->middleware('jwt.auth')->middleware('admin');
    $router->delete('/{id}', [OutageController::class, 'destroy'])->middleware('jwt.auth')->middleware('admin');
});
