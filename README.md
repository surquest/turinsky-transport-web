cd # turinsky-transport-web
Static website for Turinsky Transport

# Gettin started

## Prerequisites

Build docker image
```powersheel
docker build -t hugo -f Dockerfile .
```

Run docker container
```powersheel
docker run -it --rm `
 -v "${pwd}/src:/src" `
 -p "1313:1313" `
 hugo `
 server -D --bind 0.0.0.0 --poll 1s

docker run --rm -it `
  -v "${pwd}/src:/src" `
  -p 8080:1313 `
  klakegg/hugo:0.129.0 `
  server -D
```