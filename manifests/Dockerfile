#FROM php:5.5-apache
FROM gitlab.sdsc.edu:4567/j2dangelo/php_version_5.3:holonet

# Container listens to this TCP port
EXPOSE 80 443

# copy custom files to container
ADD site/etc/php.ini /usr/local/lib

# install needed stuff
#RUN apt-get update -qq && apt-get install -y sqlite
