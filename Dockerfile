FROM gitlab.sdsc.edu:4567/aha/ubuntu1204-apache-php53:latest
MAINTAINER Anthony Ha <aha@sdsc.edu>

# Insert new site content
COPY ./site/www/sdnap /var/www/


# Set users/owners
# RUN useradd www-data
RUN chown -R www-data:www-data /var/www
RUN mkdir -p /etc/pki/tls/certs
RUN mkdir -p /etc/pki/tls/private
RUN mkdir -p /var/run/apache2

# create entry in /etc/hosts for testing only
RUN echo "198.202.90.177 sdnap.sdsc.edu " >> /etc/hosts
RUN echo "198.202.90.177 services.sdsc.edu " >> /etc/hosts
RUN echo "198.202.90.177 tasktracker.sdsc.edu " >> /etc/hosts
RUN echo "198.202.90.177 itss.sdsc.edu " >> /etc/hosts


# this entry should be a dns record in production
#CMD ["echo ", "198.202.90.177 sdnap.sdsc.edu ", ">>" , "/etc/hosts"]



# Set ports to be visible for container
EXPOSE 80 443
CMD ["/usr/local/bin/run"]
