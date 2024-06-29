class QuickSort {
  constructor(values) {
    this.values = values;
    this.startSort = true;
    this.colors = new Array(values.length).fill(255); // Initialize all colors to white
  }

  async partition(start, end, speed) {
    let pivotIndex = start;
    let pivotValue = this.values[end];

    this.colors[pivotIndex] = color(255, 165, 0);

    for (let i = start; i < end; i++) {
      await sleep(60 - speed);

      if (this.values[i] < pivotValue) {
        await swap(this.values, i, pivotIndex, speed);
        this.colors[pivotIndex] = color(255);
        ++pivotIndex;
        this.colors[pivotIndex] = color(255, 165, 0);
      }
    }

    await swap(this.values, pivotIndex, end, speed);

    this.colors[pivotIndex] = color(144, 238, 144); // Light green
    return pivotIndex;
  }

  async quickSortSlice(start, end, speed) {
    if (start >= end) return;

    let pivotIndex = await this.partition(start, end, speed);

    await Promise.all([
      this.quickSortSlice(start, pivotIndex - 1, speed),
      this.quickSortSlice(pivotIndex + 1, end, speed),
    ]);

    for (let i = start; i <= end; ++i) {
      this.colors[i] = color(144, 238, 144); // Light green
    }
  }

  async sort(speed) {
    await this.quickSortSlice(0, this.values.length - 1, speed);
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
