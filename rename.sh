#! /usr/bin/env bash
# orginal_texto = $1;
# nuevo_texto
# echo $1 $2
# git grep -l $1 | xargs sed -i -e 's/$1/$2/g'

# File renaming.
files=$(git ls-tree --full-tree --name-only -r HEAD)
# Filter file list by orginal text
files=$(echo "$files" | grep "$1")

# IFS=$"\n"
# for file in "${files[@]}"; do
for file in $files; do
  echo "Renaming: $file"
  # get new path
  # get dir
  # rename old to new
done
# IFS=$" \t\n"
