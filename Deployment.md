# Deployment command

## Build

Build project first
```sh
npm run build
```

Build image
```sh
docker build -t fra-web .
```

macos silicon chip (to support run on linux amd64)
```sh
docker build -t fra-web . --platform linux/amd64
```

## Run Container
```sh
docker run -dp 8080:80 --name fra-web-app --restart unless-stopped fra-web
```

