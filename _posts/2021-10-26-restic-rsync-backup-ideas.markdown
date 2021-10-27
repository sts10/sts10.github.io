---
layout: post
title: "Exploring restic and other options for backing up data"
date: 2021-10-26 16:46:00 -0400
comments: true
---

For a few years now, I've been using a command-line tool called [rsync](https://rsync.samba.org/) to perform periodic back-ups of my most important files to various external hard drives and even some USB thumb drives. 

Here's an example of one of my `rsync` commands:

```bash
rsync -ar --delete /home/sschlinkert/Documents '/media/sschlinkert/Seagate 4TB/back-ups-rsync/'
```

This command basically sends a copy of my `Documents` directory to a back-up directory. It updates incrementally, so it's much better than removing an old backup and copying over the `Documents` directory every time I want to do a back up. Instead, rsync looks for _new_ and _modified_ files and just updates those in the back-up directory.

Rsync has works great, but this week, looking for a project, I decided to explore some more robust back-up options. 

After asking Mastodon for recommendations and searching around just a bit, I decided to give [restic](https://restic.net/), a "modern backup program" that uses encryption, a try. 

## My notes (mostly for my future self) on using restic to back-up files

Here's [the official user's guide from restic](https://restic.readthedocs.io/en/latest/020_installation.html), which I found pretty helpful. Since I'm just putting back ups onto USB devices, I only need to follow the instructions for a "local" back up.

### Installing restic on Ubuntu

`sudo apt install restic`

Let's check the version really quick:

`restic version` gives `restic 0.9.6 compiled with go1.12.12 on linux/amd64`. Cool.

### Getting set up

Now let's do some backing up. Restic has a concept called "repositories". From the docs:

> The place where your backups will be saved is called a “repository”. This chapter explains how to create (“init”) such a repository. The repository can be stored locally, or on some remote server or service. 

Basically we use restic to pull data into these backup repositories. 

First, let's initialize one of these repositories. On my external hard drive, I ran:

```bash
mkdir /media/sschlinkert/external_harddrive/restic-repo
restic init --repo /media/sschlinkert/external_harddrive/restic-repo
```

restic asks us to create a password for our back-up "repo" (restic uses encryption). We'll be asked to enter the new password as second time to confirm.

### Doing our first backup

Following the docs, I composed this backup command:

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo --verbose backup /home/sschlinkert/
```

We do subsequent snapshots with exactly the same command. In other words this is the command you'd run every night or week to keep the backup up-to-date.

### Ensure a snapshot was created

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo snapshots
```

### Check integrity of that snapshot

One thing that's nice about restic is that you can check the state of the backup.

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo check
```

which should output a block of text that should end with: `no errors were found`

### Now try restoring our data!

Now let's say something bad has happened and we need to restore our files from this back-up repo. 

Our files aren't exactly just sitting in a directory, as they are when using a tool like rsync. (This is a bit of a downside for restic, but it's fine.) Instead, we have to use restic's `restore` sub command.

First grab the snapshot id from that `snapshot` command.

```bash
mkdir ~/Documents_restored
restic -r /media/sschlinkert/external_harddrive/restic-repo restore 37769142 --target ~/Documents_restored
```

This'll take a while, but when it's done our data should be restored to the location we specified, `~/Documents_restored`.  We can do a sanity-check with:

```bash
ls ~/Documents_restored
```

## A simpler approach for a small directory

I've got a small directory of very important documents. This directory is included in my restic snapshots, but I also want to put it in other locations. One such location is Dropbox. However, since I want it to encrypt it before I upload it to Dropbox.

### Step 1: Compressing with tar

```bash
tar -czvf important_documents.tar.gz important_documents/
```

Creates important_documents.tar.gz for us. This single, compressed file will be easier for us to encrypt.

### Step 2: Encrypting with age

I've chosen to use an encryption tool called [age](https://github.com/FiloSottile/age) to encrypt and decrypt this file. [I wrote a short guide here](https://sts10.github.io/2021/09/06/exploring-age-1-point-0.html).

```bash
age -p important_documents.tar.gz > important_documents.tar.gz.age
```

Enter a new passphrase twice. We'll thhen get an encrypted file called `important_documents.tar.gz.age`.

### Step 3: Decrypting and decompressing

First we decrypt:  

```bash
age -d important_documents.tar.gz.age > important_documents.tar.gz
```

Enter your passphrase. Then we extract the files from the tar ball:

```bash
tar -xzvf important_documents.tar.gz
```

### All together (one-liners)

```bash
# compress and encrypt
tar -czv important_documents/ | age -p > important_documents.tar.gz.age
# decrypt and extraxt
age -d important_documents.tar.gz.age | tar -xzv
```

### Using symmetrical GPG encryption

If you don't want to use age, you can use gpg. 

Encrypting:
```bash
gpg -c important_documents.tar.gz
```

Decrypting:
```bash
gpg --output important_documents.tar.gz --decrypt important_documents.tar.gz.gpg
```

--- 

## Appendix A: Deleting target directories from Rust projects

I probably should have just used `--exclude '**/target'` on my restic commands, but for my notes, here are some methods for (recursively) removing the target directories from Rust projects.

### Using cargo wipe crate

[Cargo wipe](https://github.com/mihai-dinculescu/cargo-wipe) is a Rust crate that does just what we want.
   
It [checks for the presence of a file that rustc puts into target](https://github.com/mihai-dinculescu/cargo-wipe/blob/ddbe3ab0c64feb15d1254c28d1b211cce17bb46d/src/dir_helpers.rs#L45), so it won't arbitrarily delete all directories named target 

And by default, it does a dry run, which shows how much storage will be freed up, which is nice. Then you can run the same command with `-w` flag to do the actual removing.

### More DIY approaches

- `find . -name target | xargs rm -r`
- [from Kevin Hoffman](https://twitter.com/KevinHoffman/status/1250077166982828033) `find . -type d -name target -prune -exec rm -r {} +`
- If we want to use a Rust replacement for `find`, there's [fd](https://github.com/sharkdp/fd): `fd -I -t d target`. To do the actual removing, I think it'd be: `fd -I -t d target | xargs rm -r`

## Appendix B: Other archiving tools I found

### File encryption
- PGP
- age

### All-in-one command line tools for archiving files
- [Restic](https://restic.net/)
- [Kopika](https://kopia.io/docs/) 
- [Borg](https://www.borgbackup.org/)

### Online storage options
- Keybase
- [Tarsnap](https://www.tarsnap.com/)

### File types for archiving
- [Bit Botle](https://code.lag.net/robey/bitbottle) (very alpha so far)
