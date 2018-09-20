# Create new users for Traefik auth

```
ath038@maersk:~$ htpasswd -c auth ath038
New password:
Re-type new password:
Adding password for user ath038
ath038@maersk:~$ htpasswd auth manager
New password:
Re-type new password:
Adding password for user manager

```
## Add to k8s secrets annotations

```
ath038@maersk:~$ k edit secret basicauthpasswd
secret/basicauthpasswd 
```
## add more user
```
ath038@maersk:~$ htpasswd auth user1
New password: (sdsc2connect!)
Re-type new password:  
Adding password for user user1
ath038@maersk:~$ cat auth |base64 -w 0
ath038@maersk:~$ k edit secret basicauthpasswd

