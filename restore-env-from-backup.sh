#!/bin/bash
# Restore .env files from external backup

BACKUP_DIR=~/icare-env-backup

echo "🔄 Restoring .env files from: $BACKUP_DIR"
echo ""

# Check if backup exists
if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ Backup directory not found: $BACKUP_DIR"
  echo "Run ./backup-env.sh first to create a backup"
  exit 1
fi

# Check if backup files exist
if [ ! -f "$BACKUP_DIR/frontend.env.development" ]; then
  echo "❌ Backup files not found in $BACKUP_DIR"
  echo "Run ./backup-env.sh first to create a backup"
  exit 1
fi

# Confirm before restoring
echo "⚠️  This will overwrite your current .env files with backup versions."
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "📝 Restoring frontend .env..."
cp "$BACKUP_DIR/frontend.env.development" packages/ICare/.env.development
echo "  ✅ Restored: packages/ICare/.env.development"

echo "📝 Restoring API .env..."
cp "$BACKUP_DIR/api.env.development" packages/ICare/express-api/.env.development
echo "  ✅ Restored: packages/ICare/express-api/.env.development"

echo "📝 Restoring Docker production .env..."
cp "$BACKUP_DIR/docker.env.production" docker/.env.production
echo "  ✅ Restored: docker/.env.production"

echo "📝 Restoring Docker local .env..."
cp "$BACKUP_DIR/docker.env.local" docker/.env.local
echo "  ✅ Restored: docker/.env.local"

echo ""
echo "✨ Restore complete!"
echo ""
echo "Your .env files have been restored from backup."
echo ""
echo "Note: Files are protected with skip-worktree, so git won't show them as modified."
