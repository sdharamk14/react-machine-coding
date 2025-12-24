function* pageGenerator(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

const items = [1, 3, 4, 5, 4];
for (const pageData of pageGenerator(items, 2)) {
  console.log(pageData);
}
