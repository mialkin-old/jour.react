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

## Pushing image to gcr

Auth to GCP first:

```bash
gcloud config set project helical-patrol-307414
gcloud auth login
gcloud auth configure-docker

```

Tag and push:

```bash
docker tag mialkin/jour.react gcr.io/helical-patrol-307414/jour.react

docker push gcr.io/helical-patrol-307414/jour.react
```

## Running in GKE

```bash
cd deploy
kubectl kubectl apply -f deployment.yaml
```

Make sure that the service is runnig:

```bash
kubectl port-forward --namespace mialkin svc/jour-react 8080:80
```


