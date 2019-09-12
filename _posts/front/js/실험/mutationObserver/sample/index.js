const root = document.querySelector("#root");
const options = {
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
  attributeFilter: ["style", "class"]
};

const init = () => {
  root.appendChild(getButton("자식노드추가", addNode));
  root.appendChild(getButton("속성들추가", setAttrs));
  root.appendChild(getButton("내용변경", setCharacterData));
};
const getButton = (textContent, listener) => {
  let button = document.createElement("button");

  button.textContent = textContent;
  button.addEventListener("click", e => {
    let ul = e.target.parentNode;
    listener(ul);
  });
  return button;
};

const addNode = (target = root) => {
  let li = document.createElement("li");
  let span = document.createElement("span");
  let ul = document.createElement("ul");
  let level = Number(target.getAttribute("data-level")) + 1;

  span.textContent = level + "레벨 자식";
  ul.setAttribute("data-level", level);
  ul.appendChild(span);
  ul.appendChild(getButton("자식노드추가", addNode));
  ul.appendChild(getButton("속성들추가", setAttrs));
  ul.appendChild(getButton("내용변경", setCharacterData));
  ul.appendChild(getButton("제거", removeNode));
  setStyle(ul);
  li.appendChild(ul);
  target.appendChild(li);
};

const setAttrs = (target = root) => {
  setStyle(target);
  target.setAttribute("class", "attr-changed");
};

const setStyle = (target = root) => {
  let rgb = [
    (Math.random() * 255) ^ 0,
    (Math.random() * 255) ^ 0,
    (Math.random() * 255) ^ 0
  ].join();
  let styleTmpl = `background-color: rgb(${rgb})`;

  target.setAttribute("style", styleTmpl);
};

const setCharacterData = (target = root) => {
  let level = Number.parseInt(target.getAttribute("data-level"));
  let ts = new Date().getTime();
  let text = target.querySelector("span").firstChild;

  text.data = (level > 0 ? level + "레벨 자식" : "루트") + ` (수정:${ts})`;
};

const removeNode = target => {
  target.parentNode.remove();
};

if ("MutationObserver" in window) {
  let ts = new Date().getTime();
  let observer = new MutationObserver(mutations => {
    console.log(`${ts} --- ${mutations.length}건의 변형 감지`);
    mutations.forEach(mutation => {
      let target = mutation.target;
      let oldValueInfo;
      let curValueInfo;
      switch (mutation.type) {
        case "attributes":
          oldValueInfo = mutation.oldValue
            ? '"' + mutation.oldValue + '"에서 '
            : "";
          curValueInfo =
            '"' + target.getAttribute(mutation.attributeName) + '"으로';
          console.log(
            `${target.nodeName}노드의 ${mutation.attributeName}속성이 ${oldValueInfo}${curValueInfo} 변경됨`
          );
          break;
        case "childList":
          Array.prototype.forEach.call(mutation.addedNodes, node => {
            console.log(
              `${target.nodeName}노드에 ${node.nodeName}노드가 추가됨`
            );
          });
          Array.prototype.forEach.call(mutation.removedNodes, node => {
            console.log(
              `${target.nodeName}노드에 ${node.nodeName}노드가 제거됨`
            );
          });
          break;
        case "characterData":
          oldValueInfo = mutation.oldValue
            ? '"' + mutation.oldValue + '"에서 '
            : "";
          curValueInfo = '"' + target.data + '"으로';
          console.log(
            `${target.nodeName}노드의 characterData가 ${oldValueInfo}${curValueInfo} 변경됨`
          );
          break;
      }
    });
  });
  init();
  observer.observe(root, options);
} else {
  alert("MutationObserver를 사용할 수 없습니다");
}
