class DummySort {
  constructor(values) {
    this.values = values;
  }

  async sort(speed) {
    // No sorting is required
  }

  draw(rectWidth) {
    for (let i = 0; i < this.values.length; i++) {
      const x = i * rectWidth;
      const y = height - this.values[i];
      const rectHeight = this.values[i];

      fill(255);
      rect(x, y, rectWidth, rectHeight);
    }
  }
}
