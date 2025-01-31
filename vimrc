
set shiftwidth=2
set tabstop=2
set expandtab
set list
set nowrap

" set rl

execute pathogen#infect()
syntax on
filetype plugin indent on

set foldmethod=syntax
set foldlevel=99
nnoremap <space> za

set wildmode=longest,list,full
set wildmenu

if bufwinnr(1)
    map + <C-W>+
    map - <C-W>-
endif

" https://vi.stackexchange.com/a/456/54688
fun! TrimWhitespace()
    let l:save = winsaveview()
    keeppatterns %s/\s\+$//e
    call winrestview(l:save)
endfun

" Remove trailing whitespace on save
autocmd BufWritePre * call TrimWhitespace()

" Bubblescript
autocmd BufNewFile,BufRead *.bubls set ft=lisp

" .todo
autocmd BufNewFile,BufRead .todo set ft=markdown

" Edit .vimrc
" https://superuser.com/a/929004
nnoremap <leader>ev :split $MYVIMRC<CR>
nnoremap <leader>sv :source $MYVIMRC<CR>

let mapleader = ","

map <Leader>fn afunction () {}<Esc>4h
map <Leader>o a<CR><Esc>O

map <Leader>d O## <C-r>=system('date +%F')<CR><Esc>ddkA ##<Esc>0


autocmd BufNewFile,BufRead *.js.spec set ft=javascript
autocmd BufNewFile,BufRead *.coffee.spec set ft=coffee

colorscheme valerie


" https://stackoverflow.com/a/34992101/28684586
" inoremap " ""<left>
" inoremap ' ''<left>
" inoremap ( ()<left>
" inoremap [ []<left>
" inoremap { {}<left>
" inoremap {<CR> {<CR>}<ESC>O
" inoremap {;<CR> {<CR>};<ESC>O

