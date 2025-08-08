#!/bin/bash

PROJECT_DIR=$(pwd)
echo "👉 Entrando na raiz do projeto: $PROJECT_DIR"

echo "🚀 Iniciando Minikube..."
minikube start

echo "✅ Exportando ambiente Docker para Minikube"
eval $(minikube -p minikube docker-env)

echo "🔨 Construindo imagem local..."
docker build -t fastfood-api:latest .

echo "⚙️  Criando arquivos de configuração..."
kubectl apply -f infra/k8s/configmap.yaml
kubectl apply -f infra/k8s/secret.yaml

# Sobe o PostgreSQL
echo "🐘 Subindo PostgreSQL..."
kubectl apply -f infra/k8s/postgres/postgres-deployment.yaml
kubectl apply -f infra/k8s/postgres/postgres-service.yaml

echo "📦 Subindo FastFood Api app..."
kubectl apply -f infra/k8s/deployment.yaml
kubectl apply -f infra/k8s/service.yaml

echo "🌐 Listando pods e serviços:"
kubectl get pods
kubectl get svc