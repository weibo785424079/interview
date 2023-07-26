setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('resolve');
  });
  process.nextTick(() => {
    console.log('process.nextTick');
  });
}, 100);
setTimeout(() => {
  console.log('setTimeout2');
  process.nextTick(() => {
    console.log('process.nextTick');
  });
}, 100);
