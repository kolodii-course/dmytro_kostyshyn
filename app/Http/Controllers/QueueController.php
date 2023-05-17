<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use App\Http\Requests\CreateQueueRequest;
use App\Http\Requests\UpdateQueueRequest;

class QueueController extends Controller
{
    public function index()
    {
        return Queue::all();
    }

    public function show(Queue $queue)
    {
        return $queue;
    }

    public function store(CreateQueueRequest $request)
    {
        return Queue::create($request->validated());
    }

    public function update(UpdateQueueRequest $request, Queue $queue)
    {
        $queue->update($request->validated());
        return $queue;
    }

    public function destroy(Queue $queue)
    {
        $queue->delete();
        return response()->noContent();
    }
}
