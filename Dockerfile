# Docker image based on alpine with the latest version of:
# - Golang
# - Node.js
# - Hugo

# Start from the latest version of the official Golang image
FROM golang:1.23-alpine

# Install Node.js
RUN apk add --no-cache nodejs npm

# Install Hugo
# RUN go install github.com/gohugoio/hugo@v0.120.3 
RUN go install github.com/gohugoio/hugo@latest

# Set the working directory
WORKDIR /src

# Configure the environment
ENV HUGO_BIND="localhost" \
    HUGO_DESTINATION="public" \
    HUGO_ENV="development" \
    HOME="/tmp"

# Set the default command to run when a new container is started
ENTRYPOINT ["hugo"]