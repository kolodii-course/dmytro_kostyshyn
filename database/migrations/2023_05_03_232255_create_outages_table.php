<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutagesTable extends Migration
{
    public function up()
    {
        Schema::create('outages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('queue_id')->constrained('queues');
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outages');
    }
};
