/// <reference path="../lib/p5.global-mode.d.ts" />

let values = [];
let sortingInstance;
let numOfRectsInput, speedSlider;
let resetButton;
let dummySortInstance;

function setup() {
  const headDiv = document.getElementById('heading');
  const upperDiv = document.getElementById('controls');
  const h =
    window.innerHeight - 2 * (upperDiv.clientHeight + headDiv.clientHeight);
  const w = 2 * h;
  createCanvas(w, h);

  numOfRectsInput = select('#numRectangles');
  numOfRectsInput.input(() => {
    values = generateRandomArray();
    sortingInstance = null;
    dummySortInstance = new DummySort(values);
  });
  speedSlider = select('#speedSlider');

  resetButton = select('#resetButton');
  resetButton.mousePressed(resetVisualization);

  values = generateRandomArray();
  dummySortInstance = new DummySort(values);
}

function draw() {
  clear();
  background('rgba(255,255,255, 0)');
  stroke(0);

  const rectWidth = width / numOfRectsInput.value();

  if (sortingInstance) {
    sortingInstance.draw(rectWidth);
  } else {
    dummySortInstance.draw(rectWidth);
  }
}

async function startVisualization(algorithm) {
  disableButtons();
  const speed = parseInt(speedSlider.value());
  frameRate(60);

  sortingInstance = createSortingInstance(algorithm, values);

  await sleep(500);
  await sortingInstance.sort(speed);

  enableButtons();
}

function regenerateArray() {
  values = generateRandomArray();
  console.log(values);
  sortingInstance = null;
  dummySortInstance = new DummySort(values);
}

function resetVisualization() {
  disableButtons();
  regenerateArray();
  enableButtons();
}

function disableButtons() {
  const startButtons = document.querySelectorAll('button:not(#resetButton)');
  startButtons.forEach((button) => {
    button.disabled = true;
  });
  numOfRectsInput.attribute('disabled', true);
  speedSlider.attribute('disabled', true);
}

function enableButtons() {
  const startButtons = document.querySelectorAll('button:not(#resetButton)');
  startButtons.forEach((button) => {
    button.removeAttribute('disabled');
  });
  numOfRectsInput.removeAttribute('disabled');
  speedSlider.removeAttribute('disabled');
}

function createSortingInstance(algorithm, values) {
  switch (algorithm) {
    case 'insertion':
      return new InsertionSort(values);
    case 'selection':
      return new SelectionSort(values);
    case 'bubble':
      return new BubbleSort(values);
    case 'merge':
      return new MergeSort(values);
    case 'quick':
      return new QuickSort(values);
    case 'radix':
      return new RadixSort(values);
    default:
      return new DummySort(values);
  }
}
