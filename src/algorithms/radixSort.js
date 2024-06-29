class RadixSort {
  constructor(values) {
    this.values = values;
    this.colors = new Array(values.length).fill(255);
  }

  async sort(speed) {
    const maxNum = Math.max(...this.values);
    const maxDigitCount = Math.floor(Math.log10(maxNum) + 1);

    for (let k = 0; k < maxDigitCount; k++) {
      let buckets = Array.from({ length: 10 }, () => []);

      for (let i = 0; i < this.values.length; i++) {
        const num = this.values[i];
        const digit = getDigit(num, k);
        buckets[digit].push(num);
        this.colors[i] = color(255, 165, 0);
      }

      let sortedValues = [];
      for (let bucket of buckets) {
        sortedValues.push(...bucket);
      }

      for (let i = 0; i < this.values.length; i++) {
        this.values[i] = sortedValues[i];
        await sleep(60 - speed);
        this.colors[i] = color(255); // White
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

// Helper function to get the digit at a specific position
function getDigit(num, position) {
  return Math.floor(Math.abs(num) / Math.pow(10, position)) % 10;
}
