class InsertionSort {
  constructor(values) {
    this.values = values;
    this.colors = new Array(values.length).fill(255);
  }

  async sort(speed) {
    const n = this.values.length;
    for (let i = 1; i < n; i++) {
      let key = this.values[i];
      let j = i - 1;

      this.colors[i] = color(144, 238, 144);

      while (j >= 0 && this.values[j] > key) {
        this.values[j + 1] = this.values[j];

        this.colors[j + 1] = color(144, 238, 144);
        this.colors[j] = color(255);

        await sleep(60 - speed);

        j--;
      }

      this.values[j + 1] = key;

      this.colors[j + 1] = color(144, 238, 144);

      await sleep(60 - speed);

      for (let k = 0; k <= i; k++) {
        this.colors[k] = color(255);
      }
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
