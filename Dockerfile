FROM gitlab.sdsc.edu:4567/aha/ubuntu1204-apache-php53:latest
MAINTAINER Anthony Ha <aha@sdsc.edu>

# Insert new site content
COPY sites/index.php /var/www/
COPY sites/css/ /var/www/
COPY sites/DataTables/ /var/www/
COPY sites/files/ /var/www/
COPY sites/images/ /var/www/
COPY sites/js/ /var/www/
COPY sites/myPHP/ /var/www/

# Set users/owners
# RUN useradd www-data
RUN chown -R www-data:www-data /var/www


# Set ports to be visible for container
# EXPOSE 80 443
CMD ["/usr/local/bin/run"]
