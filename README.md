<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://cdn.discordapp.com/attachments/673322183761854484/1110784483327758376/Untitled-2.png" width="400" alt="Laravel Logo"></a></p>

## About Blackout Schedule

This is the final project from the course "Technologies of component programming for the web", on which it was necessary to implement an informative resource that demonstrates the graph of the exclusion of light.:

## References

- [Main Webpage](https://blackout-schedule.dmytroframe.site/).
- [Portainer Panel](https://blackout-schedule-panel.dmytroframe.site/).
- [Technical Requirement](https://docs.google.com/document/d/1Lk0dwNlLIVsW6PBrYVuO7wrd8hc_XlJvW-UEqhKOTXs/edit).

## Instructions

### Run in Docker container
```bash
# build container
docker build -t bs-app .

# Run container
docker run -p 80:80 
```
### Run in Docker compose
```bash
# Up docker compose
docker-compose up -d

# Run migrations
docker exec app php /var/www/html/artisan migrate
```

### Run local
```bash
# Copy example  
RUN cp .env.example .env

# Install packages for laravel
composer install

# Install packages for nodejs
npm install

# Run in dev mode frontend
npm run dev

# Run generate keys
artisan key:generate

# Migrate
php artisan migrate

# Run php server on http://localhost:8000
php artisan serve
```
