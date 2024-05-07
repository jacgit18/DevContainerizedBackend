#!/bin/bash

# Drop the existing database
sudo docker exec my_postgres_container psql -U postgres -c "DROP DATABASE IF EXISTS postgres;"

# Create a new database
sudo docker exec my_postgres_container psql -U postgres -c "CREATE DATABASE postgres;"

# Export environment variable
export FOR_TESTING=y

# Run migrations using knex
npx knex migrate:latest
