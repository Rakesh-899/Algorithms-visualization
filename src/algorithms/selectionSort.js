class SelectionSort {
  constructor(values) {
    this.values = values;
    this.colors = new Array(values.length).fill(255);
  }

  async sort(speed) {
    const n = this.values.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (this.values[j] < this.values[minIndex]) {
          await sleep(60 - speed);
          minIndex = j;
        }
        this.colors[j] = color(211, 211, 211);
        await sleep(60 - speed);
        this.colors[j] = color(255);
      }

      await swap(this.values, i, minIndex, speed);

      this.colors[i] = color(144, 238, 144);
    }

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
