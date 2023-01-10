---
layout: post
title: "Cloud back-ups with Restic and Amazon S3"
date: 2023-01-10 10:00:00 -0400
comments: true
---

A few months ago I had a 4TB external hard drive fail on me (it _may_ have been because I stored it on top of a medium-sized speaker...). It got me thinking that it might be time for me to explore cloud (or online) back-ups. 

I'll note right off the back that I'm not a typical computer user. I'm very comfortable on the command line and am pretty privacy-conscious.

For some context, [back in 2021 I started using a command line tool called Restic for local back-ups](https://sts10.github.io/2021/10/26/restic-rsync-backup-ideas.html). I've used it ever since and really like it. I did a Restic restore after switching Linux distros last year and it worked well. But, as I've been reminded, drives fail, and while I'm now considering buying a NAS, I also wanted to see what cloud storage I could figure out here in 2023. 

## Starting my research (or, if you're not comfortable with the command line)

As usual, I started my research at Wirecutter. They've got an article titled ["Best Online Cloud Backup Service"](https://www.nytimes.com/wirecutter/reviews/best-online-backup-service/) and as of today, their pick is [Backblaze](https://www.backblaze.com/cloud-backup.html#af9ktr) ($70 per year) (note this is distinct from "Backblaze B2"). 

I've heard good things about Backblaze, but as someone who was already running Restic commands about every week for local back-ups, I wanted to keep exploring and see if I could find a more technical solution that might work better for me.

(While looking for cloud back-up services, I also was pointed to [pCloud](https://www.pcloud.com), which looks interesting and offers interesting lifetime pricing options.)

## If you're comfortable on the command line...

The cloud service I found most recommended for technical-proficient, privacy-conscious folks was [Tarsnap](https://www.tarsnap.com/). 

Tarsnap looks pretty secure and well-made, but interestingly the cost is comparable with Backblaze's personal option: at $0.25 per Gb per month, 30Gb would be $7.50 a month.

Also, I'd have to/get to learn a new command line tool to use Tarsnap (though it seems like it's designed to be very similar to `tar`, a command I'm becoming a little more familiar with through my work on a different but related project called [Bottle](https://github.com/sts10/bottle)).

## Using Restic to do my own encrypting (pre-upload)

At this point, I realized I should check what services Restic plays nicely with, since I was already pretty comfortable with the Restic tooling and system.

Over in the (very good) [Restic docs](https://restic.readthedocs.io/en/stable/), they give [examples of how to prepare a repository for various online cloud services](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html#), including Amazon S3 and [Backblaze B2](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#backblaze-b2).

I also found [a more fleshed out example using Amazon S3](https://restic.readthedocs.io/en/stable/080_examples.html#initializing-the-restic-repository).

If I was indeed going to use Restic for my cloud back-ups, I wanted to choose something listed in these docs, for simplicity's sake. I was tempted to try the Google option, since I already pay them $1.99 per month for a 100Gb email inbox, but (a) I saw some meh things about their cloud services and (b) I kind of didn't want my inbox and back-ups to share space. 

## Choosing Amazon S3
At this point I figured Amazon S3 was a solid choice, and the experience of using it might be helpful to me professionally. And [at $0.023 per GB](https://aws.amazon.com/s3/pricing/?nc=sn&loc=4), assuming that's per month, I was looking at about $11 per year for my ~45 Gb of data. (They've got [a price calculator web app](https://calculator.aws/#/) if you want to investigate your own use-case.)

To set up my AWS account and the bucket itself, I followed [this example](https://restic.readthedocs.io/en/stable/080_examples.html#initializing-the-restic-repository) almost exactly.

### Initializing a new Restic repo on Amazon S3

Once I had my AWS account, a user with the correct permissions, and an S3 bucket all set up through their web app (see above), I initialized my Restic repo by running the following commands on my local machine:

```bash
unset HISTFILE
export AWS_ACCESS_KEY_ID="<access_key_id>"
export AWS_SECRET_ACCESS_KEY="<secret_key>"
restic -r s3:s3.amazonaws.com/<my bucket name> init
```

(Note that I think I could have set `export AWS_DEFAULT_REGION="us-east-1"` but it didn't seem necessary.)

I set a strong password.

### Running my first backup

Now I was ready to run my first backup to this S3 bucket.

```
restic -r s3:s3.amazonaws.com/<My-S3-Bucket-name> --verbose backup --exclude-caches --exclude-file=/home/sschlinkert/restic-excludes.txt /home/sschlinkert/Documents /home/sschlinkert/Pictures
```

This sent about 7.5Gb to the bucket. Sweet. (Still not exactly sure what this will cost me...)

I chose to only send my Documents and Pictures since (a) it wasn't clear what my AWS charges would be and (b) I'm not really sure how much I trust Restic encryption.

I then ran a quick `restic -r s3:s3.amazonaws.com/<MY-S3_BUCKET-NAME> snapshots` and `restic -r s3:s3.amazonaws.com/<MY-S3_BUCKET-NAME> check` to make sure everything went well. Looks good!

### What about Amazon S3 Glacier?

In my research and on the fediverse, I saw a few mentions of something called [S3 Glacier](https://docs.aws.amazon.com/glacier/index.html). 

This does seem like a service that would be good for my use-case. 
> Amazon Simple Storage Service Glacier (Amazon S3 Glacier) is a storage service optimized for infrequently used data, or "cold data." The service provides durable and extremely low-cost storage with security features for data archiving and backup. With Amazon S3 Glacier, you can store your data cost effectively for months, years, or even decades. Amazon S3 Glacier enables you to offload the administrative burdens of operating and scaling storage to AWS, so you don't have to worry about capacity planning, hardware provisioning, data replication, hardware failure detection and recovery, or time-consuming hardware migrations.

And it looks to be [cheaper per Gb](https://aws.amazon.com/s3/pricing/?nc=sn&loc=4) than the "S3 Standard" set-up that (I think) I went with above. You can read more about Glacier [here](https://aws.amazon.com/s3/faqs/#Amazon_S3_Glacier_Instant_Retrieval_storage_class). It sounds good considering my use-case!

But then, [elsewhere in the Glacier docs](https://docs.aws.amazon.com/amazonglacier/latest/dev/amazon-glacier-getting-started.html), I spotted this line:

> S3 Glacier does provide a console. However, any archive operation, such as upload, download, or deletion, requires you to use the AWS Command Line Interface (CLI) or write code. There is no console support for archive operations. For example, to upload data, such as photos, videos, and other documents, you must either use the AWS CLI or write code to make requests, by using either the REST API directly or by using the AWS SDKs. 

I didn't really want to need to install and use the AWS CLI. 

This note, plus not seeing Glacier referred to in the Restic docs gave me pause. For now, I'm sticking with the my standard S3 bucket, which plays nicely with Restic.

## How easy would it be for me to use Backblaze B2? 

Now that I have the hang of using Restic together with S3, I think using Backblaze B2 would be pretty easy, according to [the Restic docs](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#backblaze-b2):

> Restic can backup data to any Backblaze B2 bucket. You need to first setup the following environment variables with the credentials you can find in the dashboard on the “Buckets” page when signed into your B2 account:

```
$ export B2_ACCOUNT_ID=<MY_APPLICATION_KEY_ID>
$ export B2_ACCOUNT_KEY=<MY_APPLICATION_KEY>
```
Then:
```
restic -r b2:bucketname:path/to/repo init
```

## The paranoia sets in? 

Last night in bed, Tarsnap's motto came back to me: "Online backups for the truly paranoid". I wondered if I shouldn't be relying on Restic's encryption and instead pay the ~$8 per month for Tarsnap. Maybe that'll be enough impetus for me to learn and explore Tarsnap in the future (there's [a book on mastering it](https://www.tiltedwindmillpress.com/product/tarsnap-mastery-online-backups-for-the-truly-paranoid/)). No rule that I can't do both for a few months before deleting the S3 bucket.

## Bonus: A use-case for Bottle

A while back, I wrote a shell wrapper around age and tar that I called [Bottle](https://github.com/sts10/bottle). Given a directory, it tar's it, compressing it with [Zstandard](https://facebook.github.io/zstd/), then encrypts the resulting file using [age](https://github.com/FiloSottile/age) using a set key file.

I built this tool to quickly encrypt directories (or files) for my future self. As long as I could access the "bottle" key file, I could decrypt the file and extract the original directory when needed. I envisioned this as handy for arching things to less-than-trusted online cloud services.

Partially as an experiment, I Bottle'd a directory of family photos with `bottle family-photos-archives`, then added it to the S3 Restic repo by running: 
```bash
restic -r s3:s3.amazonaws.com/<MY-S3_BUCKET-NAME> backup family-photos-archives.tar.zst.age
```

Seems to have worked! (I should probably do a full restore/recovery of the data as a test, but maybe later.) Neat! This file is encrypted twice, once with age and then once with Restic, but I think that's fine? Double safe!

## Next archive-related tasks on my to-do list

Next, I'm on the lookout for a tool to find and deal with **duplicate photos** in a given directory or drive. If you have recommendations for this (or other cloud back-up solutions), feel free to mention me [on Mastodon](https://hachyderm.io/@schlink).
