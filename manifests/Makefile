#NAME   := sdscgithub/mediawiki
#NAME   := dockerizedrupal/php-5.3
#NAME   := bylexus/apache-php53
NAME   := gitlab.sdsc.edu:4567/j2dangelo/php_version_5.3:holonet
TAG    := latest 
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest
GITLAB_TOKEN :="zznrLXLr1skpUWCmn9s_"
GITLAB_USERNAME :="gitlab-aha"

build:
	@docker build -t ${IMG} .

push:
	@docker push ${NAME}

login:
	@docker log -u ${GITLAB_USERNAME} -p ${GITLAB_TOKEN}
