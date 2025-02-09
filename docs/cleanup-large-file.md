# Remove Large File from Git

1. Make sure the file is ignored:
```
.vscode/OpenJDK-23/lib/modules
```

2. Rewrite the history:
```bash
git filter-repo --path .vscode/OpenJDK-23/lib/modules --invert-path
```

3. Force-push the updated repository:
```bash
git push origin main --force
```

## Using Git filter-branch

```bash
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .vscode/OpenJDK-23/lib/modules' \
  --prune-empty --tag-name-filter cat -- --all
git push origin main --force
```