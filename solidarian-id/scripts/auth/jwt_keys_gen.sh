#!/bin/bash

# Genera clave privada RSA 2048
PRIVATE_KEY=$(openssl genrsa 2048 2>/dev/null)

# Deriva la clave pública
PUBLIC_KEY=$(echo "$PRIVATE_KEY" | openssl rsa -pubout 2>/dev/null)

# Convierte a Base64 single-line
PRIVATE_B64=$(echo "$PRIVATE_KEY" | base64 -w 0)
PUBLIC_B64=$(echo "$PUBLIC_KEY" | base64 -w 0)

echo ""
echo "JWT_PRIVATE_KEY_BASE64=$PRIVATE_B64"
echo ""
echo "JWT_PUBLIC_KEY_BASE64=$PUBLIC_B64"
