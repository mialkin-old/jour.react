# Jour

## Running in Docker

```bash
cd Jour.React
docker build -t mialkin/jour.react .
docker run -d -p 4000:80 --name jour.react mialkin/jour.react
```

## Running without Docker

```bash
cd Jour.React
npm install
npm start
```
