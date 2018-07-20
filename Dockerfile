FROM gitlab.sdsc.edu:4567/aha/ubuntu1204-apache-php53:latest
MAINTAINER Anthony Ha <aha@sdsc.edu>

# Insert new site content
ADD sites/index.php /var/www/
ADD sites/css/ /var/www/
ADD sites/DataTables/ /var/www/
ADD sites/files/ /var/www/
ADD sites/images/ /var/www/
ADD sites/js/ /var/www/
ADD sites/myPHP/ /var/www/

# Set users/owners
# RUN useradd www-data
RUN chown -R www-data:www-data /var/www


# Set ports to be visible for container
# EXPOSE 80 443
CMD ["/usr/local/bin/run"]
