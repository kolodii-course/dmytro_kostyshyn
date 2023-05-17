<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOutageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'queue_id' => [
                'sometimes',
                'required',
                'numeric',
                'min:1',
            ],
            'start_at' => [
                'sometimes',
                'required',
                'date',
            ],
            'end_at' => [
                'sometimes',
                'required',
                'date',
            ],
        ];
    }
}

