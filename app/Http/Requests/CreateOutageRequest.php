<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOutageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'queue_id' => [
                'required',
                'numeric',
                'min:1',
            ],
            'start_at' => [
                'required',
                'date',
            ],
            'end_at' => [
                'required',
                'date',
            ],
        ];
    }
}

