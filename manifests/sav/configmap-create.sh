#!/bin/bash

kubectl create configmap phpconfig --from-file="site/etc/php.ini"
