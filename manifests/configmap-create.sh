#!/bin/bash

kubectl -n jx delete configmap apache2-config 
kubectl -n jx delete configmap php-config
kubectl -n jx delete configmap cert
kubectl -n jx delete configmap key
kubectl -n jx delete configmap interm

kubectl -n jx create configmap apache2-config --from-file="../site/etc/httpd/conf/httpd.conf"
kubectl -n jx create configmap php-config --from-file="../site/etc/php.ini"
kubectl -n jx create configmap cert --from-file="../site/etc/pki/tls/certs/maersk_sdsc_edu_cert.crt"
kubectl -n jx create configmap key --from-file="../site/etc/pki/tls/private/maersk.key"
kubectl -n jx create configmap interm --from-file="../site/etc/pki/tls/certs/maersk_sdsc_edu_interm.crt"
