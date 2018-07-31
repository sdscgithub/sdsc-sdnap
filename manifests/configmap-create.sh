#!/bin/bash

kubectl -n jx delete configmap apache2-config 
kubectl -n jx delete configmap php-config 
kubectl -n jx create configmap apache2-config --from-file="site/etc/httpd/conf/httpd.conf"
kubectl -n jx create configmap php-config --from-file="site/etc/php.ini"
