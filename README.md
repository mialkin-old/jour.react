# Jour.React

- [Jour.React](#jourreact)
  - [Running with npm](#running-with-npm)
  - [Running with Docker](#running-with-docker)
  - [Pushing image to gcr.io](#pushing-image-to-gcrio)
  - [Running in GKE](#running-in-gke)

## Running with npm

```bash
cd Jour.React
npm install
npm start
```

## Running with Docker

```bash
cd Jour.React
docker build -t mialkin/jour.react .
docker run -d -p 4000:80 --name jour.react mialkin/jour.react
```

## Pushing image to gcr.io

Auth to GCP first:

```bash
gcloud config set project helical-patrol-307414
gcloud auth login
gcloud auth configure-docker
```

Build, tag and push:

```bash
docker build -t gcr.io/helical-patrol-307414/jour.react .
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
