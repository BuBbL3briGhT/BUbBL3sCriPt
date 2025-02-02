alias hi="echo hello"

alias gs="git status"
alias gd="git diff"
alias gdc="git diff --cached"
alias gp="git push"
alias ga="git add"
alias gl="git log --oneline"
alias aa="git add . && git status"
alias s="git status"
alias p="cd ~/projects"
alias 🍬="git commit -m🍬"
alias 🍭="git commit -m🍭"
alias 🍉="git commit -m🍉"
alias 🍫="git commit -m🍫"
alias gc="git commit -m"
alias+="git add .; git status; git diff --cached"
# alias ++="+ ."
# alias ++="aa;
# unalias ++;
alias ++="quickcommit"


function quickcommit() {
  git add .
  git status
  git diff --cached
  if [ $# -gt 0 ]; then
    for arg in $@
    do
      message="$message $arg"
    done
    git commit -m "$message"
  else
    read -p "Commit message: " message
    git commit -m "$message"
  fi
}

function yo() {
  echo "hi"
}


alias j=jobs

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

export EDITOR=vi

# Find all vim swapfiles lurking within
# the current directory tree.
# Append -delete to remove found files.
# CAUTiON!: Be sure find results only includes
# vimswap files, also ensure you don't
# need the file anymore, and has already
# been recovered from where applicable.
# see: https://superuser.com/a/805168
# Usage:
#   $ swapfiles
#   ./src/.parse.js.swp
#   ...
#   $ swapfiles -delete
#   $
alias swapfiles='find . -type f -name ".*.s??"'

# Edit ~/.bashrc and source it.
alias .rc='vi ~/.bashrc && source ~/.bashrc'


alias vimrc='vi ~/.vimrc'

# Edit todos
#
# Usage:
#
#   $ td    # Edit .todo in current directory
#   $ td ~  # Edit ~/.todo
#   $ td .. # Edit ../.todo
function td() {
  ${EDITOR:-nano} "${@:-.}/.todos"
}

PS1="\[\e[0;95m\]\W\[\e[0m\] \[\e[1;35m\]\$\[\e[0m\] "
# LS_COLORS='di=0;97:fi=1:97:' ; export LS_COLORS
LS_COLORS=':di=0;95:' ; export LS_COLORS

cd ~/projects/bubblescript
# vi newjack.
