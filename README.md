#  Port SDNAP site to K8s as POC

## Status
* Extracted holonet.sdsc.edu content and sites with docker containers and persistent volumes
* Checked relevant files into git@gitlab.sdsc.edu:aha/holonet.git
* in branch v0.2 created sdnap-deploy.yaml which includes:
    + replication deploy
    + services
#    + persistent volumes (nfs) - nfs server (caas.sdsc.edu)
#    + pv claim

## TODO
* Create mysql service in k8s
* Get sdnap and tasktracker to work in deployment (mysql backend)
* Port config parameters for apache, php, mysql
* Sevices endpoint in clusterIP service-name.namespace.cluster.local (mysql backend)

## DONE
* Complete CI/CD pipeline with shared runner
* Create CI/CD pipeline for auto build of php images
* Create Dockerfile and docker-compose
* Start with building exact version of php/apache docker images 
* Create docker-compose to map volumes and start up services
* GUI: kubernetes dashboard

# Kubernetes

* Create deployment replication service and persistent volumes for Mediawiki and Services

* Mediawiki should only need 1 container (1) apache/php/mediawiki and (1) volumeclaim for content (sqlite) (3) configmap for mediawiki config (4) secret for mediawiki 

* (3) and (4) can be done later
* How to handle tls endpoints? these sites have certificates

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







