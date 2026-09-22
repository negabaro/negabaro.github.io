/* 카테고리 트리 (사이드바 / 카테고리 페이지 공통)
 * 데이터: /assets/nb-categories.json  ({ order: [...], posts: [{ c: "Backend/Rails/model", t, u }] })
 * 카테고리 규칙은 _data/categories.yml
 */
var NbCategories = (function () {
  var MIN_POSTS = 2; // 글이 이보다 적은 세부 카테고리는 부모 카테고리로 합친다

  function slug(full) {
    return full.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
  }

  function newNode(name, full) {
    return { name: name, full: full, posts: [], children: {} };
  }

  function count(node) {
    var c = node.posts.length;
    for (var k in node.children) c += count(node.children[k]);
    return c;
  }

  function collectPosts(node) {
    var list = node.posts.slice();
    for (var k in node.children) list = list.concat(collectPosts(node.children[k]));
    return list;
  }

  function prune(node) {
    for (var k in node.children) {
      var child = node.children[k];
      if (count(child) < MIN_POSTS) {
        node.posts = node.posts.concat(collectPosts(child));
        delete node.children[k];
      } else {
        prune(child);
        // 글 없이 하위 카테고리 하나만 있는 중간 단계는 합친다 (software-paradigm/OOP → software-paradigm)
        var keys = Object.keys(child.children);
        if (child.posts.length === 0 && keys.length === 1) {
          var only = child.children[keys[0]];
          child.posts = only.posts;
          child.children = only.children;
        }
      }
    }
  }

  function build(data) {
    var root = newNode('', '');
    data.posts.forEach(function (p) {
      var parts = p.c.split('/');
      var node = root;
      for (var i = 0; i < parts.length; i++) {
        var full = parts.slice(0, i + 1).join('/');
        if (!node.children[parts[i]]) node.children[parts[i]] = newNode(parts[i], full);
        node = node.children[parts[i]];
      }
      node.posts.push({ title: p.t, url: p.u });
    });
    // 최상위는 합치지 않고 하위만 정리
    for (var k in root.children) prune(root.children[k]);
    return root;
  }

  function sortedChildren(node, order) {
    return Object.keys(node.children).sort(function (a, b) {
      if (order) {
        var ia = order.indexOf(a), ib = order.indexOf(b);
        if (ia === -1) ia = order.length;
        if (ib === -1) ib = order.length;
        if (ia !== ib) return ia - ib;
      }
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }).map(function (k) { return node.children[k]; });
  }

  function load(cb) {
    fetch('/assets/nb-categories.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { cb(build(data), data.order); });
  }

  // ── Sidebar ──
  function renderSidebar(container, currentUrl) {
    load(function (root, order) {
      function hasActive(node) {
        for (var i = 0; i < node.posts.length; i++) if (node.posts[i].url === currentUrl) return true;
        for (var k in node.children) if (hasActive(node.children[k])) return true;
        return false;
      }

      function renderNode(node, depth) {
        var children = sortedChildren(node);
        var isActive = hasActive(node);

        var li = document.createElement('li');
        li.className = 'nb-cat-group';
        li.setAttribute('data-category', node.full.toLowerCase());

        var btn = document.createElement('button');
        btn.className = 'nb-cat-toggle' + (isActive ? ' active open' : '');
        btn.style.paddingLeft = (20 + depth * 16) + 'px';
        btn.setAttribute('data-tip', node.full);
        btn.innerHTML =
          '<span class="nb-cat-icon">&#9654;</span>' +
          '<span class="nb-cat-name"></span>' +
          '<span class="nb-cat-count">' + count(node) + '</span>';
        btn.querySelector('.nb-cat-name').textContent = node.name;
        btn.onclick = function () {
          this.classList.toggle('open');
          var sub = this.nextElementSibling;
          if (sub) sub.classList.toggle('open');
        };
        li.appendChild(btn);

        var sub = document.createElement('ul');
        sub.className = 'nb-cat-sub' + (isActive ? ' open' : '');
        children.forEach(function (c) { sub.appendChild(renderNode(c, depth + 1)); });

        var limit = Math.min(node.posts.length, 15);
        for (var j = 0; j < limit; j++) {
          var pli = document.createElement('li');
          pli.className = 'nb-tree-post';
          var a = document.createElement('a');
          a.href = node.posts[j].url;
          a.textContent = node.posts[j].title;
          a.setAttribute('data-tip', node.posts[j].title);
          a.style.paddingLeft = (20 + (depth + 1) * 16) + 'px';
          if (node.posts[j].url === currentUrl) a.className = 'active';
          pli.appendChild(a);
          sub.appendChild(pli);
        }
        if (node.posts.length > 15) {
          var moreLi = document.createElement('li');
          moreLi.className = 'nb-tree-post';
          var moreA = document.createElement('a');
          moreA.href = '/category/#' + slug(node.full);
          moreA.textContent = '... ' + (node.posts.length - 15) + ' more';
          moreA.style.paddingLeft = (20 + (depth + 1) * 16) + 'px';
          moreA.style.fontStyle = 'italic';
          moreA.style.color = 'var(--gray-400)';
          moreLi.appendChild(moreA);
          sub.appendChild(moreLi);
        }
        li.appendChild(sub);
        return li;
      }

      var ul = document.createElement('ul');
      ul.className = 'nb-sidebar-nav';
      ul.id = 'nb-sidebar-nav';
      sortedChildren(root, order).forEach(function (c) { ul.appendChild(renderNode(c, 0)); });
      container.appendChild(ul);

      var filterInput = document.getElementById('nb-sidebar-filter');
      if (filterInput) {
        filterInput.addEventListener('input', function () {
          var q = this.value.toLowerCase();
          ul.querySelectorAll('.nb-cat-group').forEach(function (g) {
            var match = !q || g.getAttribute('data-category').indexOf(q) !== -1;
            if (!match) {
              g.querySelectorAll('.nb-cat-group').forEach(function (cg) {
                if (cg.getAttribute('data-category').indexOf(q) !== -1) match = true;
              });
            }
            g.style.display = match ? '' : 'none';
          });
        });
      }

      var active = container.querySelector('a.active');
      if (active) active.scrollIntoView({ block: 'center' });
    });
  }

  // ── Category page ──
  function renderPage(container) {
    load(function (root, order) {
      var html = [];
      function esc(s) {
        return s.replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; });
      }
      function renderNode(node, depth) {
        var tag = depth === 0 ? 'h2' : 'h3';
        var label = depth === 0 ? node.name : node.full.split('/').slice(1).join(' / ');
        html.push('<section class="nb-catpage-section nb-catpage-depth-' + Math.min(depth, 2) + '" id="' + slug(node.full) + '">');
        html.push('<' + tag + '>' + esc(label) + ' <span class="nb-catpage-count">' + count(node) + '</span></' + tag + '>');
        if (node.posts.length) {
          html.push('<ul>');
          node.posts.forEach(function (p) {
            html.push('<li><a href="' + esc(p.url) + '">' + esc(p.title) + '</a></li>');
          });
          html.push('</ul>');
        }
        html.push('</section>');
        sortedChildren(node).forEach(function (c) { renderNode(c, depth + 1); });
      }

      var tops = sortedChildren(root, order);
      html.unshift('<nav class="nb-catpage-toc">' + tops.map(function (t) {
        return '<a href="#' + slug(t.full) + '">' + esc(t.name) + ' <span>' + count(t) + '</span></a>';
      }).join('') + '</nav>');
      tops.forEach(function (t) { renderNode(t, 0); });
      container.innerHTML = html.join('');

      // 합쳐져서 없어진 세부 카테고리로 들어오면 가장 가까운 상위 카테고리로 이동
      var hash = decodeURIComponent(location.hash.slice(1));
      if (hash) {
        var parts = hash.split('-');
        while (parts.length && !document.getElementById(parts.join('-'))) parts.pop();
        var target = parts.length && document.getElementById(parts.join('-'));
        if (target) target.scrollIntoView();
      }
    });
  }

  return { slug: slug, renderSidebar: renderSidebar, renderPage: renderPage };
})();
