#!/bin/bash

kubectl -n jx create configmap phpconfig --from-file="site/etc/php.ini"
