#!/bin/bash


sudo docker exec -it my_postgres_container psql -U postgres -c "DROP DATABASE test;"; sudo docker exec -it my_postgres_container psql -U postgres -c "CREATE DATABASE test;" && export FOR_TESTING=y && npx knex migrate:latest
