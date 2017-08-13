+++
title= "vim-zipper: My First Vim Plugin"
date= "2016-03-20 15:53:19 -0400"
comments = "true"
+++

At work I was working with [Highcharts](http://www.highcharts.com/), a JavaScript charting library. The specific file I was working in had a number of these charts defined in it, each of which had a good amount of settings and functions within them. As a result, in spite of other vim awesomeness, I found that I was having some trouble navigating around the long file. 


<!-- more -->

To give you a sense of what I was dealing with, here's the JS for [a demo from the Highcharts website](http://www.highcharts.com/demo/line-basic): 

```javascript
$(function () {
    $('#container').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});
```

I figured the best Vim way to better deal with these large code blocks, most of which I didn't need to see most of the time, was to learn more about folds. 

Initially, when first learning Vim, I just set `foldmethod` to `syntax`, figuring that would be the smartest option. However I've found that with this setting Vim rarely finds folds to close. Also, I believe that this setting slowed Vim down when I edited large Ruby files in particular. Perhaps I need some other setting in my vimrc, but `foldmethod=syntax` just hasn't worked for me. 

So I switched to `foldmethod=indent`, figuring that I maintain pretty cleanly-indented code. With `foldmethod` set to `indent`, `zc` (close fold) worked well for me. However when trying to open a fold, I found it a bit cumbersome to have to navigate to the exact line of the fold I wanted to open. I was thinking I wanted a command that "found next fold and open it".

After some Googling I found [this Stack Overflow answer](http://stackoverflow.com/a/9407015/3160994) that gives the Vimscript to do what I wanted. By trial and error, fumbling in the unforgiving darkness that is Vimscript, I modified it to the following and pasted it into my vimrc:

```vim
function! NextClosedFold(dir)
  if !(foldclosed(line('.')) > 0)
    let cmd = 'norm!z' . a:dir
    let view = winsaveview()
    let [l0, l, openf] = [0, view.lnum, 1]
    while l != l0 && openf
        exe cmd
        let [l0, l] = [l, line('.')]
        let openf = foldclosed(l) < 0
    endwhile
    if openf
        call winrestview(view)
    endif
  endif
endfunction

nnoremap <bar> zc
nnoremap <Bslash> :<C-U>call NextClosedFold('j')<cr>zo
```

I'm pretty sure it was something like that... the point is I just had it in my vimrc kind of like that and it worked. (`<C-U>` in insert mode deletes all characters before the cursor in current line. I believe it's best practice to insert it before function calls as above. I was reminded of this from tpope's [commentary plugin](https://github.com/tpope/vim-commentary). See `:help i_CTRL-U` for more.) 

This worked well enough. But I had been waiting for an opportunity to make my first Vim plugin, and at some point I figured this would be a good candidate. 

## Making It a Plugin

First I put the function and remappings into a separate `.vim` file and then sourced that file from my vimrc. I think I first created `~/.vim/zipper.vim`, pasted the function and the remappings into it and replaced the function and remappings in my vimrc with `source ~/.vim/zipper.vim`. It worked! One step closer to a plugin. 

I then consulted this 4-year-old [blog post](http://stevelosh.com/blog/2011/09/writing-vim-plugins/) by Steve Losh on the topic of creating a Vim plugin, so I knew I had to structure my `.vim` file into a Vim plugin's structure. From [Losh](http://stevelosh.com/blog/2011/09/writing-vim-plugins/#be-pathogen-compatible):

```
yourplugin/
    doc/
        yourplugin.txt
    plugin/
        yourplugin.vim
    ...
    README
    LICENSE
```
 

I then headed over to [vim-plug's README](https://github.com/junegunn/vim-plug/blob/master/README.md) to find out how to load a local vim plugin. Easy enough: 

```vim
" Unmanaged plugin (manually installed and updated)
Plug '~/my-prototype-plugin'
```

I moved my vim file to my usual code directory and put it in a `plugin` directory, then added this following to list of plugins in my vimrc for vim-plug to find:

```vim
Plug '~/Documents/code/vim-zipper'
```

I then ran `:PlugInstall` and was again in business (though I did note that I did not see "vim-zipper" in vim-plug's output of installed plugins, I'm hoping just because it doesn't display locally-sourced plugins since they aren't actually downloaded?). 

After some fiddling with how to set what mappings and options (see below), I pushed my local version of the plugin [up to GitHub](https://github.com/sts10/vim-zipper) and, in my vimrc, replaced `Plug '~/Documents/code/vim-zipper'` with: 

```vim
Plug 'sts10/vim-zipper'
```

I then ran `:Plug Clean!` to make sure I removed the local version of the plugin (though not sure if that did anything), followed by `:PlugUpdate` (or `:PlugInstall`) and the plugin still worked! 

## Controlled Remappings

Rather then just keep the two remapping lines I originally wrote for my own vimrc in the public version of the plugin, I used two `if` statements to only map `<bar>` and `<Bslash>` if users hadn't mapped those two keys yet: 

```vim
nnoremap <silent> <Plug>ZipClosed :<C-U>call CloseFold()<cr>
nnoremap <silent> <Plug>ZipOpenNext :<C-U>call NextClosedFold('j')<cr>zo
nnoremap <silent> <Plug>ZipOpenPrev :<C-U>call NextClosedFold('k')<cr>zo

vnoremap <silent> <Plug>ZipOpenVisual :'<,'>normal zo<cr>
vnoremap <silent> <Plug>ZipClosedVisual :'<,'>normal zc<cr>

if !hasmapto('<Plug>ZipClosed') || maparg('<bar>', 'n') ==# ''
  nmap <bar> <Plug>ZipClosed
  vmap <bar> <Plug>ZipClosedVisual
endif

if !hasmapto('<Plug>ZipOpenNext') || maparg('<Bslash>', 'n') ==# ''
  nmap <Bslash> <Plug>ZipOpenNext
  nmap <C-Bslash> <Plug>ZipOpenPrev
  vmap <Bslash> <Plug>ZipOpenVisual
endif

```

I picked this scheme up from tpope's [commentary](https://github.com/tpope/vim-commentary/blob/master/plugin/commentary.vim) and it seems to work as intended. If, say, you haven't mapped your `<Leader>`, if defaults to `<Bslash>`. Then users would have to map something else to `<Plug>ZipOpenNext`-- they wouldn't have to deal with the function calls themselves, which is nice.

I'm almost positive there's a way to do these mappings such that I don't have to specify the visual mode mappings separately, but considering the "open" mechanism is basically just `zo` in visual mode, it's probably good to define it separately. 

## Help Text File

To be formal about it, I copied [Commentary's help file](https://github.com/tpope/vim-commentary/blob/master/doc/commentary.txt) and replaced the text with [what I figured was a good help file for zipper](https://github.com/sts10/vim-zipper/blob/master/doc/zipper.txt). I then tested it out by running `:help zipper` and `:help bar` and it takes me right to the right place. Intriguingly, the [tags](https://github.com/sts10/vim-zipper/blob/master/doc/tags) file just automatically created itself and then populated itself... Not sure how that happened to be honest!! Vim must have recognized the directory layout and just done its thing. No complaints here. 

## Extras (README and GIF)

I then fleshed out the [README](https://github.com/sts10/vim-zipper/blob/master/README.mdown), including making this big silly GIF (using Quicktime screen record and [GIFBrewery](http://gifbrewery.com/)): 

![vim-zipper GIF](https://raw.githubusercontent.com/sts10/vim-zipper/master/vim-zipper-gif.gif)

That's about it! Give [vim-zipper](https://github.com/sts10/vim-zipper) a shot and [let me know](https://twitter.com/sts10) what you think!
