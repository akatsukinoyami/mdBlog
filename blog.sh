#!/bin/bash
ORANGE='\033[0;33m'
PURPLE='\033[0;35m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

function print_description {
  echo -e "${ORANGE} --- $* --- ${NC}"
}
function print_command {
  echo -e "${GRAY} RUN $* ${NC}"
}
function print_time {
  echo -e "${PURPLE} 🕓 Done in $*s ${NC}"
}

function fix_permissions {
  print_description "Fixing permissions for blog posts and pictures"
  print_command "chown -R $USER public/blog public/page && chmod -R 744 public/blog public/page"
  chown -R $USER public/blog public/page && chmod -R 744 public/blog public/page
}

function build {
  fix_permissions

  print_description "Generating tree of blog posts and pictures"
  print_command "node ./scripts/inspectMdFiles.js"
  node ./scripts/inspectMdFiles.js

  print_description "Generating rss feeds for every section"
  print_command "node ./scripts/generateRssFeed.js"
  node ./scripts/generateRssFeed.js

  print_description "Building project"
  print_command "yarn build"
  yarn build
}

function build_prod {
  start=$(date +%s)

  print_description "Deleting old archive"
  print_command "rm -f blog.tar.gz"
  rm -f blog.tar.gz

  build

  print_description "Generating arcive for caprover"
  print_command "tar czf blog.tar.gz public captain-definition Dockerfile nginx.conf"
  tar czf blog.tar.gz public captain-definition Dockerfile nginx.conf

  print_time "$(($(date +%s)-$start))"
}

function run {
  start=$(date +%s)
  build
  print_time "$(($(date +%s)-$start))"

  print_description "Starting up docker image"
  print_command "docker-compose up $2 $3 $4 $5 $6 $7 $8 $9"
  docker-compose up $2 $3 $4 $5 $6 $7 $8 $9
}

case $1 in
  b|build)  build;;
  chown)    fix_permissions;;
  p|prod)   build_prod;;
  r|run)    run;;
  help)     echo "
Accepted commands:

    b, build  - building project for futher running in container
    chown     - fix permissions for blog posts and pictures
    p, prod   - building and archiving for caprover
    r, run    - building and running in docker container
    h, help   - this message
";;
  *)        echo "Command not found, please, write $0 help ";;
esac
