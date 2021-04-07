How?
Delete everything except _posts/, images
Move _posts to blog/posts according to the directory guide
Move images to blog/.vuepress/public/images
npm install --dev vuepress
npm run dev
Create the following file blog/.vuepress/config.js and follow the instructions at VuePress Config
This gives you a title link back to the site home page
remove all layout: ... entries from the markdown frontmatter as the jekyll frontmatter will conflict
vuepress eject to eject the default style into blog/.vuepress so we can start tweaking details
npm run build
Follow Snipcarts tutorial
Circle back to configuring the default theme.

[Moving from Jekyll to VuePress]: https://joshpeak.net/posts/2018-11-13-vuepress.html
