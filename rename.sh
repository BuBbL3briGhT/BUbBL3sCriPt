#! /usr/bin/env bash

# rename original nuevo [dir]

# orginal_texto = $1;
# nuevo_texto
# echo $1 $2
# git grep -l $1 | xargs sed -i -e "s/$1/$2/g"

# File renaming.
files=$(git ls-tree --full-tree --name-only -r HEAD)
# Filter file list by orginal text
files=$(echo "$files" | grep "$1")

# IFS=$"\n"
# for file in "${files[@]}"; do
for file in $files; do
  echo "Renaming: $file"
  # get new path
  new_path=$(echo "$file" | sed "s/$1/$2/g")
  echo "$new_path"
  # get dir
  # directory_path=$(dirname "$new_path")
  # mkdir -p "$directory_name"
  # rename old to new
  # mv "$file" "$new_path"
done
# IFS=$" \t\n"
