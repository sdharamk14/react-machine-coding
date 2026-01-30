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
  const context = thisArg || globalThis; // object that will be used as the context for the function call
  const self = this; // this represents the function that is being bound

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

/**
Example code to run and check
const items = [1, 3, 4, 5, 4];
for (const pageData of pageGenerator(items, 2)) {
  console.log(pageData);
}
 * @param {*} items 
 * @param {*} pageSize 
 */
function* pageGenerator(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

/**
 * you would get flat listed comments with replies property
 * you need to convert them into nested comments array
 * @param {*} posts
 * @returns
 */
function NestedComments(posts) {
  const result = [];

  for (const post of posts) {
    if (!post.replyTo) {
      result.push(post);
    } else {
      const parent = result.find((item) => item.id === post.replyTo);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(post);
      }
    }
  }
  return result;
}

/**
 *
 * @param {*} val
 * @param {*} keys
 * @returns
 */
function deepOmit(val, keys) {
  if (typeof val !== "object" || val === null) {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((item) => {
      return deepOmit(item, keys);
    });
  }

  const objectKeys = Object.keys(val);
  const result = {};
  for (const key of objectKeys) {
    if (!keys.includes(key)) {
      if (typeof val[key] === "object" && !Array.isArray(val[key])) {
        result[key] = deepOmit(val[key], keys);
      } else {
        result[key] = val[key];
      }
    }
  }
  return result;
}

/**
 *const tree = {
  tag: 'body',
  children: [
    { tag: 'div', children: [{ tag: 'span', children: ['foo', 'bar'] }] },
    { tag: 'div', children: ['baz'] },
  ],
};
 * @param {} element
 * @param {*} count
 * @returns
 */
function serializeHTML(element, count = 0) {
  const indent = "\t".repeat(count); // 2 spaces per indent

  // Handle arrays of elements
  if (Array.isArray(element)) {
    return element
      .map((item) =>
        typeof item === "string"
          ? `${indent}${item}`
          : serializeHTML(item, count)
      )
      .join("\n");
  }

  const { tag, children = [] } = element;
  if (!tag) return ""; // skip if no tag

  // Opening tag
  let html = `${indent}<${tag}>`;

  // Children
  if (children.length) {
    html += "\n" + serializeHTML(children, count + 1) + `\n${indent}`;
  }

  // Closing tag
  html += `</${tag}>`;

  return html;
}

async function retryWithExponential(fn, retry = 0, delay = 60) {
  try {
    const result = await fn();
    return result;
  } catch (err) {
    if (retry === 0) throw err;
    return retryWithExponential(fn, retry - 1, delay * 2);
  }
}

/**
 * Polyfill for Promise.all
 * @param {*} promises
 * @returns
 */
async function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          completed++;
          results[index] = data;
          if (completed === promise.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

function forwardRotate(nums, k) {
  return nums.slice(-k).concat(nums.slice(0, nums.length - k));
}

function backwardRotate(nums, k) {
  return nums.slice(k).concat(nums.slice(0, k));
}

const result = forwardRotate([1, 2, 3, 4, 5, 6, 7], 3);
console.log(result); // [5, 6, 7, 1, 2, 3, 4]

const result2 = backwardRotate([1, 2, 3, 4, 5, 6, 7], 3);
console.log(result2); // [4, 5, 6, 7, 1, 2, 3]


// // function stockProfit(prices) {
// //   let profit = 0;
// //   let buy = prices[0];
// //   let sell = prices[0];
// //   let minPrice = prices[0];
// //   for (let j = 1; j < prices.length; j++) {
// //     const price = prices[j] - minPrice;
// //     if (price > profit) {
// //       profit = price;
// //       sell = prices[j];
// //       buy = minPrice;
// //     }

// import { format } from "url";

// //     if (prices[j] < minPrice) {
// //       minPrice = prices[j];
// //     }
// //   }
// //   return {
// //     profit,
// //     buy,
// //     sell,
// //   };
// // }

// // const result3 = stockProfit([5, 3, 8, 2, 7, 6]);
// // console.log(result3); // { profit: 5, buy: 2, sell: 7 }

// // function maxSubarray(nums) {
// //   let max = nums[0];
// //   let current = nums[0];
// //   let startIndex = 0;
// //   let endIndex = 0;
// //   for (let i = 1; i < nums.length; i++) {
// //     current = current + nums[i];
// //     if (current > max) {
// //       max = current;
// //       endIndex = i;
// //     }

// //     if (current < 0) {
// //       current = 0;
// //       startIndex = i;
// //       endIndex = i;
// //     }
// //   }
// //   console.log(nums.slice(startIndex + 1, endIndex + 1));
// //   return max;
// // }

// // const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// // const result = maxSubarray(nums);
// // console.log("🚀 ~ result:", result);

// const chunkArrayWithSize = (arr, size) => {
//   const result = [];
//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }
// };

// const divideArrayIntoParts = (arr, k) => {
//   const result = [];
//   const baseSize = Math.floor(arr.length / k);
//   const extra = arr.length % k;
//   let index = 0;
//   for (let i = 0; i < k; i++) {
//     let newSize = Math.min(index + baseSize, arr.length);
//     if (i === 0) {
//       newSize += extra;
//     }
//     result.push(arr.slice(index, newSize));
//     if (i === 0) {
//       index = index + baseSize + extra;
//     } else {
//       index += baseSize;
//     }
//   }

//   return result;
// };

// const result = divideArrayIntoParts([1, 2, 3, 4, 5, 6], 3);
// console.log(result);