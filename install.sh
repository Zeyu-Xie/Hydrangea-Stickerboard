#!/bin/bash

# Define variables for folder paths
PAGE_DIR="page"
FUNCTION_DIR="function"
PAGE_BUILD_DIR="$PAGE_DIR/build"
FUNCTION_TEMPLATES_DIR="$FUNCTION_DIR/templates"
FUNCTION_APP_DIR="$FUNCTION_DIR/app"
FUNCTION_SOURCES_DIR="$FUNCTION_APP_DIR/sources"

# Define custom targets
all() {
  install
  build
  apply_build
  clear_cache
}

install() {
  echo "Installing dependencies in page."
  cd "$PAGE_DIR" || exit
  npm install
  cd .. || exit
}

start() {
  echo "Starting the react project to debug."
  cd "$PAGE_DIR" || exit
  npm start
}

build() {
  echo "Running build process in page."
  cd "$PAGE_DIR" || exit
  npm run build
  cd .. || exit
}

apply_build() {
  echo "Copying the packed page project into the python project's folder."
  cp "$PAGE_BUILD_DIR/index.html" "$FUNCTION_TEMPLATES_DIR"
  cp -R "$PAGE_BUILD_DIR/" "$FUNCTION_APP_DIR"
  rm "$FUNCTION_DIR/index.html"
  mkdir "$FUNCTION_APP_DIR/sources"
}

run() {
  echo "Starting the project..."
  python3 "$FUNCTION_DIR/server.py"
}

clear_cache() {
  echo "Removing uploaded photos."
  rm -f "$FUNCTION_SOURCES_DIR"/*
  echo "Removing the output image."
  rm "$FUNCTION_APP_DIR/output.png"
}

clear() {
  echo "Removing dependencies in page."
  rm -rf "$PAGE_DIR/node_modules"
}

# Check the arguments and execute corresponding target
case "$1" in
  "all")
    all
    ;;
  "install")
    install
    ;;
  "start")
    start
    ;;
  "build")
    build
    ;;
  "apply_build")
    apply_build
    ;;
  "run")
    run
    ;;
  "clear_cache")
    clear_cache
    ;;
  "clear")
    clear
    ;;
  *)
    echo "Usage: $0 {all|install|start|build|apply_build|run|clear_cache|clear}"
    exit 1
    ;;
esac
