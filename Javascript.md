# JavaScript Execution Context Explained

## What Is an Execution Context?

An **execution context** is the environment in which JavaScript code is evaluated and executed. It defines:

- What variables are available  
- What functions can be called  
- What the value of `this` is  
- How scope and the scope chain work  

Each context stores:

1. **Variable Environment** – `var` variables, function declarations  
2. **Lexical Environment** – `let`, `const`, outer scope reference  
3. **`this` Binding`  
4. **Scope Chain**

---

## Types of Execution Contexts

### 1. Global Execution Context (GEC)

Created when JavaScript starts running the program.

- Creates the **global object** (`window`, `global`, etc.)
- Sets `this = global object`
- Creates global variables and functions  
- Only one GEC exists per program

---

### 2. Function Execution Context (FEC)

Created every time a function is **called**.

Includes:

- Local variables  
- Parameters  
- Its own `this`  
- Scope chain linking to outer scopes  

Multiple FECs can exist at the same time (stacked in the call stack).

---

### 3. Eval Execution Context

Created when `eval()` executes code.  
(Generally discouraged.)

---

## When Is an Execution Context Created?

Each execution context is created in two phases:

---

### 1. Creation Phase

Before code runs:

- Create the **variable environment**
- Create the **lexical environment**
- Hoist `var` variables → set to `undefined`
- Hoist function declarations → full function stored
- Determine `this` binding

---

### 2. Execution Phase

JavaScript runs the code line by line:

- Assign values to variables
- Execute functions
- Resolve identifiers using the scope chain

---

## Example Walkthrough

```js
function hello(name) {
  var greeting = "Hello";
  console.log(greeting + " " + name);
}

hello("Alice");
```

### Step-by-step:

#### 1. Global Execution Context
- `hello` is hoisted  
- `this = window` (in browser)

#### 2. Function Execution Context (hello)
- Parameter: `name = "Alice"`
- Hoisting: `greeting = undefined`
- Assignment: `greeting = "Hello"`
- Log output: `"Hello Alice"`

After execution, the function context is removed from the call stack.

---

## Summary Table

| Context Type | When Created | Contains |
|--------------|--------------|----------|
| Global | When script starts | Global vars, function declarations, global `this` |
| Function | When a function is called | Params, local vars, lexical env, `this`, scope chain |
| Eval | When `eval()` runs | Dynamic executed environment |

---

<!-- ## Additional Topics Available
If you want, I can also explain:

- Execution context vs. Call stack  
- Lexical environment vs. Variable environment  
- Hoisting in-depth  
- Closures and execution context  

Just ask! -->

# Lexical Environment vs Variable Environment in JavaScript

In JavaScript, these are internal concepts that help manage variables, scopes, and closures. They are closely related but **not exactly the same**.

---

## 1. Lexical Environment (LE)

A **Lexical Environment** is a data structure that holds:

1. **Identifier bindings** – variables and functions declared in that scope  
2. **Reference to the outer environment** (outer Lexical Environment)

### Key Points:

- Every execution context has a **Lexical Environment**  
- Used for **resolving identifiers** (figuring out what a variable refers to)  
- Can exist independently of the Variable Environment in some cases (like `const`/`let` in block scope)

### Example:

```js
let x = 10;

function foo() {
  let y = 20;
  console.log(x + y);
}

