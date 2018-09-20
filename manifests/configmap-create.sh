#!/bin/bash

kubectl -n jx delete configmap www-config-sdnap
kubectl -n jx delete configmap apache2-config-sdnap
kubectl -n jx delete configmap php-config-sdnap
kubectl -n jx delete configmap db-config-sdnap
kubectl -n jx delete configmap cert-sdnap
kubectl -n jx delete configmap key-sdnap
kubectl -n jx delete configmap interm-sdnap

kubectl -n jx create configmap www-config-sdnap "./site/sdnap"
kubectl -n jx create configmap apache2-config-sdnap --from-file="./site/etc/httpd/conf/httpd.conf"
kubectl -n jx create configmap php-config-sdnap --from-file="./site/etc/php.ini"
kubectl -n jx create configmap db-config-sdnap --from-file="./site/sdnap/db.php"
kubectl -n jx create configmap cert-sdnap --from-file="./site/etc/pki/tls/certs/maersk_sdsc_edu_cert.crt"
kubectl -n jx create configmap key-sdnap --from-file="./site/etc/pki/tls/private/maersk.key"
kubectl -n jx create configmap interm-sdnap --from-file="./site/etc/pki/tls/certs/maersk_sdsc_edu_interm.crt"
