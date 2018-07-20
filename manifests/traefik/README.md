# Set up Traefik on sdsc cluster

Deploying a reverse proxy to manage application routings using Ingress controller.


## Installation 

```
kubectl apply -f ./traefik-deployment.yaml

```

## Install ClusterRoleBinding

```
kubectl apply -f https://raw.githubusercontent.com/containous/traefik/master/examples/k8s/traefik-rbac.yaml
clusterrole "traefik-ingress-controller" created
clusterrolebinding "traefik-ingress-controller" created

```

## install traefik UI

```
kubectl apply -f https://raw.githubusercontent.com/containous/traefik/master/examples/k8s/ui.yaml
```
or

```
helm install stable/traefik
```

## Authentication

```
htpasswd -c ./auth sdsc

kubectl create secret generic mysecret --from-file ../auth --namespace=kube-system

```

## TLS

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=traefik-ui"
kubectl -n kube-system create secret tls traefik-ui-tls-cert --key=tls.key --cert=tls.crt

```

## Create certificate in "monitoring" namespace