foo();
```

- `foo()` creates a **Lexical Environment** containing `y`  
- Its **outer reference** points to the global Lexical Environment, which contains `x`

---

## 2. Variable Environment (VE)

The **Variable Environment** is part of the execution context and is mainly used during **the creation phase**.  

It holds:

- **`var` variables** (hoisted and initialized to `undefined`)  
- **Function declarations** (hoisted fully)  
- A reference to the **outer environment**

### Key Points:

- Exists only **inside the execution context**  
- Mainly important during **hoisting and initialization**  
- After creation, modern JS engines conceptually merge VE with LE, but they are still distinct internally

---

## 3. Differences at a Glance

| Feature | Lexical Environment | Variable Environment |
|---------|-------------------|-------------------|
| Exists | Always, for resolving identifiers | Only in execution contexts, during creation phase |
| Stores | `let`, `const`, `var`, functions, outer reference | `var` variables, function declarations, outer reference |
| Phase | Both creation & execution | Creation phase (hoisting) |
| Purpose | Identifier resolution & closures | Memory allocation & hoisting |

---

## 4. Quick Example Showing the Difference

```js
function test() {
  console.log(a); // undefined (from Variable Environment)
  console.log(b); // ReferenceError (not hoisted in Lexical Environment)

  var a = 1;
  let b = 2;
}

test();
```

**Explanation:**

- `var a` is hoisted in the **Variable Environment**, so `a` exists as `undefined` before assignment  
- `let b` is **not hoisted in the same way**, so `b` is in the Lexical Environment but in a "temporal dead zone" until declared

---

## ✅ Summary

- **Lexical Environment:** Tracks variable/function references and outer scope for **execution and closures**  
- **Variable Environment:** Temporary structure for **hoisting and initial memory allocation**, mostly for `var` and function declarations

# How Many Execution Contexts Exist in Memory at the Same Time

The number of **execution contexts in memory at the same time** depends on the **call stack** at that moment.

---

## 1. Execution Context and Call Stack

- JavaScript uses a **single-threaded call stack** to keep track of execution contexts.  
- Each time a function is called, a **Function Execution Context (FEC)** is created and **pushed onto the stack**.  
- When the function finishes execution, its context is **popped off the stack**.  
- The **Global Execution Context (GEC)** is created when the program starts and **stays at the bottom** of the stack until the program ends.  

So, at any moment, the number of execution contexts in memory is equal to **the number of contexts currently on the call stack**.

---

## 2. Example

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Inside third");
}

first();
```

### Step-by-step Execution:

1. **Global Execution Context** is created → stack: `[GEC]`  
2. `first()` is called → `first` context created → stack: `[GEC, first]`  
3. `second()` is called → `second` context created → stack: `[GEC, first, second]`  
4. `third()` is called → `third` context created → stack: `[GEC, first, second, third]`  
5. `third()` finishes → popped → stack: `[GEC, first, second]`  
6. `second()` finishes → popped → stack: `[GEC, first]`  
7. `first()` finishes → popped → stack: `[GEC]`  

✅ Maximum execution contexts at the same time: **4** (GEC + three functions)

---

## 3. Key Points

- Only **one Global Execution Context** exists.  
- Function Execution Contexts exist **temporarily while functions are running**.  
- Execution contexts **do not overlap** unless functions are nested.  
- **Asynchronous calls** (like `setTimeout`) create new contexts when the callback is executed.

---

## Answer

> At any moment, the number of execution contexts in memory equals **the global execution context (always 1) + all function contexts currently active in the call stack**.

# Creation Phase of an Execution Context in JavaScript

When a new execution context is created (global or function), JavaScript first performs the **creation phase** before executing any code. This is sometimes called the **“memory allocation phase”**.

During this phase, the engine sets up everything the code will need to run.

---

## 1. Creation of Variable Environment

- JavaScript scans the code for **variable and function declarations**.  
- For `var` variables:  
  - Memory is allocated  
  - Initial value is set to `undefined` (hoisting)  
- For function declarations:  
  - Memory is allocated  
  - Entire function is hoisted, meaning it’s available in full before execution starts  

---

## 2. Creation of Lexical Environment

- A **Lexical Environment (LE)** object is created to keep track of:  
  - Block-scoped variables (`let` and `const`)  
  - Reference to the **outer Lexical Environment** (scope chain)  
- `let` and `const` are hoisted differently:  
  - They exist in memory but are in the **temporal dead zone (TDZ)** until the code execution reaches their declaration  

---

## 3. Setting up the `this` Binding

