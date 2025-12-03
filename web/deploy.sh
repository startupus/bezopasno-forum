#!/bin/bash

# Скрипт деплоя на сервер Beget
# Использование: ./deploy.sh

set -e

# Конфигурация сервера
HOST="j176759b.beget.tech"
USER="j176759b_forum"
PASSWORD="yJ&Db63*K44X"
# На Beget текущая директория при SSH подключении уже является public_html
REMOTE_PATH="."

# Локальная папка с собранным проектом
LOCAL_PATH="./dist"

echo "🚀 Начинаю деплой на $HOST..."

# Проверяем, что папка dist существует
if [ ! -d "$LOCAL_PATH" ]; then
    echo "❌ Ошибка: папка $LOCAL_PATH не найдена. Сначала выполните npm run build"
    exit 1
fi

# Добавляем хост в known_hosts (если еще не добавлен)
ssh-keyscan -H "$HOST" >> ~/.ssh/known_hosts 2>/dev/null || true

# Используем sshpass для автоматической передачи пароля через SSH
# Если sshpass не установлен, попробуем использовать ssh с ключом или запросим пароль вручную
if command -v sshpass &> /dev/null; then
    echo "📤 Загружаю файлы через SSH..."
    sshpass -p "$PASSWORD" rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.cache' \
        --exclude='cgi-bin' \
        --exclude='index.php' \
        "$LOCAL_PATH/" "$USER@$HOST:$REMOTE_PATH/"
else
    echo "⚠️  sshpass не установлен. Используем rsync с интерактивным вводом пароля..."
    echo "💡 Для автоматизации установите sshpass: brew install hudochenkov/sshpass/sshpass"
    rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.cache' \
        --exclude='cgi-bin' \
        --exclude='index.php' \
        "$LOCAL_PATH/" "$USER@$HOST:$REMOTE_PATH/"
fi

echo "✅ Деплой завершен успешно!"
echo "🌐 Сайт доступен по адресу: https://forum.bezopasno.org/"

