FROM node:18-alpine as VITE_BUILD

WORKDIR /app
COPY . /app

RUN npm install -force
RUN npm run build


FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY nginx.conf /etc/nginx/sites-available/default

COPY . /var/www/html
COPY --from=VITE_BUILD /app/public /var/www/html/public

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN cd /var/www/html && composer install --no-dev --optimize-autoloader

RUN cp .env.prod .env
RUN php /var/www/html/artisan key:generate

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# RUN php /var/www/html/artisan migrate --force


EXPOSE 80

CMD service nginx start && php-fpm
