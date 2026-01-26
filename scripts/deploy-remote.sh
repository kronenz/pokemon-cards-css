#!/bin/bash
set -e

REMOTE_HOST="dron1999@10.254.0.96"
REMOTE_DIR="/home/dron1999/photo-cards-backend"
PROJECT_NAME="photo-cards"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

log_info "Starting deployment to ${REMOTE_HOST}..."

log_info "Creating remote directory structure..."
ssh ${REMOTE_HOST} "mkdir -p ${REMOTE_DIR}/pocketbase/{pb_data,pb_public,migrations}"

log_info "Transferring deployment files..."
scp docker-compose.remote.yml ${REMOTE_HOST}:${REMOTE_DIR}/docker-compose.yml
scp .env.remote ${REMOTE_HOST}:${REMOTE_DIR}/.env
scp Dockerfile.pocketbase ${REMOTE_HOST}:${REMOTE_DIR}/

log_info "Stopping existing containers (if any)..."
ssh ${REMOTE_HOST} "cd ${REMOTE_DIR} && docker compose down 2>/dev/null || true"

log_info "Building and starting containers..."
ssh ${REMOTE_HOST} "cd ${REMOTE_DIR} && docker compose up -d --build"

log_info "Waiting for services to start..."
sleep 15

log_info "Checking service status..."
ssh ${REMOTE_HOST} "docker ps --filter 'name=photo-cards' --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"

log_info "Testing PocketBase health..."
if ssh ${REMOTE_HOST} "curl -sf http://localhost:18090/api/health" > /dev/null 2>&1; then
    log_success "PocketBase is running on port 18090"
else
    log_warning "PocketBase health check failed (may need more time to start)"
fi

log_info "Testing MinIO health..."
if ssh ${REMOTE_HOST} "curl -sf http://localhost:19000/minio/health/live" > /dev/null 2>&1; then
    log_success "MinIO is running on ports 19000/19001"
else
    log_warning "MinIO health check failed (may need more time to start)"
fi

log_info "Testing Redis..."
if ssh ${REMOTE_HOST} "docker exec photo-cards-redis-remote redis-cli -a photocards123 ping 2>/dev/null | grep -q PONG"; then
    log_success "Redis is running on port 16379"
else
    log_warning "Redis health check failed"
fi

log_success "Deployment completed!"
echo ""
log_info "Service URLs:"
log_info "  - PocketBase Admin: http://10.254.0.96:18090/_/"
log_info "  - PocketBase API:   http://10.254.0.96:18090/api/"
log_info "  - MinIO Console:    http://10.254.0.96:19001/"
log_info "  - MinIO API:        http://10.254.0.96:19000/"
log_info "  - Redis:            10.254.0.96:16379"
echo ""
log_info "To connect frontend, set in .env.local:"
log_info "  PUBLIC_API_URL=http://10.254.0.96:18090"
