sudo apt-get update
sudo apt-get install -y xvfb libasound2 wget
wget -q https://github.com/jgraph/drawio-desktop/releases/download/v29.6.1/drawio-amd64-29.6.1.deb -O drawio-amd64-29.6.1.deb
# Use apt to install the local .deb so dependencies are resolved automatically
sudo apt-get install -y ./drawio-amd64-29.6.1.deb