#!/usr/bin/env bash
set -euo pipefail
BACKUP_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"
cd "$REPO_ROOT"

while IFS= read -r rel; do
  [ -z "$rel" ] && continue
  mkdir -p "$(dirname "$rel")"
  cp "$BACKUP_DIR/$rel" "$rel"
done < "$BACKUP_DIR/files.txt"

echo "Restored files from: $BACKUP_DIR"
