#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "❌ Missing .env at ${ENV_FILE}"
  exit 1
fi

TELEGRAM_API_BASE_URL="$(grep -E '^TELEGRAM_API_BASE_URL=' "${ENV_FILE}" | cut -d= -f2-)"

if [[ -z "${TELEGRAM_API_BASE_URL}" ]]; then
  echo "❌ TELEGRAM_API_BASE_URL is missing in .env"
  exit 1
fi

TELEGRAM_BOT_TOKEN="$(grep -E '^TELEGRAM_BOT_TOKEN=' "${ENV_FILE}" | cut -d= -f2-)"

if [[ -z "${TELEGRAM_BOT_TOKEN}" ]]; then
  echo "❌ TELEGRAM_BOT_TOKEN is missing in .env"
  exit 1
fi

TELEGRAM_CHAT_ID="$(grep -E '^TELEGRAM_CHAT_ID=' "${ENV_FILE}" | cut -d= -f2-)"

if [[ -z "${TELEGRAM_CHAT_ID}" ]]; then
  echo "❌ TELEGRAM_CHAT_ID is missing in .env"
  exit 1
fi

cd "${ROOT_DIR}"

exec mvn -pl backend quarkus:dev \
  -Dquarkus.rest-client.telegram-api.url="${TELEGRAM_API_BASE_URL}/bot${TELEGRAM_BOT_TOKEN}" \
  -Dtelegram.chat.id="${TELEGRAM_CHAT_ID}"
