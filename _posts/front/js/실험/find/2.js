const users = [
  { id: "101", name: "Alice" },
  { id: "102", name: "Bob" },
  { id: "103", name: "Charlie" }
];

const id = "102";
const targetUser = [].find(v => v.id === id);

console.log("targetUser", targetUser);