- The value of `this` is determined **based on how the function is called**:  
  - In the global context: `this` points to the global object (`window` in browser, `global` in Node)  
  - In a function: depends on whether it’s called as a method, constructor, or regular function  

---

## 4. Setting up the Scope Chain

- JavaScript creates a **scope chain** for the execution context, which determines how identifiers are resolved.  
- The scope chain always includes the **current Lexical Environment** plus **outer environments** up to the global scope.

---

## 5. Memory Allocation Summary

At the end of the creation phase:

| Item | What Happens |
|------|--------------|
| `var` variables | Allocated & initialized as `undefined` |
| `let`/`const` | Allocated in Lexical Environment, in TDZ |
| Function declarations | Fully hoisted and available |
| `this` | Value determined based on execution context |
| Scope chain | Built to include outer environments |

---

## 6. Example

```js
function greet(name) {
  console.log(message); // undefined (var hoisting)
  // console.log(greeting); // ReferenceError: greeting is in TDZ

  var message = "Hello";
  let greeting = "Hi";

  console.log(message); // "Hello"
  console.log(greeting); // "Hi"
}

greet("Alice");
```

**During creation phase:**

- `message` is hoisted → `undefined`  
- `greeting` is hoisted → in TDZ  
- `greet` function context is created  
- Scope chain is set up  
- `this` is determined  

---

## ✅ Summary

The **creation phase** is all about **preparing memory, hoisting, setting up `this`, and building the scope chain** so that the execution phase can run the code line by line without errors (except TDZ errors for `let`/`const`).  

# Call Stack in JavaScript

The **call stack** is a **data structure** used by JavaScript to keep track of **execution contexts**.  
Since JavaScript is **single-threaded**, it can only execute **one piece of code at a time**, and the call stack ensures the correct order of execution.

---

## 1. How the Call Stack Works

- When a JavaScript program runs, the **Global Execution Context (GEC)** is created and **pushed onto the stack**.  
- Each time a function is called:
  - A new **Function Execution Context (FEC)** is created.  
  - This FEC is **pushed on top of the stack**.  
- When a function finishes execution:
  - Its FEC is **popped off the stack**.  
- The program continues with the next execution context below it in the stack.

**Analogy:** Think of the call stack like a stack of plates:  
- You put new plates on top (**push**)  
- You remove the top plate when done (**pop**)  

---

## 2. Managing Nested Function Calls

Nested function calls are handled naturally by the stack:

```js
function first() {
  console.log("Inside first");
  second();
  console.log("Back in first");
}

function second() {
  console.log("Inside second");
  third();
}

function third() {
  console.log("Inside third");
}

first();
```

### Step-by-Step Execution:

1. **Global Execution Context** created → stack: `[GEC]`  
2. `first()` is called → `first` context pushed → stack: `[GEC, first]`  
3. `console.log("Inside first")` executes  
4. `second()` is called → `second` context pushed → stack: `[GEC, first, second]`  
5. `console.log("Inside second")` executes  
6. `third()` is called → `third` context pushed → stack: `[GEC, first, second, third]`  
7. `console.log("Inside third")` executes  
8. `third()` finishes → popped → stack: `[GEC, first, second]`  
9. `second()` finishes → popped → stack: `[GEC, first]`  
10. Back in `first()`: `console.log("Back in first")` executes  
11. `first()` finishes → popped → stack: `[GEC]`  

✅ Maximum stack depth here: 4 contexts (GEC + three functions)

---

## 3. Key Points About the Call Stack

1. **Single-threaded** – only one context executes at a time.  
2. **LIFO (Last In, First Out)** – last function pushed is the first to finish.  
3. **Handles nested calls automatically** – each new function call gets its own context.  
4. **Stack overflow** occurs if recursion or deeply nested calls exceed memory limits.  

---

## 4. Visual Representation

```
| third()   | <-- top (executing)
| second()  |
| first()   |
| GEC       | <-- bottom
```

