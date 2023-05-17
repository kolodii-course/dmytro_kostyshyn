<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Queue;

class Outage extends Model
{
    use HasFactory;

    protected $fillable = ['queue_id', 'start_at', 'end_at'];

    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }
}
