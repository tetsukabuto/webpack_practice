// モジュールとして読み込みたい場合はexport defaultをつける
export default () => {
  const obj = { a: 1, b: 2 };
  const newObj = { ...obj, c: 3 };
  //newObj内に...objで注入することになり newObj = {a: 1, b: 2, c: 3}となる
  console.log("this is module", newObj);
};
