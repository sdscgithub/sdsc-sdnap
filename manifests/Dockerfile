FROM gitlab.sdsc.edu:4567/aha/ubuntu1204-apache-php53:latest
MAINTAINER Anthony Ha <aha@sdsc.edu>

# Insert new site content
COPY ./site/sdnap /var/www/


# Set users/owners
# RUN useradd www-data
RUN chown -R www-data:www-data /var/www
RUN mkdir -p /etc/pki/tls/certs
RUN mkdir -p /etc/pki/tls/private
RUN mkdir -p /var/run/apache2

RUN apt-get install -y mysql-client curl vim

# example running commands in the containers
#CMD ["echo ", "198.202.90.177 sdnap.sdsc.edu ", ">>" , "/etc/hosts"]



# Set ports to be visible for container
EXPOSE 80 443
CMD ["/usr/local/bin/run"]