- When `third()` finishes, it is removed from the top.  
- Execution continues with `second()`, then `first()`, and finally back to GEC.

---

## ✅ Summary

- The **call stack** keeps track of execution contexts in **LIFO order**.  
- Nested function calls are handled by **pushing each new context on top** and **popping it when done**.  
- This ensures the program executes functions in the correct order, even with multiple levels of nesting.

# Lexical Environment in JavaScript

A **Lexical Environment (LE)** is an internal data structure that keeps track of variables and functions in a particular scope and their relation to outer scopes.  
Every execution context (global, function, or block) has a Lexical Environment.

---

## 1. Components of a Lexical Environment

A Lexical Environment is made of **two main parts**:

### **1. Environment Record**
This is where **all identifiers (variables, constants, functions) declared in that scope are stored**.  

It contains:

- **Variables**: `var`, `let`, `const`  
  - `var` variables are hoisted and initialized to `undefined` during the creation phase  
  - `let` and `const` exist in the **temporal dead zone (TDZ)** until they are assigned  
- **Function declarations**: Fully hoisted and available before execution  
- **Arguments object** (inside function execution contexts)  
- **Special internal slots** for block-scoped constructs (like `const` in a block)

---

### **2. Outer Lexical Environment Reference**
This is a **pointer to the parent scope’s Lexical Environment** (the outer environment).  

- Forms the **scope chain**  
- Used to resolve identifiers not found in the current environment  
- Global Lexical Environment’s outer reference is `null`

---

## 2. How Variables Are Stored

- Variables are stored as **name-value pairs** in the environment record  

Example:

```js
function greet(name) {
  let greeting = "Hello";
  var message = "Hi";
  console.log(greeting + " " + name);
}

greet("Alice");
```

Inside `greet`’s Lexical Environment:

| Name       | Value       |
|------------|------------|
| `greeting` | "Hello"    |
| `message`  | "Hi"       |
| `name`     | "Alice"    |

- The **outer reference** points to the **Global Lexical Environment**, which may contain other variables like `console`.

---

## 3. Key Points

- A Lexical Environment **lives for the duration of its execution context**  
- Enables **closures** because inner functions keep a reference to the Lexical Environment of their outer scope  
- **Each block, function, or global scope has its own LE**

---

## 4. Visual Representation

```
Lexical Environment of greet() 
---------------------------------
Environment Record:
  name -> "Alice"
  greeting -> "Hello"
  message -> "Hi"
Outer Lexical Environment -> Global LE
```

- If `greet` accesses a variable not in its LE, it looks up the **outer reference** (scope chain) to find it

---

## ✅ Summary

A **Lexical Environment** contains:

1. **Environment Record** – local variables, constants, function declarations, arguments  
2. **Outer Lexical Environment Reference** – pointer to the parent scope to form the scope chain  

This allows **JavaScript to resolve variables and create closures**.

# Lexical Environment and Scope Chain in JavaScript

A **Lexical Environment (LE)** is a container for variables, functions, and a reference to its outer environment.  
The **scope chain** is the chain of these Lexical Environments that JavaScript follows to resolve identifiers (variables, functions) in nested scopes.

---

## 1. Outer Lexical Environment Reference

- Every Lexical Environment has an **internal reference** to its outer (parent) Lexical Environment.  
- This forms a **linked chain** of environments from the current scope all the way to the **Global Lexical Environment**.  

---

## 2. How Variable Lookup Works

When JavaScript encounters a variable:

1. It first looks in the **current Lexical Environment (current scope)**.  
2. If not found, it follows the **outer reference** to the parent Lexical Environment.  
3. This continues **up the chain** until:  
   - The variable is found, or  
   - The global scope is reached.  
4. If not found even in the global scope, a **ReferenceError** is thrown.  

This mechanism ensures **nested scopes can access outer scope variables**, but outer scopes **cannot access inner scope variables**.

