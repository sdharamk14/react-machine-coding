class MyPromise {
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

  then = (onFulfilled, onRejected) => {
    if (this.#status === "fulfilled") {
      onFulfilled(this.#value);
    } else if (this.#status === "rejected") {
      onRejected(this.#value);
    }
  };

  catch = (onRejected) => {
    if (this.#status === "rejected") {
      onRejected(this.#value);
    }
  };
}
