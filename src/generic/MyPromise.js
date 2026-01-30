class MyPromise {
  #thenCallbacks = [];
  #catchCallbacks = [];
  #value = null;
  #status = "pending";
  constructor(callback) {
    try {
      callback(this.#resolve, this.#reject);
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve = (value) => {
    if (this.#status !== "pending") return this;
    this.#value = value;
    this.#status = "fulfilled";
    return this;
  };

  #reject = (value) => {
    if (this.#status !== "pending") return this;
    this.#value = value;
    this.#status = "rejected";
    return this;
  };

  #executeCallbacks = () => {
    queueMicrotask(() => {
      if (this.#status === "fulfilled") {
        this.#thenCallbacks.forEach((callback) => callback(this.#value));
      } else if (this.#status === "rejected") {
        this.#catchCallbacks.forEach((callback) => callback(this.#value));
      }
    });
  };

  then = (onFulfilled, onRejected) => {
    if (this.#status === "pending") {
      if (onFulfilled && typeof onFulfilled === "function") {
        this.#thenCallbacks.push(onFulfilled);
      }
      if (onRejected && typeof onRejected === "function") {
        this.#catchCallbacks.push(onRejected);
      }
    } else {
      this.#executeCallbacks();
    }
  };

  catch = (onRejected) => {
    if (this.#status === "pending") {
      if (onRejected && typeof onRejected === "function") {
        this.#catchCallbacks.push(onRejected);
      }
    } else {
      this.#executeCallbacks();
    }
  };
  static resolve = (value) => {
    return new MyPromise((resolve) => resolve(value));
  };

  static reject = (value) => {
    return new MyPromise((resolve, reject) => reject(value));
  };
}
