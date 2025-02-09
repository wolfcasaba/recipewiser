# Removing a Large File from Git

1. Run:
   ```bash
   git rm --cached .vscode/OpenJDK-23/lib/modules
   git commit -m "Remove large OpenJDK file"
   ```
2. Rewrite the history:
   ```bash
   git filter-repo --path .vscode/OpenJDK-23/lib/modules --invert-path
   ```
3. Force-push to update remote:
   ```bash
   git push origin main --force
   ```
