const test = type => {
  switch (type) {
    case PageType.hoge:
      return `${pageConfigApiPath}/xx.json`;
    case type.hoge2:
      return `${pageConfigApiPath}/xx2.json`;
  }
};
