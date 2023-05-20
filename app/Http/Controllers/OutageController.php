<?php

namespace App\Http\Controllers;

use App\Models\Outage;
use Illuminate\Http\Request;
use App\Http\Requests\CreateOutageRequest;
use App\Http\Requests\UpdateOutageRequest;

class OutageController extends Controller
{

    public function index()
    {
        return Outage::with('queue')->get();
    }

    public function show($id)
    {
        return Outage::with('queue')->findOrFail($id);
    }

    public function store(CreateOutageRequest $request)
    {
        $outage = new Outage();
        $outage->queue_id = $request->queue_id;
        $outage->start_at = $request->start_at;
        $outage->end_at = $request->end_at;
        $outage->save();

        return $outage;
    }

    public function update(UpdateOutageRequest $request, $id)
    {
        $outage = Outage::findOrFail($id);
        $outage->queue_id = $request->queue_id;
        $outage->start_at = $request->start_at;
        $outage->end_at = $request->end_at;
        $outage->save();

        return $outage;
    }

    public function destroy($id)
    {
        $outage = Outage::findOrFail($id);
        $outage->delete();

        return response()->json([], 204);
    }
}