---

## 3. Example

```js
let globalVar = "Global";

function outer() {
  let outerVar = "Outer";

  function inner() {
    let innerVar = "Inner";
    console.log(innerVar);   // "Inner" (current LE)
    console.log(outerVar);   // "Outer" (outer LE)
    console.log(globalVar);  // "Global" (global LE)
  }

  inner();
}

outer();
```

### Step-by-Step Scope Chain Lookup

1. `innerVar` → found in **inner function LE**  
2. `outerVar` → not in inner LE → check **outer() LE** → found  
3. `globalVar` → not in inner or outer LE → check **Global LE** → found  

- Each LE points to its **outer reference**, forming a **scope chain**:  

```
inner() LE -> outer() LE -> Global LE -> null
```

---

## 4. Key Points

- The **scope chain is created at the time of code definition** (lexical scoping), not execution.  
- Inner functions **remember the outer environments** they were defined in, which enables **closures**.  
- Scope chain is **unidirectional**: inner scopes can access outer scopes, but not vice versa.  

---

## ✅ Summary

- A **Lexical Environment** forms a **scope chain** through its **outer environment reference**.  
- Variable lookup follows the scope chain **from current LE → outer LEs → global LE**.  
- This allows nested functions to access variables from their parent scopes while keeping the outer scopes isolated.

# Scope vs Execution Context in JavaScript

Although both **scope** and **execution context** deal with variable accessibility in JavaScript, they are **different concepts**.

---

## 1. Scope

- **Definition:** Scope determines **where a variable is accessible in the code**.  
- **Type:** Conceptual / compile-time structure  
- **Purpose:** Resolving variable references  
- **Created:** At **code creation / parsing time**, before execution  
- **Lifespan:** Exists **lexically** in the code; does not change dynamically  
- **Examples:**  
  - Global scope  
  - Function scope  
  - Block scope (for `let` and `const`)  

**Key Points:**

- Scope is **lexical** – where a variable is defined determines its scope.  
- Scope forms the **scope chain**, which is used during identifier resolution.  
- Does **not include runtime info** like `this`.  

---

## 2. Execution Context

- **Definition:** An execution context is the **environment where JavaScript code is evaluated and executed**.  
- **Type:** Runtime / dynamic structure  
- **Purpose:** Keeps track of variables, functions, `this`, and the order of execution  
- **Created:** **At runtime**, whenever code is executed (global code, function call, eval)  
- **Lifespan:** Exists **while the code is running** in that context; removed after execution  
- **Components:**  
  - Variable Environment  
  - Lexical Environment  
  - `this` binding  
  - Outer environment reference (scope chain)

**Key Points:**

- Execution context is **dynamic** – created when code runs.  
- Each function call creates a **new execution context**.  
- Global execution context is created **once** at program start.  

---

## 3. Comparison Table

| Feature                   | Scope                               | Execution Context                        |
|----------------------------|------------------------------------|----------------------------------------|
| Definition                 | Where a variable is accessible      | Environment where code is executed     |
| Time of creation           | Compile/parse time                 | Runtime                                |
| Nature                     | Static / lexical                   | Dynamic / runtime                       |
| Lifespan                   | Till code is parsed                | Till function or program finishes      |
| Includes                   | Only variables and functions       | Variables, functions, `this`, scope chain |
| Example                    | Global, function, block            | Global execution context, function context |

---

## 4. Example Illustration

```js
let globalVar = "Global";

function foo() {
  let fooVar = "Foo";

  function bar() {
    let barVar = "Bar";
    console.log(globalVar, fooVar, barVar);
  }

  bar();
}

foo();
```

**Scope Analysis:**

- `barVar` → only accessible inside `bar()`  
- `fooVar` → accessible inside `foo()` and `bar()`  
- `globalVar` → accessible everywhere  

**Execution Context Analysis:**

