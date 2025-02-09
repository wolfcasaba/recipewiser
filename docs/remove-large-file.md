# Removing a Large File from Git

1. Make sure the file is ignored:
```
.vscode/OpenJDK-23/lib/modules
```

2. Use Git filter-repo (install if needed):
```bash
git filter-repo --path .vscode/OpenJDK-23/lib/modules --invert-path
```

3. Force-push your rewritten history:
```bash
git push origin main --force
```