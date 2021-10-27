---
layout: post
title: "Exploring restic and other options for backing up data"
date: 2021-10-26 16:46:00 -0400
comments: true
---

I've never been very good about backing up my data. Yes, I've had one external hard drive or another for more than a decade, but my back up plan for most of that time was to drag some folders to the drive every few months, or when I was migrating to a new computer.

<!-- For a few years now, I've been using a command-line tool called [rsync](https://rsync.samba.org/) to perform periodic back-ups of my most important files to various external hard drives and even some USB thumb drives. --> 

<!-- ## In the before times... -->

For example, I would drag and drop my "code" folder from my main hard drive to a folder on my external hard drive called "back-ups", and date it like "2020-12-01-back-up-code". Every few months I'd make a new one, then maybe delete the oldest one.

This approach is simple and easy to perform and understand -- you move the files you want to save in one directions, and move them in the other to restore; and all GUI. But it has some real downsides. First, the external hard drive would need 2x, 3x, or 4x more space than whatever I was backing up. Second, each back-up would start from scratch, taking hours. And third, sometimes I could see where some files just wouldn't be transferred over at all!

There had to be a better way! But I didn't want to jump into a do-it-all solution. Which brought me to [rsync](https://rsync.samba.org/), "an open source utility that provides fast incremental file transfer." 

## A first step in the right direction: Rsync

Basically, rsync is a command line tool that does my drag-and-drop method smarter. Instead of starting from scratch with each snapshot, rsync allows you to keep updating the same snapshot _incrementally_. That means that if you've only modified or added one or two files since your last backup, you'll only be transferring those changes.

If you're interested, there are probably great rsync tutorials a search away. I'm not an expert, so for now let's just use one of my `rsync` commands from `~/.bashrc` as an illustrative example:

```bash
rsync -ar --delete /home/sschlinkert/Documents '/media/sschlinkert/external_harddrive/back-ups-rsync/'
```

This command basically sends a copy of my `Documents` directory to a back-up directory. It updates incrementally, so it's much better than removing an old backup and copying over the `Documents` directory every time I want to do a back up. Instead, rsync looks for _new_ and _modified_ files and just updates those in the back-up directory. (The optional `--delete` flag deletes files in the back-up that are not present in the data.)

## Downsides to this rsync approach

The big downside here is that we only ever have one "snapshot" of data to recover with at any one time. True, it's be definition the latest snapshot, but it feels a bit scary putting all our eggs in one basket. Plus, I knew Rsync wasn't _really_ meant for backing up whole home directories like I wanted to do. It also doesn't offer any encryption, which wasn't a big deal for me but might be for you!

This week, looking for a project, I decided to explore some more robust back-up options. 

