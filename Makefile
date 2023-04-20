DOCKER ?= docker

dev/start:
	$(DOCKER) compose -f docker-compose.yml up -d

dev/stop:
	$(DOCKER) compose -f docker-compose.yml stop

dev/clean:
	$(DOCKER) compose -f docker-compose.yml down
