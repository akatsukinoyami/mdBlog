#!/bin/bash
ORANGE='\033[0;33m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

function print_in_orange {
  echo -e "${ORANGE} --- $* --- ${NC}"
}
function print_in_gray {
  echo -e "${GRAY} $* ${NC}"
}

function fix_permissions {
  print_in_orange "Fixing permissions for blog posts and pictures"
  print_in_gray "RUN chown -R $USER public/blog public/page && chmod -R 744 public/blog public/page"
  chown -R $USER public/blog public/page && chmod -R 744 public/blog public/page
}

function build {
  fix_permissions

  print_in_orange "Generating tree of blog posts and pictures"
  print_in_gray "RUN node ./scripts/inspectMdFiles.js"
  node ./scripts/inspectMdFiles.js

  print_in_orange "Building project"
  print_in_gray "RUN yarn build"
  yarn build
}

function build_prod {
  print_in_orange "Deleting old archive"
  print_in_gray "RUN rm -f blog.tar.gz"
  rm -f blog.tar.gz

  build

  print_in_orange "Generating arcive for caprover"
  print_in_gray "RUN tar czf blog.tar.gz public captain-definition Dockerfile nginx.conf"
  tar czf blog.tar.gz public captain-definition Dockerfile nginx.conf
}

function run {
  build

  print_in_orange "Starting up docker image"
  print_in_gray "RUN docker-compose up $2 $3 $4 $5 $6 $7 $8 $9"
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
