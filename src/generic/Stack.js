class Stack {
  constructor() {
    this.arr = [];
  }

  push(item) {
    this.arr.push(item);
    return this.arr;
  }

  pop() {
    if (isEmpty()) {
      throw new Error("stack is underflow");
    }
    return this.arr.pop(item);
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  peek() {
    return this.arr.at(-1);
  }
  clear() {
    this.arr = [];
  }

  print() {
    const string = "";
    this.arr.map((item) => string + item);
  }
}

