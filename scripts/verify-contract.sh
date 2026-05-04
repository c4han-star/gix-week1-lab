#!/usr/bin/env bash
# Run against a local Next server: npm run dev   OR   npm run build && npx next start
set -euo pipefail
BASE="${BASE:-http://127.0.0.1:3000}"

echo "=== D.1 contract checks against ${BASE} ==="
echo
echo "--- 1 valid ---"
curl -sS -w "\nHTTP %{http_code}\n" "${BASE}/api/weather?lat=47.6062&lon=-122.3321" | head -c 500
echo
echo "--- 2 invalid lat ---"
curl -sS -w "\nHTTP %{http_code}\n" "${BASE}/api/weather?lat=999&lon=-122"
echo
echo "--- 3 invalid lon ---"
curl -sS -w "\nHTTP %{http_code}\n" "${BASE}/api/weather?lat=47&lon=999"
echo
echo "Done."
