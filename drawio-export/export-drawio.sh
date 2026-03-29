set -euo pipefail
OUTPUT_FILE="$(Build.SourcesDirectory)/docs/images/arc-k8-architecture.png"
INPUT_FILE="$(Build.SourcesDirectory)/design/arc-k8-architecture.drawio"
mkdir -p "$(Build.SourcesDirectory)/docs/images"
test -f "$INPUT_FILE"
export ELECTRON_DISABLE_SANDBOX=1
export ELECTRON_EXTRA_LAUNCH_ARGS="--no-sandbox --disable-setuid-sandbox --disable-gpu"
unset DBUS_SESSION_BUS_ADDRESS || true

xvfb-run -a drawio --export --format png --transparent --output "$OUTPUT_FILE" "$INPUT_FILE"