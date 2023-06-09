<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQueueRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
        ];
    }
}
