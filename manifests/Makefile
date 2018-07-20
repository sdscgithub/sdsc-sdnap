#NAME   := sdscgithub/mediawiki
#NAME   := dockerizedrupal/php-5.3
NAME   := bylexus/apache-php53
TAG    := latest 
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest

build:
	@docker build -t ${IMG} .

push:
	@docker push ${NAME}

login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}
