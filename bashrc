alias hi="echo hello"

alias gs="git status"
alias gd="git diff"
alias gdc="git diff --cached"
alias gp="git push"
alias ga="git add"
alias gl="git log"
alias aa="git add . && git status"
alias s="git status"
alias p="cd ~/projects"
alias 🍬="git commit -m🍬"
alias 🍭="git commit -m🍭"
alias 🍉="git commit -m🍉"
alias 🍫="git commit -m🍫"
alias gc="git commit -m"

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
alias bashrc='vi ~/.bashrc && source ~/.bashrc'

# Edit todos
#
# Usage:
#
#   $ td    # Edit .todo in current directory
#   $ td ~  # Edit ~/.todo
#   $ td .. # Edit ../.todo
function td() {
  ${EDITOR:-nano} "${@:-.}/.todo"
}
