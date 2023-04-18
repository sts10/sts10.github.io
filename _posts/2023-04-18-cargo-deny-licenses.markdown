---
layout: post
title: "Using cargo deny to check license compatibility of your Rust project's dependencies"
date: 2023-04-18 10:00:00 -0400
comments: true
---

I'm (still) thinking a bit more about software licenses ([previously](https://sts10.github.io/2023/01/26/exploring-new-software-licenses.html)). In order to learn more, I read _Open (Source) for Business: A Practical Guide to Open Source Software Licensing_ by Heather Meeker, which was pretty close to the more thorough explanation of key concepts that I was looking for. 

Meeker explained, more lucidly than I had seen before, that if your code uses a library that's licensed under a copyleft license (like GPL), YOUR project very likely needs to be licensed the same way. (Maybe that's obvious, but something about Meeker's explanation made it clear to me.)

I then wondered if any of my personal coding projects, mostly releases under permissive licenses like MIT or Blue Oak Model License, relied on any crates/libraries that are licensed under a copyleft license like GPL. 

I knew that Rust's `Cargo.toml` provides the ability to specify the project's license. So it followed that there was very olikely a programmatic way to check the licenses of all of a project's dependencies. 

Sure enough, a tool called [cargo-deny](https://github.com/EmbarkStudios/cargo-deny) offers such a check. To sue cargo-deny's phrasing, the tool provides [a "licenses check"](https://github.com/EmbarkStudios/cargo-deny#licenses) that allows users to "verify that every crate you use has license terms you find acceptable." [More info here](https://embarkstudios.github.io/cargo-deny/checks/licenses/index.html).

## How to use cargo-deny to check "that every crate you use has license terms you find acceptable"

1. Install cargo-deny with: `cargo install --locked cargo-deny`
2. Navigate into your Rust project that you want to check
3. Run `cargo deny init` to create a `deny.toml` file in your Rust project. This file is basically the configuration file that cargo-deny will use. So, among other things, you can specify which licenses to allow or not allow. 
4. Open new `deny.toml` file in a text editor and read over the default settings and comments. Make tweaks as necessary (see [https://spdx.org/licenses/](https://spdx.org/licenses/) for help specifying licenses to allow/deny).
5. To execute the actual licenses check, run `cargo deny check licenses`

Note that you can use cargo-deny to check a bunch of aspects of your Rust project, like security issues. Run `cargo deny check` to check all.

## The deny.toml I settled with for one project

Here's the `[licenses]` section of [deny.toml](https://github.com/sts10/tidy/blob/main/deny.toml) that I ended up with for my project, [Tidy](https://github.com/sts10/tidy):

```toml
# In deny.toml...

[licenses]
# Deny crates that do not have a license.
unlicensed = "deny"
# List of explicitly allowed licenses
# See https://spdx.org/licenses/ for list of possible licenses
# [possible values: any SPDX 3.11 short identifier (+ optional exception)].
allow = [
    "Apache-2.0",
    "BSD-2-Clause",
    "BSD-2-Clause-Patent",
    "BSD-3-Clause",
    "BlueOak-1.0.0",
    "MIT",
    "Unicode-DFS-2016",
    "Unlicense"
]
# It's fine if any of the above allowed licenses are NOT found.
unused-allowed-license = "allow"
# List of explicitly disallowed licenses
# See https://spdx.org/licenses/ for list of possible licenses
# [possible values: any SPDX 3.11 short identifier (+ optional exception)].
deny = [
    #"Nokia",
]
# Lint level for licenses considered copyleft
copyleft = "deny"
# Blanket approval or denial for OSI-approved or FSF Free/Libre licenses
# * both - The license will be approved if it is both OSI-approved *AND* FSF
# * either - The license will be approved if it is either OSI-approved *OR* FSF
# * osi-only - The license will be approved if is OSI-approved *AND NOT* FSF
# * fsf-only - The license will be approved if is FSF *AND NOT* OSI-approved
# * neither - This predicate is ignored and the default lint level is used
allow-osi-fsf-free = "neither"
# Lint level used when no other predicates are matched
# 1. License isn't in the allow or deny lists
# 2. License isn't copyleft
# 3. License isn't OSI/FSF, or allow-osi-fsf-free = "neither"
default = "deny"
# The confidence threshold for detecting a license from license text.
# The higher the value, the more closely the license text must be to the
# canonical license text of a valid SPDX license file.
# [possible values: any between 0.0 and 1.0].
confidence-threshold = 0.8
```

I basically decided to allow a selection of permissive licenses that I think are compatible with [the MIT License (which Tidy uses)](https://github.com/sts10/tidy/blob/main/LICENSE). I think it's unfortunately important to "deny" all copyleft licenses like GPL, since that would require me to offer Tidy under the same (copyleft) license.

Overall, I think this exercise has been a solid illustration of the potential issues of releasing code that will generally be used in other code ("libraries") under copyleft licenses.
