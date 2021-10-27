#!/bin/bash
            echo "build api image"
            echo 9pzefevmYkxQ7g6DNoEx | docker login registry.gitlab.com -u viavallen --password-stdin
            docker build -t registry.gitlab.com/viavallen/kentang-goreng/aimi_mothership_dashboard:latest .
            docker push registry.gitlab.com/viavallen/kentang-goreng/aimi_mothership_dashboard:latest
            