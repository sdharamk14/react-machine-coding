const mean = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Invalid array");
  }

  if (!arr.length) {
    throw new Error("empty array");
  }

  return Math.sum(...arr) / arr.length;
};

function polyfillCall(obj, args) {
  obj.fn = this;
  const result = instanceObj[fn](...args);
  delete obj.fn;
  return result;
}

function countBitsOfBinary(num) {
  let count = 0;

  while (num > 0) {
    count = num & 1;
    num >>= 1;
  }
}

function bubbleSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j <= length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
  return arr;
}

function findDuplicates(numbers) {
  const seen = new Set();
  return numbers.some((num) => {
    if (seen.has(num)) return true;
    seen.add(num);
    return false;
  });
}

function heightOrDepthOfTree(root) {
  if (!root) return 0;
  return (
    Math.max(heightOrDepthOfTree(root.left), heightOrDepthOfTree(root.right)) +
    1
  );
}

function binaryTreesEqual(a, b) {
  //if both the roots are null
  if (a === null && b === null) return true;

  // if either of the root is null
  if (a === null || b === null) return false;

  //
  return (
    a.value === b.value &&
    binaryTreesEqual(a.left, b.left) &&
    binaryTreesEqual(a.right, b.right)
  );
}

//longest path or diameter of a tree
function diameterOfTree(root) {
  let maxDiameter = 0;

  function heightOfTree(node) {
    if (!node) return 0;

    //calculate left tree node's height
    const leftHeight = heightOfTree(node.left);
    //calculate right tree node's height
    const rightHeight = heightOfTree(node.right);

    //get the max of them
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  heightOfTree(root);
  return maxDiameter;
}

function flipBinaryTree(root) {
  if (!root) return root;

  flipBinaryTree(root.left);
  flipBinaryTree(root.right);
  const temp = root.left.value;
  root.left.value = root.right.value;
  root.right.value = temp;
  return root;
}

/**
 * @param {number[]} nums
 * @return {number}
 * this is solved using brute-force approach
 */
function triangularSum(nums) {
  if (nums.length === 1) return nums[0];
  let value = null;
  let temp = [...nums];
  while (true) {
    let newArr = [];
    let j = 1;
    while (j < temp.length) {
      const sum = temp[j - 1] + temp[j];
      const modSum = sum % 10;
      newArr.push(sum >= 10 ? modSum : sum);
      j++;
    }

    if (newArr.length !== 1) {
      temp = [...newArr];
    } else {
      value = newArr[0];
      break;
    }
  }
  return value;
}

//optimized version
function triangularSumV2(nums) {
  let n = nums.length;

  while (n > 1) {
    for (let i = 0; i < n - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    n--; // Each pass reduces the array size by 1
  }

  return nums[0];
}

export function debounce(cb, delay) {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

/**
 * Infinite currying
 * @param {*} a
 * @returns
 */
function sum(a) {
  return function (b) {
    if (!b) {
      return a;
    }
    return sum(a + b);
  };
}

/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const arr = this;
  let accumulator;
  let startIndex;

  if (!arr.length) {
    if (initialValue === undefined) {
      throw new Error("Cannot reduce on empty array without initial value");
    } else {
      return initialValue;
    }
  }

  if (initialValue === undefined) {
    accumulator = arr[0];
    startIndex = 1;
  } else {
    accumulator = initialValue;
    startIndex = 0;
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (arr.hasOwnProperty(i)) {
      accumulator = callbackFn(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

Array.prototype.myMap = function (callbackFn, thisArg) {
  if (this === null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  const arr = this;
  const result = new Array(this.length);

  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  let flag = 0;
  while (flag < arr.length) {
    if (arr.hasOwnProperty(flag)) {
      result[flag] = callbackFn.call(thisArg, arr[flag], flag, arr);
    }
    flag++;
  }

  return result;
};

Array.prototype.myFilter = function (callbackFn, thisArg) {
  if (this === null) {
    throw new TypeError("this is null");
  }

  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn should be a function");
  }

  let flag = 0;
  const result = [];

  while (flag <= this.length) {
    if (this.hasOwnProperty(flag)) {
      const newValue = callbackFn.call(thisArg, this[flag], flag, this);
      if (newValue) {
        result.push(newValue);
      }
    }

    flag++;
  }

  return result;
};

Function.prototype.myCall = function (thisArg, ...args) {
  const context = thisArg || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myApply = function (thisArg, args = []) {
  const context = thisArg || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function (thisArg, ...args) {
  const context = thisArg || globalThis;
  const self = this;

  return function (...args2) {
    const isNew = this instanceof boundFunction;
    const key = Symbol();
    context[key] = self;
    const result = context[key](...args, ...args2);
    delete context[key];
    return result;
  };
};

function mergeData(sessions) {
  if (!sessions.length) return [];

  const result = [];
  sessions.reduce((acc, cur) => {
    const { user, equipment, duration } = cur;
    if (acc[cur.user]) {
      acc[cur.user].equipment = [
        ...new Set([...acc[cur.user].equipment, ...equipment]),
      ].sort((a, b) => a.localeCompare(b));
      acc[cur.user].duration += cur.duration;
    } else {
      acc[cur.user] = { user, equipment: [...equipment], duration };
      result.push(acc[cur.user]);
    }
    return acc;
  }, {});

  return result;
}

/**
 * example "a.b.c.d.e";
 * @param {*} str
 * @returns
 */
function covertToObject(str) {
  const strAll = str.split(".");
  let flag = false;
  let value = null;
  return strAll.reduceRight((acc, cur) => {
    let newObj = {};
    if (!flag) {
      flag = true;
      value = cur;
    } else {
      if (value) {
        newObj = {
          [cur]: value,
        };
        value = null;
      } else {
        newObj = {
          [cur]: { ...acc },
        };
      }
    }
    return newObj;
  }, {});
}

/**
 * reverse nested object to a.b.c.d.e
 * @param {*} obj
 * @returns
 */
function packObject(obj) {
  let str = "";

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "object") {
      str = `${str}${key}.${packObject(value)}`;
    } else {
      str = `${key}.${value}`;
    }
  }

  return str;
}

/**
 * 
 * ["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
  length: 3,
  unique: true,
  sorted: true
}
 * @param {*} items 
 * @param {*} options 
 * @returns 
 */
function listFormat(items, options) {
  let final = "";
  let filteredItems = items.filter(
    (item) => typeof item === "string" && item.trim() !== ""
  );

  let itemsLength = filteredItems.length;
  if (itemsLength === 0) {
    return final;
  }

  if (options?.unique) {
    filteredItems = [...new Set(filteredItems)];
  }

  if (options?.sorted) {
    filteredItems.sort((a, b) => a.localeCompare(b));
  }

  if (options?.length) {
    let iterationCount = Math.min(options.length, itemsLength);
    iterationCount = iterationCount === 1 ? 1 : iterationCount;
    const result = generateArrayFromList(filteredItems, iterationCount);
    final = result.join(", ") + appendOtherItems(itemsLength - result.length);
  } else {
    const result =
      itemsLength > 1
        ? generateArrayFromList(filteredItems, itemsLength - 1)
        : filteredItems;
    final = result.join(", ") + appendAndLastItem(filteredItems);
  }

  return final;
}

function generateArrayFromList(items, length) {
  const result = [];
  let i = 0;
  while (i < length) {
    result.push(items[i]);
    i++;
  }
  return result;
}

function appendOtherItems(count) {
  return count > 0 ? ` and ${count} other${count > 1 ? "s" : ""}` : "";
}

function appendAndLastItem(items) {
  let lastItem = "";
  if (items.length > 1) {
    lastItem = items.at(-1);
  }
  return lastItem ? ` and ${lastItem}` : "";
}


/**
 * example - const object = { "a.b.0": 1, "a.b.1": 2, "a.b.2": 3, "a.c.0": "foo" };
 * @param {*} obj 
 * @param {*} prevKey 
 * @returns 
 */
function squashObject(obj, prevKey = "") {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    let newKey = prevKey;
    if (key !== "") {
      newKey = `${prevKey}${prevKey ? "." : ""}${key}`;
    }

    if (Array.isArray(value)) {
      result = {
        ...result,
        ...squashObject(value, newKey),
      };
    } else if (typeof value === "object" && value !== null) {
      result = {
        ...result,
        ...squashObject(value, newKey),
      };
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
