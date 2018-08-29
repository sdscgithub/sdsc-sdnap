#  Debugging a service

## Monitoring ingress

* get pod and watch live logs

```
kube-shell> kubectl get pod
NAME                                                          READY     STATUS    RESTARTS   AGE
busybox                                                       1/1       Running   0          5h
nginx-8586cf59-5zb5d                                          1/1       Running   0          19h
sdnap-5fbcc6b775-b7bqz                                        1/1       Running   0          34m
sdnap-5fbcc6b775-g69j2                                        1/1       Running   0          34m
sdnap-5fbcc6b775-zx85k                                        1/1       Running   0          34m
sdsc-ingress-nginx-ingress-controller-7ff7664fc7-5bskm        1/1       Running   0          5h
sdsc-ingress-nginx-ingress-default-backend-69dc6c5bd8-7p5qw   1/1       Running   0          17h

kube-shell> kubectl logs -f sdsc-ingress-nginx-ingress-controller-7ff7664fc7-5bskm

```



 1971  bg
 1972  kubectl run -it --rm --restart=Never busybox --image=busybox sh
 1973  kubectl get pod
 1974  kubectl delete pod busybox
 1975  kubectl run -it --rm --restart=Never busybox --image=busybox sh
 1976  kubect get pod
 1977  kubectl get pod
 1978  kubectl run -it --rm --restart=Never busybox --image=busybox sh
 1979  cdholo
 1980  kubectl get svc
 1981  kubectl run -it --rm --restart=Never busybox --image=busybox sh
 1982  r
 1983  kubectl get svc
 1984  kubectl get svc sdnap -o json
 1985  kubectl get deployment
 1986  kubectl get deployment sdnap -o json
 1987  kubectl get svc sdnap -o json
 1988  kubectl get endpoints sdnap
 1989  wget -q0- 10.34.0.3:80
 1990  wget 10.34.0.3:80
