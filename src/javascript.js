function fizzBuzz(n) {
  let result;
  for (let count = 1; count <= n; count += 1) {
    if (count / 3 === 1) {
      return (result = "FizzBuzz");
    }
  }
  console.log(result);
  return result;
}

fizzBuzz(3);
