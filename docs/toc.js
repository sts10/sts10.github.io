// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="welcome.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="installing-on-oryx.html"><strong aria-hidden="true">2.</strong> Installing a Fresh Distro on Oryx Pro</a></li><li class="chapter-item expanded "><a href="initial-setup/index.html"><strong aria-hidden="true">3.</strong> Initial Setup</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="initial-setup/basics.html"><strong aria-hidden="true">3.1.</strong> Basics</a></li><li class="chapter-item expanded "><a href="initial-setup/bashrc-and-konsole.html"><strong aria-hidden="true">3.2.</strong> bashrc and terminal</a></li><li class="chapter-item expanded "><a href="initial-setup/git.html"><strong aria-hidden="true">3.3.</strong> Git</a></li><li class="chapter-item expanded "><a href="initial-setup/neovim.html"><strong aria-hidden="true">3.4.</strong> Neovim</a></li><li class="chapter-item expanded "><a href="initial-setup/keepassxc.html"><strong aria-hidden="true">3.5.</strong> KeePassXC</a></li><li class="chapter-item expanded "><a href="initial-setup/syncthing.html"><strong aria-hidden="true">3.6.</strong> Syncthing</a></li><li class="chapter-item expanded "><a href="initial-setup/standard-notes.html"><strong aria-hidden="true">3.7.</strong> Standard Notes</a></li><li class="chapter-item expanded "><a href="initial-setup/pgp.html"><strong aria-hidden="true">3.8.</strong> PGP</a></li><li class="chapter-item expanded "><a href="initial-setup/other-apps.html"><strong aria-hidden="true">3.9.</strong> Other Apps to Install</a></li><li class="chapter-item expanded "><a href="initial-setup/chrome-and-flash.html"><strong aria-hidden="true">3.10.</strong> Chrome and Flash</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/index.html"><strong aria-hidden="true">3.11.</strong> Development Environment</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="initial-setup/dev-env/python-pyenv.html"><strong aria-hidden="true">3.11.1.</strong> Python and pyenv</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/ruby-and-rbenv.html"><strong aria-hidden="true">3.11.2.</strong> Ruby and rbenv</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/rust.html"><strong aria-hidden="true">3.11.3.</strong> Rust</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/golang.html"><strong aria-hidden="true">3.11.4.</strong> Golang</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/github-and-ssh.html"><strong aria-hidden="true">3.11.5.</strong> GitHub and ssh keys</a></li><li class="chapter-item expanded "><a href="initial-setup/dev-env/jekyll.html"><strong aria-hidden="true">3.11.6.</strong> GitHub blog with Jekyll</a></li></ol></li><li class="chapter-item expanded "><a href="initial-setup/gnome-setup.html"><strong aria-hidden="true">3.12.</strong> GNOME Setup</a></li><li class="chapter-item expanded "><a href="initial-setup/kde-setup.html"><strong aria-hidden="true">3.13.</strong> KDE Setup and Troubleshooting</a></li><li class="chapter-item expanded "><a href="initial-setup/redshift.html"><strong aria-hidden="true">3.14.</strong> Redshift</a></li><li class="chapter-item expanded "><a href="initial-setup/battery-management.html"><strong aria-hidden="true">3.15.</strong> Battery and TLP</a></li><li class="chapter-item expanded "><a href="initial-setup/rsync.html"><strong aria-hidden="true">3.16.</strong> rsync</a></li><li class="chapter-item expanded "><a href="initial-setup/restic.html"><strong aria-hidden="true">3.17.</strong> restic</a></li><li class="chapter-item expanded "><a href="initial-setup/images-and-video.html"><strong aria-hidden="true">3.18.</strong> Images and Video</a></li><li class="chapter-item expanded "><a href="initial-setup/go.html"><strong aria-hidden="true">3.19.</strong> Go and Sabaki</a></li></ol></li><li class="chapter-item expanded "><a href="rust-command-line-tools.html"><strong aria-hidden="true">4.</strong> Rust Command Line Tools</a></li><li class="chapter-item expanded "><a href="cargo-dist-tips.html"><strong aria-hidden="true">5.</strong> Cargo-dist tips</a></li><li class="chapter-item expanded "><a href="installing-ubuntu-on-an-old-macbook-pro.html"><strong aria-hidden="true">6.</strong> Installing Ubuntu on my 2009 MacBook Pro</a></li><li class="chapter-item expanded "><a href="security/index.html"><strong aria-hidden="true">7.</strong> Security Apps and Tools</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="security/moving-files.html"><strong aria-hidden="true">7.1.</strong> Tools for moving files between computers</a></li><li class="chapter-item expanded "><a href="security/using-a-yubikey-from-a-smartcard-on-ubuntu.html"><strong aria-hidden="true">7.2.</strong> YubiKey</a></li><li class="chapter-item expanded "><a href="security/pidgin-google-and-otr.html"><strong aria-hidden="true">7.3.</strong> Pidgin, Gchat, and OTR</a></li></ol></li><li class="chapter-item expanded "><a href="other-des/index.html"><strong aria-hidden="true">8.</strong> Other DEs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="other-des/customizing-appearance-of-xfce-ubuntu.html"><strong aria-hidden="true">8.1.</strong> Customizing XFCE (Ubuntu base)</a></li><li class="chapter-item expanded "><a href="other-des/notes-on-i3.html"><strong aria-hidden="true">8.2.</strong> Notes on i3</a></li><li class="chapter-item expanded "><a href="other-des/other-desktop-environments.html"><strong aria-hidden="true">8.3.</strong> Other DEs</a></li></ol></li><li class="chapter-item expanded "><a href="e-reader.html"><strong aria-hidden="true">9.</strong> E-reader Tips</a></li><li class="chapter-item expanded "><a href="lubuntu/index.html"><strong aria-hidden="true">10.</strong> Lubuntu</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="lubuntu/switching-to-lubuntu.html"><strong aria-hidden="true">10.1.</strong> Switching to Lubuntu</a></li><li class="chapter-item expanded "><a href="lubuntu/improving-lubuntu.html"><strong aria-hidden="true">10.2.</strong> Improving Lubuntu</a></li><li class="chapter-item expanded "><a href="lubuntu/remapping-control-and-caps-lock-lubuntu.html"><strong aria-hidden="true">10.3.</strong> Remapping Caps Lock to Control</a></li><li class="chapter-item expanded "><a href="lubuntu/using-neovim-in-lubuntu.html"><strong aria-hidden="true">10.4.</strong> Using Neovim</a></li><li class="chapter-item expanded "><a href="lubuntu/rbenv-on-lubuntu.html"><strong aria-hidden="true">10.5.</strong> Using Rbenv</a></li><li class="chapter-item expanded "><a href="lubuntu/configuring-openbox-on-lubuntu.html"><strong aria-hidden="true">10.6.</strong> Configuring OpenBox</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
