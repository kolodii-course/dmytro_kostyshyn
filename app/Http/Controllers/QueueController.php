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

    public function show($id)
    {
        return Queue::findOrFail($id);
    }

    public function store(CreateQueueRequest $request)
    {
        return Queue::create($request->validated());
    }

    public function update(UpdateQueueRequest $request, $id)
    {
        $queue = Queue::findOrFail($id);
        $queue->name = $request->name;
        $queue->save();

        return $queue;
    }

    public function destroy($id)
    {
        $queue = Queue::findOrFail($id);
        $queue->outages()->delete();
        $queue->delete();

        return response()->json([], 204);
    }
}