1. **Global Execution Context** → contains `globalVar`  
2. `foo()` call → new execution context → contains `fooVar`  
3. `bar()` call → new execution context → contains `barVar`  

- Each execution context **has its own Lexical Environment**  
- Scope is **determined statically**, execution contexts are **created dynamically**  

---

## ✅ Summary

- **Scope:** Determines **where variables are visible** in the code (lexical, static)  
- **Execution Context:** Determines **how and where code runs** (dynamic, runtime)

# Determining `this` in a Function Execution Context

In JavaScript, the value of `this` is **not determined by where the function is defined**, but **by how the function is called**.

---

## 1. Rules for `this` Inside a Function

### **1. Global/Standalone Function Call**

```js
function foo() {
  console.log(this);
}

foo();
```

- **Non-strict mode:** `this` points to the **global object** (`window` in browsers, `global` in Node)  
- **Strict mode:** `this` is `undefined`  

---

### **2. Method Call (Function Called as Object Property)**

```js
const obj = {
  name: "Alice",
  greet: function() {
    console.log(this.name);
  }
};

obj.greet(); // "Alice"
```

- `this` points to the **object that called the function** (`obj` in this case)  

---

### **3. Constructor Function (Called with `new`)**

```js
function Person(name) {
  this.name = name;
}

const p = new Person("Bob");
console.log(p.name); // "Bob"
```

- `this` points to the **newly created object**  

---

### **4. Explicit Binding (`call`, `apply`, `bind`)**

```js
function sayHello() {
  console.log(this.name);
}

const user = { name: "Charlie" };

sayHello.call(user); // "Charlie"
sayHello.apply(user); // "Charlie"

const boundFn = sayHello.bind(user);
boundFn(); // "Charlie"
```

- `call` / `apply` → immediately invoke function with `this` set explicitly  
- `bind` → returns a new function with `this` permanently set  

---

### **5. Arrow Functions**

```js
const obj = {
  name: "Diana",
  greet: () => {
    console.log(this.name);
  }
};

obj.greet();
```

- Arrow functions **do not have their own `this`**  
- `this` is **lexically inherited** from the surrounding scope  

---

## 2. Summary Table

| Call Type                   | Value of `this`                                  |
|------------------------------|------------------------------------------------|
| Global function (non-strict) | Global object (`window` / `global`)          |
| Global function (strict)     | `undefined`                                   |
| Object method                | Object that owns the method                   |
| Constructor (`new`)          | Newly created object                           |
| `call` / `apply`             | Explicitly provided object                     |
| `bind`                        | Permanently bound object                        |
| Arrow function               | Lexical `this` from surrounding scope         |

---

## 3. How Execution Context Handles `this`

When a **Function Execution Context (FEC)** is created:

1. A **new Lexical Environment** is created for local variables and functions.  
2. The **`this` binding** is determined according to **how the function was called**.  
3. The FEC stores this value in its internal `this` binding.  
4. Inside the function, any reference to `this` uses this stored value.  

---

## ✅ Key Points

- `this` is **dynamic in normal functions** → depends on **caller**.  
- `this` is **lexical in arrow functions** → depends on **defining scope**.  
- Execution Context **stores the resolved `this`** so it can be used during code execution.

# Temporal Dead Zone (TDZ) and `let` / `const` in JavaScript

In JavaScript, variables declared with `let` and `const` are **hoisted** to the top of their scope **but are not initialized**.  

Accessing them **before their declaration** results in a **ReferenceError**. This period is called the **Temporal Dead Zone (TDZ)**.

---

## 1. How Hoisting Works for `var`, `let`, and `const`

| Declaration | Hoisting Behavior                                      | Initial Value Before Execution |
|-------------|------------------------------------------------------|--------------------------------|
| `var`       | Hoisted to top of scope                               | `undefined`                   |
| `let`       | Hoisted to top of block scope (TDZ applies)          | **uninitialized**             |
| `const`     | Hoisted to top of block scope (TDZ applies)          | **uninitialized**             |

