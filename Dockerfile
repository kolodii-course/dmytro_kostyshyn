FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite pdo_pg

COPY nginx.conf /etc/nginx/sites-available/default

COPY . /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN cd /var/www/html && composer install --no-dev --optimize-autoloader

RUN cp .env.example .env
RUN php /var/www/html/artisan key:generate

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN touch /var/www/html/database/database.sqlite
RUN chown www-data:www-data /var/www/html/database/database.sqlite

RUN php /var/www/html/artisan migrate --force

EXPOSE 80

CMD service nginx start && php-fpm
