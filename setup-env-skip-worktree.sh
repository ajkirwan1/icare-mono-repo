#!/bin/bash
# Setup script to protect .env files with skip-worktree
# This ensures they persist locally but changes are never committed

set -e

echo "🔧 Setting up .env files with skip-worktree protection..."
echo ""

# List of .env files to protect
ENV_FILES=(
  "packages/ICare/.env.development"
  "packages/ICare/express-api/.env.development"
  "docker/.env.production"
  "docker/.env.local"
)

# Add each file to git and apply skip-worktree
for file in "${ENV_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Processing: $file"

    # Add file to git (force if ignored)
    git add -f "$file"
    echo "  ✅ Added to git"

  else
    echo "  ⚠️  File not found: $file"
  fi
done

echo ""
echo "🎯 Committing .env template files..."
git commit -m "chore: add .env files with skip-worktree protection

- Frontend: packages/ICare/.env.development
- Backend: packages/ICare/express-api/.env.development
- Docker Production: docker/.env.production
- Docker Local: docker/.env.local

These files are tracked but local changes will be ignored via skip-worktree."

echo ""
echo "🔒 Applying skip-worktree to all .env files..."
for file in "${ENV_FILES[@]}"; do
  if [ -f "$file" ]; then
    git update-index --skip-worktree "$file"
    echo "  ✅ Protected: $file"
  fi
done

echo ""
echo "✨ Done! Your .env files are now protected:"
echo ""
echo "  ✅ Files are tracked in git (won't be deleted)"
echo "  ✅ Local changes are ignored (won't be committed)"
echo "  ✅ Files persist through branch switches"
echo ""
echo "To verify, run:"
echo "  git ls-files -v | grep '^S'"
echo ""
echo "To unprotect a file (if needed):"
echo "  git update-index --no-skip-worktree <file>"
