const obj = new Object();

obj['sample'] = new Object();

obj['sample'].a1 = { "id": 1, "name": "one" };
obj['sample'].a2 = { "id": 2, "name": "two" };
obj['sample'].a3 = { "id": 3, "name": "three" };
obj['sample'].a4 = { "id": 4, "name": "four" };
obj['sample'].a5 = { "id": 5, "name": "five" };

if (obj['sample'].a6) {
  console.log("true");
} else {
  console.log("false");
};

