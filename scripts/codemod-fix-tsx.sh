#!/usr/bin/env bash
set -euo pipefail

echo ">> Codemod: fixing TSX imports and <CardTitle/> usage…"

# Collect all TSX files tracked by git (fallback to find if not a git repo)
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  mapfile -t FILES < <(git ls-files '*.tsx')
else
  mapfile -t FILES < <(find . -type f -name '*.tsx')
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No .tsx files found. Nothing to do."
  exit 0
fi

# 1) Replace <CardTitle>…</CardTitle> with an <h3> that carries your SEO-friendly classes.
#    -g  global, -s single-line (dot matches newlines), -i in-place (with .bak backups)
echo ">> Replacing <CardTitle>…</CardTitle> with <h3 class=\"text-lg font-semibold leading-tight\">…</h3>…"
perl -0777 -i.bak -pe '
  s/<\s*CardTitle\s*>(.*?)<\s*\/\s*CardTitle\s*>/<h3 class="text-lg font-semibold leading-tight">$1<\/h3>/gs;
' "${FILES[@]}"

# 2) Remove CardTitle from imports coming from "@/components/ui/Card"
#    Handles:
#      import { Card, CardTitle, CardHeader } from "...";
#      import { CardTitle, Card } from "...";
#      import { CardTitle } from "...";  (line becomes empty and is removed)
echo ">> Removing CardTitle from imports…"
perl -0777 -i.bak -pe '
  s{
    (^|\n)                                    # line start
    (import\s*\{)([^}]*)(\}\s*from\s*")@/components/ui/Card(";\s*)
  }{
    my ($pre,$open,$inside,$close1,$close2) = ($1,$2,$3,$4,$5);
    # remove CardTitle with optional adjacent commas/space
    $inside =~ s/\bCardTitle\b\s*,\s*//g;     # CardTitle, …
    $inside =~ s/\s*,\s*\bCardTitle\b//g;     # …, CardTitle
    $inside =~ s/^\s*\bCardTitle\b\s*//g;     # only CardTitle
    # tidy stray commas/whitespace
    $inside =~ s/^\s*,\s*//;
    $inside =~ s/\s*,\s*$//;
    $inside =~ s/\s{2,}/ /g;

    # If nothing left inside braces, drop the whole import line
    if ($inside =~ /^\s*$/) { "$pre" } else { "$pre$open$inside$close1\@/components/ui/Card$close2" }
  }gmx;
' "${FILES[@]}"

# 3) Clean up backup files created by perl -i.bak
find . -type f -name '*.bak' -delete

echo ">> Codemod complete."
echo ">> Tip: review changes with: git diff"
