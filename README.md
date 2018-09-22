#  Port SDNAP site to K8s as POC

Note: Documentation in progress..

## Status

* Extracted holonet.sdsc.edu content and sites with docker containers and persistent volumes
* Checked relevant files into git@gitlab.sdsc.edu:aha/holonet.git
* Created sdnap K8s annotations for 
    + deployments
    + services
    + pv 
    + pv claim
    + Ingress with Traefik
    + Loadbalance with HAProxy 

## TODO
* persistent volumes (nfs) - nfs server (caas.sdsc.edu)

## DONE

* Create mysql service in k8s
* Get sdnap and tasktracker to work in deployment (mysql backend)
* Port config parameters for apache, php, mysql
* Sevices endpoint in clusterIP sdnap.jx.cluster.local (mysql backend)
* Complete CI/CD pipeline with shared runner
* Create CI/CD pipeline for auto build of php images
* Create Dockerfile and docker-compose
* Start with building exact version of php/apache docker images 
* Create docker-compose to map volumes and start up services
* GUI: kubernetes dashboard
* GUI: traefik dashboard

# Kubernetes

## Installation notes 


### Deployment should have:

* 2 containers : (1) php/apache  (2) mysql 
* volumeclaims (3) for mysql data
* configmap (4) mysql secret (5)
* How to handle tls endpoints? these sites have certificates

## authentication via traefik
```
apiVersion: v1
data:
  auth: YXRoMDM4OiRhcHIxJEV0a2JZWkhOJFlQTmhxcGJGb244QlJjY25pMTJyNC8K
kind: Secret
metadata:
  name: basicauthpasswd
  namespace: jx

```

## How to create password file for basic auth
1. Generated a htpasswd file named auth

```
$ htpasswd -c auth_ath038 ath038
New password: 
Re-type new password: 

```
2. Create a secret yaml file name 
## authentication via traefik
```
apiVersion: v1
data:
  auth: YXRoMDM4OiRhcHIxJEV0a2JZWkhOJFlQTmhxcGJGb244QlJjY25pMTJyNC8K
kind: Secret
metadata:
  name: basicauthpasswd
  namespace: jx

```

## Create new k8s secret from auth file:

```
$ kubectl create secret generic basicauthpasswd --from-file auth_ath038

```

## Test and Verify







