# Scaledown Cronjob

Intended for use during development to scaledown the replicasets for all of the deployments in the sandbox kubernetes cluster each night to avoid continuosly running applications and incurring cost.

## Environment Variables

To run this project, you will need create a secret which contains the credentials details for the cluster.

    cd ~/.kube && create secret generic kubeconfig --from-file=config -n cronjob

To run locally:

`export KUBE_CONFIG="$( cat ~/.kube/config )"`

## Running the Project

Build and Push (edit make file to change cr name):

    make build-push

Update image name in cron.yml:

    spec:
        image: <container-registery>/<namespace>/scaledown:latest

Ensure you are connected to the cluster (minikube/azure/etc), then:

    kubectl apply -f ./k8s/cron.yml -n <namespace>

## Related

[Sandbox Project Repo](https://github.com/EYDS-CA/workshop-kubernetes)

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
