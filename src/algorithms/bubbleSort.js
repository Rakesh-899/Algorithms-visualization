class BubbleSort {
  constructor(values) {
    this.values = values;
    this.colors = new Array(values.length).fill(255);
  }

  async sort(speed) {
    const n = this.values.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.colors[j] = color(255, 165, 0);

        if (this.values[j] > this.values[j + 1]) {
          await swap(this.values, j, j + 1, speed);
        }

        await sleep(60 - speed);
        this.colors[j] = color(255); // White
      }

      this.colors[n - i - 1] = color(144, 238, 144); // Light green
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
