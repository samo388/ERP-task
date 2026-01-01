#!/bin/bash

echo "íº€ Creating enterprise NestJS structure..."

BASE_DIR="src"

# Auth Module
mkdir -p $BASE_DIR/auth/{dto,strategies}
touch $BASE_DIR/auth/auth.controller.ts
touch $BASE_DIR/auth/auth.service.ts
touch $BASE_DIR/auth/auth.module.ts

# Users Module
mkdir -p $BASE_DIR/users/{dto,schemas}
touch $BASE_DIR/users/users.controller.ts
touch $BASE_DIR/users/users.service.ts
touch $BASE_DIR/users/users.module.ts

# Tasks Module
mkdir -p $BASE_DIR/tasks/{dto,schemas}
touch $BASE_DIR/tasks/tasks.controller.ts
touch $BASE_DIR/tasks/tasks.service.ts
touch $BASE_DIR/tasks/tasks.module.ts

# Common (Shared)
mkdir -p $BASE_DIR/common/{decorators,guards,enums,filters}

# Config
mkdir -p $BASE_DIR/config
touch $BASE_DIR/config/database.config.ts

echo "âœ… Enterprise structure created successfully!"
