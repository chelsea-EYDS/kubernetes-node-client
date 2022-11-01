
run-local:
	@docker-compose up -d

build-local:
	@docker-compose up --build -d

local-logs:
	@docker logs scaledown --tail 25 --follow

build-push:
	@docker build --platform linux/amd64  -t eydscasandbox.azurecr.io/cronjob/scaledown:latest ./server
	@docker push eydscasandbox.azurecr.io/cronjob/scaledown:latest
	
close-local:
	@docker-compose down 