- `var` variables can be accessed before declaration (returns `undefined`).  
- `let` and `const` variables **cannot be accessed** before they are initialized (throws ReferenceError).  

---

## 2. Example of TDZ

```js
console.log(a); // undefined (var is hoisted)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 30;
```

**Explanation:**

- `var a` → hoisted and initialized to `undefined`, so `console.log(a)` works.  
- `let b` and `const c` → hoisted but **not initialized** yet, so accessing them throws **ReferenceError**.  

---

## 3. Why TDZ Exists

1. **Avoids subtle bugs:**  
   - With `var`, variables are accessible before initialization, which can lead to unexpected behavior.  
   - TDZ ensures you **cannot use a variable before it’s properly declared**.

2. **Encourages block-scoped programming:**  
   - `let` and `const` are block-scoped. TDZ enforces **temporal order** of initialization.

3. **Const must be initialized:**  
   - `const` variables must have a value at declaration. TDZ ensures they cannot be accessed before assignment.  

---

## 4. Visual Representation

```
Block Scope Start
---------------------------------
Temporal Dead Zone (TDZ)  -> cannot access 'b' or 'c'
let b;                     -> declared, now initialized
const c = 30;              -> declared and initialized
```

- During TDZ, **any access to `let` or `const` variable throws Refere**

# Temporal Dead Zone (TDZ) in JavaScript

The **Temporal Dead Zone (TDZ)** is a **behavior in JavaScript where variables declared with `let` and `const` exist in memory but cannot be accessed until they are explicitly initialized**.  

It is called “temporal” because it exists **during a specific time period**: from the start of the block scope until the variable’s declaration is executed.

---

## 1. When TDZ Exists

- TDZ exists **between the entering of a block scope and the actual declaration of a `let` or `const` variable**.  
- During TDZ:
  - Accessing the variable results in a **ReferenceError**.
  - The variable is in **memory but uninitialized**.  

- Variables declared with `var` do **not** have TDZ because they are hoisted and initialized to `undefined`.  

---

## 2. Example of TDZ

```js
console.log(a); // undefined (var is hoisted)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 30;
```

**Explanation:**

- `var a` → no TDZ, initialized to `undefined`  
- `let b` → TDZ exists until `let b = 20` is executed  
- `const c` → TDZ exists until `const c = 30` is executed  

---

## 3. Why TDZ Exists

1. **Prevents accessing variables before initialization**  
   - Avoids subtle bugs caused by uninitialized variables.  

2. **Supports block scoping**  
   - Ensures `let` and `const` are used only after they are defined in their block.  

3. **Const enforcement**  
   - `const` variables must be initialized at the time of declaration, so TDZ ensures they cannot be accessed earlier.  

---

## 4. Visual Representation

```
Block Scope Start
---------------------------------
Temporal Dead Zone (TDZ)  -> cannot access 'b' or 'c'
let b;                     -> declared, now initialized
const c = 30;              -> declared and initialized
```

- **TDZ ends** once the variable is declared and initialized.  
- Before that, **any access throws ReferenceError**.  

---

## ✅ Summary

- TDZ is the **time period between entering a scope and initializing `let` or `const` variables**.  
- **Variables are hoisted but uninitialized** in TDZ.  
- Accessing them during TDZ throws a **ReferenceError**.  
- TDZ helps **prevent bugs and enforce proper initialization order**.

# Why Execution Context is the Foundation of Closures in JavaScript

A **closure** is a function that **remembers its outer lexical environment even after the outer function has finished execution**.  
To understand why EC is the foundation of closures, we need to look at **how JavaScript manages function execution and variable access**.

---

## 1. Execution Context Recap

Whenever a function is called, JavaScript creates a **Function Execution Context (FEC)** that contains:

1. **Variable Environment (VE)** → stores local variables and parameters  
2. **Lexical Environment (LE)** → includes the outer environment reference (scope chain)  
3. **`this` binding** → context of execution  

