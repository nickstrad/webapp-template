include .env

.PHONY: db/start
db/start:
	docker run  \
		--rm \
		--name comment-analyzer \
		-e POSTGRES_DB=${DB_NAME} \
		-e POSTGRES_USER=${DB_USER} \
		-e POSTGRES_HOST_AUTH_METHOD=trust  \
		-p 5432:5432  \
		-v "$(PWD)/database/init":/docker-entrypoint-initdb.d \
		postgres

.PHONY: db/getUsers
db/getUsers:
	npx tsx scripts/getUsers.ts


.PHONY: db/verifyUser
db/verifyUser:
	npx tsx scripts/verifyUser.ts

.PHONY: db/getUser
db/getUser:
	npx tsx scripts/getUser.ts