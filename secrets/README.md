# Create certs for trusted domains with Let's Encrypt

## letscencrypt #le #ssl

* add certbot repo
```
sudo add-apt-repository ppa:certbot/certbot 
```
* Install certbot
```
sudo apt-get update &&  sudo apt-get install certbot 
```
## make haproxy do proxy for LEs:
* add these lines to haproxy's frontend
```
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

```
## add new backend

* add these lines to haproxy's backend
```
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8888
```

## request certificate:

```
sudo certbot certonly --standalone --preferred-challenges http --http-01-port 8888 -d tasktracker.sdsc.edu -d sdnap.sdsc.edu

```

## combine cert and private key:
```
cat /etc/letsencrypt/live/tasktracker.sdsc.edu/fullchain.pem /etc/letsencrypt/live/tasktracker.sdsc.edu/privkey.pem > /etc/ssl/tasktracker.sdsc.edu.pem
```
## add result to cert-list:
```
echo "/etc/ssl/tasktracker.sdsc.edu.pem" >> /etc/ssl/cert.list

```
## reload HAproxy:
```
/etc/init.d/haproxy reload
```