After asking Mastodon for recommendations and searching around just a bit, I decided to give [restic](https://restic.net/), a "modern backup program" that uses encryption, a try. 

## Using restic

Here's [the official user's guide from restic](https://restic.readthedocs.io/en/latest/020_installation.html), which I found pretty helpful. Since I'm just putting backups onto USB devices, I only need to follow the instructions for a "local" back up.

### Installing restic on Ubuntu

`sudo apt install restic`

Let's check the version really quick:

`restic version` prints `restic 0.9.6 compiled with go1.12.12 on linux/amd64`. A little outdated -- 0.12.1 is [on Github](https://github.com/restic/restic/releases) as I write this -- but it'll do.

### Getting set up with restic

Now let's do some backing up!

First, let's try to gain a bare-bones conceptual understanding of how Restic works. Restic has a concept called "repositories", which is where your backup(s) will live. [From the docs](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html#preparing-a-new-repository):

> The place where your backups will be saved is called a “repository”. This chapter explains how to create (“init”) such a repository. The repository can be stored locally, or on some remote server or service. 

Basically we use restic to pull data into these backup repositories. So for me, my repository (singular for now) will be on my external hard drive.

### Initializing a Restic repository

OK, let's initialize one of these repositories. On my external hard drive, I ran:

```bash
mkdir /media/sschlinkert/external_harddrive/restic-repo
restic init --repo /media/sschlinkert/external_harddrive/restic-repo
```

Restic now asks us to create a password for this back-up "repo" (restic uses encryption). We'll be asked to enter the new password as second time to confirm.

### Doing our first backup

Finally, time to back-up some data. Following [the docs](https://restic.readthedocs.io/en/latest/040_backup.html), I composed this command using the `backup` subcommand to backup my entire `home/` directory:

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo --verbose backup /home/sschlinkert/
```

We will do subsequent snapshots by running the exact same command at later times. In other words this is the command you'd run every night or week to keep the backup up-to-date.

### Ensure a snapshot was created

We can do a quick check to see our first snapshot by running: 

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo snapshots
```

### Check integrity of that snapshot

One thing that's nice about restic is that you can check the state or "health" of the backup.

```bash
restic -r /media/sschlinkert/external_harddrive/restic-repo check
```

which should output a block of text that should end with: `no errors were found`. Awesome!

### Now try restoring our data!

Now let's say something bad has happened and we need to restore our files from this back-up repo. 

Our files aren't exactly just sitting in a directory, as they are when using a tool like rsync. (This is a bit of a downside for restic, but it's fine.) Instead, we have to use restic's `restore` subcommand.

First, we copy the snapshot id of the snapshot we want to restore from from that `snapshot` command. Then we'll make a new directory to restore to, and restore to it using restic's restore subcommand:

```bash
mkdir ~/Documents_restored
restic -r /media/sschlinkert/external_harddrive/restic-repo restore 37769142 --target ~/Documents_restored
```

This'll take a while, but when it's done our data should be restored to the location we specified, `~/Documents_restored`. At that point, we can do a sanity-check with:

```bash
ls ~/Documents_restored
```

## A simpler approach for a small directory

I've got a small directory of very important documents. This directory is included in my restic snapshots, but I also want to put it in other locations as redundancies. One such location is Dropbox. However, I want it to encrypt it before I upload it to Dropbox.

### Step 1: Compressing with tar

It's a directory (rather than a single file), so the first thing I'm going to do is put it in a tar ball.

```bash
tar -czvf important_documents.tar.gz important_documents/
```

Running this command creates important_documents.tar.gz for us. This single, compressed file will be easier for us to encrypt. (If you need more compression, try `tar -cjvf`.)

### Step 2: Encrypting with age

I've chosen to use an encryption tool called [age](https://github.com/FiloSottile/age) to encrypt and decrypt this file. [I wrote a short guide here](https://sts10.github.io/2021/09/06/exploring-age-1-point-0.html), but this'll work for our purposes:

```bash
age -p important_documents.tar.gz > important_documents.tar.gz.age
```

Enter a new passphrase twice. Age will create an encrypted file called `important_documents.tar.gz.age`. 

We can safely upload this `important_documents.tar.gz.age` file to Dropbox or another unencrypted cloud provider (I do this through the website, but I'm sure there's a way to do it through the command line...).

### Step 3: Decrypting and decompressing

We of course need to be able to restore these files. First we decrypt:  

```bash
age -d important_documents.tar.gz.age > important_documents.tar.gz
```

Enter your passphrase to decrypt to `important_documents.tar.gz`. Then we extract the files from the tar ball:

```bash
tar -xzvf important_documents.tar.gz
```

### All together (one-liners)

I think these work.

```bash
# compress and encrypt
tar -czv important_documents/ | age -p > important_documents.tar.gz.age
# decrypt and extract
age -d important_documents.tar.gz.age | tar -xzv
```

### Using symmetrical GPG encryption

If you don't want to use age (it's new), you can use gpg. 

Encrypting:
```bash
gpg -c important_documents.tar.gz
```

Decrypting:
```bash
gpg --output important_documents.tar.gz --decrypt important_documents.tar.gz.gpg
```

--- 
## Appendix A: Other archiving tools I found

### All-in-one command line tools for archiving files
- [Kopika](https://kopia.io/docs/) 
- [Borg](https://www.borgbackup.org/)

### Online storage options
- [Tarsnap](https://www.tarsnap.com/)
- [Nextcloud](https://nextcloud.com/), though I've never been able to figure out the set up
- [Keybase](https://keybase.io/)

### File types for archives
- [Bit Bottle](https://code.lag.net/robey/bitbottle) (very alpha so far, but an interesting idea?)

## Appendix B: Deleting target directories from Rust projects

As a (bad) Rust developer, I have a lot of built projects sitting in target directories. These take up quite a bit of space, and ideally I would not back them up.

I believe I can use `--exclude '**/target'` on my restic commands to exclude them, but for my notes, here are some methods for (recursively) removing the target directories from Rust projects.

### Using cargo wipe crate

[Cargo wipe](https://github.com/mihai-dinculescu/cargo-wipe) is a Rust crate that does just what we want.
   
It [checks for the presence of a file that rustc puts into target](https://github.com/mihai-dinculescu/cargo-wipe/blob/ddbe3ab0c64feb15d1254c28d1b211cce17bb46d/src/dir_helpers.rs#L45), so it won't arbitrarily delete all directories named target 

And by default, it does a dry run, which shows how much storage will be freed up, which is nice. Then you can run the same command with `-w` flag to do the actual removing.

### More DIY approaches

- `find . -name target | xargs rm -r`
- [from Kevin Hoffman](https://twitter.com/KevinHoffman/status/1250077166982828033) `find . -type d -name target -prune -exec rm -r {} +`
- If we want to use a Rust replacement for `find`, there's [fd](https://github.com/sharkdp/fd): `fd -I -t d target`. To do the actual removing, I think it'd be: `fd -I -t d target | xargs rm -r`

