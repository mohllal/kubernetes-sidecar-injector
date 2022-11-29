# Kubernetes Sidecar Injector

This repo contains the complete code for my [Kubernetes Sidecar Container Injection Medium article](https://medium.com/@mohllal/kubernetes-sidecar-container-injection-61ecfcc7b22b) to create a Kubernetes mutating admission controller that injects a [busybox-curl](https://hub.docker.com/r/yauritux/busybox-curl) sidecar container into pods.

## Requirments

- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/reference/kubectl/)
- [Helm](https://helm.sh/)
- Access to a Kubernetes v1.19+ cluster

## Deploying

1. Install the `kubernetes-sidecar-injector` chart

```shell
helm install kubernetes-sidecar-injector charts/kubernetes-sidecar-injector/ \
--values charts/kubernetes-sidecar-injector/values.yaml \
--namespace default
```

2. Install the `httpbin` chart

```shell
helm install httpbin charts/httpbin/ \
--values charts/httpbin/values.yaml \
--namespace default
```

3. Listing all containers in the httpbin Deployment's Pod, you can notice that a new container is running in it named `curl`.

```shell
export POD_NAME=$(kubectl get pods \
--namespace default \
-l "app.kubernetes.io/name=httpbin,app.kubernetes.io/instance=httpbin" \
-o jsonpath="{.items[0].metadata.name}")

kubectl get pods $POD_NAME \
--namespace default \
-o jsonpath='{.spec.containers[*].name}'
```

4. Accessing the httpbin HTTP server from inside the curl container.

```shell
export POD_NAME=$(kubectl get pods \
--namespace default \
-l "app.kubernetes.io/name=httpbin,app.kubernetes.io/instance=httpbin" \
-o jsonpath="{.items[0].metadata.name}")

kubectl exec $POD_NAME \
--namespace default \
-c curl \
-- curl http://localhost/anything
```
