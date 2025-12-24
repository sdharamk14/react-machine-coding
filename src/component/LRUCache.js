class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  getValue(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.#addKeyAndValue(key, value); // move key to most recently used
    return value;
  }

  setValue(key, value) {
    if (this.cache.has(key)) {
      // key exists, just update it
      this.#addKeyAndValue(key, value);
    } else {
      // cache is full, remove LRU
      if (this.cache.size >= this.capacity) {
        const firstKey = this.cache.keys().next().value; // LRU key
        this.cache.delete(firstKey);
      }
      this.cache.set(key, value); // insert new key
    }
  }

  #addKeyAndValue(key, value) {
    this.cache.delete(key); // remove old position
    this.cache.set(key, value); // insert at the end (most recently used)
  }
}
