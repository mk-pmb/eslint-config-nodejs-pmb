#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function pdr_cli_init () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  set -o errexit -o pipefail
  trap 'echo T: "Failed at $BASH_SOURCE line $LINENO: $BASH_COMMAND" >&2' ERR

  local REPO_DIR="$(readlink -m -- "$BASH_SOURCE"/../..)"
  cd -- "$REPO_DIR" || return $?

  local PFX="$REPO_DIR/tmp.rls"
  mkdir --parents -- "$PFX"
  PFX+='/debug.'
  zip -r9 "$PFX".node_modules.zip -- node_modules/ package*.json
  ( cd .ghciu && zip -r9 "$PFX".ghciu_logs.zip -- log* )
}










pdr_cli_init "$@"; exit $?
