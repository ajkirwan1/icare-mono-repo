#!/bin/bash
# Backup all .env files to external directory (outside repo)

BACKUP_DIR=~/icare-env-backup
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "💾 Backing up .env files to: $BACKUP_DIR"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup each file
echo "📝 Backing up frontend .env..."
cp packages/ICare/.env.development "$BACKUP_DIR/frontend.env.development"
echo "  ✅ Saved: frontend.env.development"

echo "📝 Backing up API .env..."
cp packages/ICare/express-api/.env.development "$BACKUP_DIR/api.env.development"
echo "  ✅ Saved: api.env.development"

echo "📝 Backing up Docker production .env..."
cp docker/.env.production "$BACKUP_DIR/docker.env.production"
echo "  ✅ Saved: docker.env.production"

echo "📝 Backing up Docker local .env..."
cp docker/.env.local "$BACKUP_DIR/docker.env.local"
echo "  ✅ Saved: docker.env.local"

# Create timestamped archive
echo ""
echo "📦 Creating timestamped archive..."
ARCHIVE_DIR="$BACKUP_DIR/archives"
mkdir -p "$ARCHIVE_DIR"
tar -czf "$ARCHIVE_DIR/env-backup-$TIMESTAMP.tar.gz" \
  -C "$BACKUP_DIR" \
  frontend.env.development \
  api.env.development \
  docker.env.production \
  docker.env.local

echo "  ✅ Archive: env-backup-$TIMESTAMP.tar.gz"

echo ""
echo "✨ Backup complete!"
echo ""
echo "Backup location: $BACKUP_DIR"
echo "Archive location: $ARCHIVE_DIR"
echo ""
echo "To restore, run: ./restore-env-from-backup.sh"
