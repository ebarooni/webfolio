---
name: generate-commit-message
description: >
  Drafts a commit message in this repo's Conventional Commits style and proposes
  a split when staged changes are not cohesive. Use before any git commit,
  including commit-and-push and updates to a PR branch.
metadata:
  version: '1.2'
---

# Generate Commit Message

1. Run `git diff --cached`. If it is empty, ask the user to stage changes.
2. If the staged changes are not one cohesive change, propose a split (commits, messages, and the files or hunks for each) and stop.
3. Draft the message with [references/normal-commit.md](references/normal-commit.md).
4. For a revert, keep the message that `git revert` generates.
5. Show the draft. Run `git commit` only when the user asks.
