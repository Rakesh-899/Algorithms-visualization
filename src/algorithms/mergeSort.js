class MergeSort {
  constructor(values) {
    this.values = values;
    this.colors = new Array(values.length).fill(color(255));
  }

  async merge(start, mid, end, speed) {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;

    const leftArr = new Array(leftSize);
    const rightArr = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
      leftArr[i] = this.values[start + i];
    }
    for (let j = 0; j < rightSize; j++) {
      rightArr[j] = this.values[mid + 1 + j];
    }

    let i = 0,
      j = 0,
      k = start;

    while (i < leftSize && j < rightSize) {
      if (leftArr[i] <= rightArr[j]) {
        this.values[k] = leftArr[i];
        this.colors[start + i] = color(0, 255, 255);
        i++;
      } else {
        this.values[k] = rightArr[j];
        this.colors[mid + 1 + j] = color(255, 131, 193); // Pink
        j++;
      }
      k++;
      await sleep(60 - speed);
    }

    while (i < leftSize) {
      this.values[k] = leftArr[i];
      this.colors[start + i] = color(0, 255, 255);
      i++;
      k++;
      await sleep(60 - speed);
    }

    while (j < rightSize) {
      this.values[k] = rightArr[j];
      this.colors[mid + 1 + j] = color(255, 131, 193); // Pink
      j++;
      k++;
      await sleep(60 - speed);
    }

    for (let m = start; m <= end; m++) {
      this.colors[m] = color(144, 238, 144);
      await sleep(60 - speed);
    }
  }

  async mergeSortSlice(start, end, speed) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await Promise.all([
      this.mergeSortSlice(start, mid, speed),
      this.mergeSortSlice(mid + 1, end, speed),
    ]);

    await this.merge(start, mid, end, speed);
  }

  async sort(speed) {
    await this.mergeSortSlice(0, this.values.length - 1, speed);
    this.markSorted();
  }

  markSorted() {
    this.colors = new Array(this.values.length).fill(color(144, 238, 144));
  }

  draw(rectWidth) {
    for (let i = 0; i < this.values.length; i++) {
      const rectX = i * rectWidth;
      const rectY = height - this.values[i];
      const rectColor = this.colors[i];

      fill(rectColor);
      rect(rectX, rectY, rectWidth, this.values[i]);
    }
  }
}