> The **Lexical Environment** is crucial for closures, as it keeps references to outer variables.

---

## 2. How Closures Work

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  }
}

const increment = outer();
increment(); // 1
increment(); // 2
increment(); // 3
```

### Step-by-Step:

1. **`outer()` is called → EC created**  
   - `count` is stored in **outer’s Variable Environment**  
   - `outer()` returns `inner()` function  

2. **`outer()` EC is popped off the call stack**  
   - Normally, its VE would be gone  

3. **Closure happens**  
   - `inner()` keeps a reference to **outer’s Lexical Environment**  
   - `count` persists because the **Lexical Environment is preserved in memory**  

---

## 3. Why Execution Context is the Foundation

1. **Lexical Environment is part of the EC**  
   - Closures rely on the **outer function’s Lexical Environment**  
   - Without EC, there would be no environment to “close over”  

2. **Scope Chain is preserved**  
   - EC stores the **outer environment reference**, which allows inner functions to access outer variables  

3. **Variable lifetime is extended**  
   - Normally, EC is destroyed after execution  
   - Closures extend the lifetime of EC’s Lexical Environment, enabling persistent private state  

---

## 4. Key Points

- **Closures are functions + preserved outer EC**  
- The **Function Execution Context** contains the **Lexical Environment**, which is what closures actually “close over”  
- Execution Context provides the **memory structure and scope chain** needed for closures to work  

---

## ✅ Summary

- **Execution Context (EC)** is the foundation of closures because it **stores the Lexical Environment and scope chain**.  
- Closures occur when an inner function **retains access to variables from an outer EC**, even after that outer function has returned.  
- The preservation of the **outer function’s EC** allows closures to maintain **persistent state and private variables**.

# What Happens When a Function Returns Another Function in JavaScript

When a function returns another function, the **inner function can retain access to the outer function’s Lexical Environment** even after the outer function has finished executing.  
This is the **foundation of closures**.

---

## 1. Example

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  }
}

const increment = outer(); // outer() returns inner()
increment(); // 1
increment(); // 2
```

---

## 2. Step-by-Step Execution

### **Step 1: Calling `outer()`**

- A **Function Execution Context (FEC) for `outer`** is created.  
- `count` is stored in `outer`'s **Variable Environment**.  
- The **Lexical Environment** of `outer` includes its VE and reference to the outer scope (global scope).  

---

### **Step 2: Returning `inner()`**

- `outer()` returns the function `inner` **without executing it yet**.  
- At this point, the **outer function’s EC is about to be popped off the call stack**.  
- Normally, local variables (`count`) would be discarded.  

---

### **Step 3: Closure Preservation**

- Because `inner` references `count`, the **Lexical Environment of `outer` is preserved in memory**.  
- This preserved Lexical Environment is now attached to `inner` as its **closure**.  
- `inner` maintains access to `count` even though `outer` has finished execution.  

---

### **Step 4: Executing `inner()`**

- A **new Function Execution Context for `inner`** is created.  
- `inner`’s Lexical Environment has:
  - Its own VE (local variables, if any)
  - Reference to **outer’s Lexical Environment** (via the closure)
- Accessing `count` looks up the **scope chain**, finds `count` in the preserved outer Lexical Environment, and updates it.  

---

## 3. Important Points

1. **Execution Contexts are normally destroyed after function returns**, but closures **preserve the outer Lexical Environment in memory** if inner functions reference it.  
2. **Persistent state:** This is how `inner` can maintain access to variables like `count` over multiple calls.  
3. **Memory management:** The preserved Lexical Environment stays alive **as long as there are references** to the inner function.  

---

## ✅ Summary

- When a function returns another function:
  - The **outer function’s EC is popped off**, but its **Lexical Environment is preserved** if the returned function references it.  
  - The returned function forms a **closure**, keeping access to the outer function’s variables.  
  - Each call to the returned function can access and modify these preserved variables.
