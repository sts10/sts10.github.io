---
layout: post
title: "Backing up with restic and rsync"
date: 2021-10-26 16:46:00 -0400
draft: true
comments: true
---

For a few years now, I've been using a command-lien tool called [rsync](https://rsync.samba.org/) to perform periodic back-ups of my most important files to various external hard drives and even some USB thumb drives. 

Rsync has worked great, but this week, looking for a project, I decided to explore some more robust back-up options. 

After asking Mastodon for recommendations and searching around just a bit, I decided to give [restic](https://restic.net/), a "modern backup program" that uses encryption, a try. 

## My notes (mostly for my future self) on using restic to back-up files

Here's [the official user's guide from restic](https://restic.readthedocs.io/en/latest/020_installation.html), which I found pretty good. I'm just doing "local" back-ups for now.

### Installing the tool on Ubuntu

`sudo apt install restic`

Let's check the version really quick:

`restic version` gives `restic 0.9.6 compiled with go1.12.12 on linux/amd64`

Now let's make a repo for storing back ups!

On my external hard drive, I ran:
```bash
mkdir restic-test
restic init --repo restic-test/
```

restic asks us to create a password for our back-up "repo" (restic uses encryption). We'll be asked to enter the new password as second time to confirm.

### Doing our first backup

`restic -r restic-test/ --verbose backup /home/sschlinkert/code`

another example:
`restic -r restic-test/ --verbose backup /Users/sschlinkert/Documents`

We do subsequent snapshots with exactly the same command.

### Ensure a snapshot was created

`restic -r restic-test/ snapshots`

### Check integrity of that snapshot

`restic -r restic-test/ check`

which should output a block of text that should end with: `no errors were found`

### Now try restoring (arbitrary)

Now let's say we need to restore our files from this back-up repo. Our files aren't exactly just sitting in a directory, as they are when using a tool like rsync. Instead we have to use restic's `restore` command.

Note that we need to paste in the snapshot id that we want to restore from.

```bash
mkdir ~/Documents_restored
restic -r restic-test/ restore 37769142 --target ~/Documents_restored
```

When done, sanity-check our restored data: 

```bash
ls ~/Documents_restored
```
