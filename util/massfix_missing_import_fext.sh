#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function addfexts () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  # cd -- "$SELFPATH" || return $?

  exec < <(eslint --ext js,mjs . | sed -urf <(echo '
    s~^ *([0-9]+):[0-9]+ +error +Missing file extension "(\S+)" for "(\S+|$\
      )" +import/extensions$~!:missfext \2 \3 \1~
    ')) || return $?
  local LN= SRC_FN=
  while IFS= read -r LN; do
    case "$LN" in
      '' ) continue;;
      /*.mjs ) SRC_FN="$LN"; continue;;
      '!:missfext '* )
        LN="${LN#*:}"
        fix_"${LN%% *}" "${LN#* }" || return $?;;
      * ) echo "W: eslint says: '$LN'" >&2;;
    esac
  done
}


function fix_missfext () {
  local ARG="$1"
  local FEXT="${ARG%% *}"; ARG="${ARG#* }"
  local REF="${ARG%% *}"; ARG="${ARG#* }"
  local LNUM="$ARG"
  echo "D: Add fext .$FEXT to $SRC_FN line $LNUM:"
  sed -re "$LNUM"'s~(\x27|\x22);?$~.'"$FEXT"'&~' -i -- "$SRC_FN" || return $?
}










addfexts "$@"; exit $?
