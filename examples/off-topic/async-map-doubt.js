async function main(arr) {
  const allResult = arr.map(async (o) => {
    const result = await g(o);
    console.log({result});
  });
  console.log({allResult})
}
function g(o) {
  return new Promise((resolve) => {
    console.log('processing ', o.s);
    setTimeout(() => {
      resolve(o);
    }, o.t);
  });
}
main([{ s: '1', t: 1000 }, { s: '2', t: 500 }]);
