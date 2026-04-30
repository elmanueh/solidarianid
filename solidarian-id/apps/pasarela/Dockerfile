FROM nginx:1.29.7

RUN rm /etc/nginx/conf.d/default.conf

COPY ./solidarian-http.conf.template /etc/nginx/templates/solidarian-http.conf.template
