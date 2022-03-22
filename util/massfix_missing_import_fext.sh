#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function addfexts () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  # cd -- "$SELFPATH" || return $?

  exec < <(eslint --ext js,mjs . | sed -urf <(echo '
    s~^ *([0-9]+):[0-9]+ +error +Missing file extension "(\S+)" for "(\S+|$\
      )" +import/extensions$~!:missfext \2 \3 \1~
    s~^ *1:1 +error +Use the global form of \x27use strict\x27  strict$|$\
      ~!global_use_strict~
    ')) || return $?
  local ABS_PWD="$(readlink -m .)"
  local LN=
  local SRC_FN=
  local ERR_CNT_IN_FILE=
  while IFS= read -r LN; do
    case "$LN" in
      '' ) continue;;
      /*.js | \
      /*.mjs )
        LN="${LN#"$ABS_PWD/"}"
        SRC_FN="$LN"
        ERR_CNT_IN_FILE=0
        continue;;
      '!:missfext '* )
        LN="${LN#*:}"
        fix_"${LN%% *}" "${LN#* }" || return $?;;
      !global_use_strict )
        LANG=C sed -re '1s~^(\xEF\xBB\xBF|)~&\x27use strict\x27;\n~' \
          -i -- "$SRC_FN" || return $?;;
      * )
        [ "$ERR_CNT_IN_FILE" == 0 ] && echo "W: In file '$SRC_FN':" >&2
        (( ERR_CNT_IN_FILE += 1 ))
        echo "W: eslint says: '$LN'" >&2
        ;;
    esac
  done
}


function fix_missfext () {
  local ARG="$1"
  local FEXT="${ARG%% *}"; ARG="${ARG#* }"
  local REF="${ARG%% *}"; ARG="${ARG#* }"
  local LNUM="$ARG"
  echo "D: Add fext .$FEXT to file '$SRC_FN' line $LNUM:"
  local SED=(
    sed -re
    "$LNUM"'s~(\x27|\x22)\)?;?$~.'"$FEXT"'&~'
    -i -- "$SRC_FN"
    )
  "${SED[@]}" || return $?$(echo "W: sed failed, rv=$?" >&2)
}










addfexts "$@"; exit $?
