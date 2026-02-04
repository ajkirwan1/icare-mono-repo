# #!/bin/bash
# # Initial DigitalOcean Droplet Setup Script
# # Run this once on a fresh Ubuntu droplet

# set -e

# echo "=== ICare Droplet Setup ==="

# # Update system
# apt update && apt upgrade -y

# # Install Docker
# curl -fsSL https://get.docker.com | sh
# systemctl enable docker
# systemctl start docker

# # Install Node.js 24 (for building)
# curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
# apt install -y nodejs

# # Install git
# apt install -y git

# # Create app directory
# mkdir -p /var/www/icare
# cd /var/www/icare

# # Clone the repository (replace with your repo URL)
# echo "Please run: git clone <your-repo-url> ."
# echo ""
# echo "Then create docker/.env.production with your production values:"
# echo "  - POSTGRES_PASSWORD (generate a strong password)"
# echo "  - PGADMIN_DEFAULT_PASSWORD (generate a strong password)"
# echo "  - RESEND_API_KEY (from resend.com)"
# echo "  - Other production values"
# echo ""
# echo "Finally, run the initial deployment:"
# echo "  npm ci"
# echo "  source docker/.env.production && npm run build --workspace=packages/ICare"
# echo "  cd docker && docker compose --env-file .env.production --profile prod up -d"
# echo ""
# echo "Setup complete! Configure your DNS to point to this droplet's IP."
