function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomArray() {
  const numOfRects = parseInt(numOfRectsInput.value());
  return new Array(numOfRects).fill().map(() => random(height));
}

async function swap(values, pos1, pos2, speed) {
  await sleep(60 - speed);
  let temp = values[pos1];
  values[pos1] = values[pos2];
  values[pos2] = temp;
}
