<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="icons/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blackouts Schedule</title>
    <!-- Styles -->

    @viteReactRefresh
    @vite(['resources/main.jsx'])

</head>

<body>
    <div id="root"></div>
</body>

</html>
