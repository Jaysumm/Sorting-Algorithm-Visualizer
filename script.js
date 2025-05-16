let array = [];
let delay = 100;

const container = document.getElementById("array-container");
const speedInput = document.getElementById("speed");
const sizeInput = document.getElementById("size");

speedInput.addEventListener("input", () => {
    delay = parseInt(speedInput.value);
});

sizeInput.addEventListener("input", generateArray);

function generateArray() {
    const size = parseInt(sizeInput.value);
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
    renderArray();
}

function renderArray(highlightIndex = -1) {
    container.innerHTML = "";
    array.forEach((height, i) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${height}px`;
        bar.style.width = `${Math.floor(800 / array.length)}px`;
        bar.style.backgroundColor = i === highlightIndex ? "red" : "teal";
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
    const algo = document.getElementById("algorithm").value;
    switch (algo) {
        case "bubble":
            await bubbleSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "selection":
            await selectionSort();
            break;
    }
}

// Sorting Algorithms with visualization
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            renderArray(j);
            await sleep(delay);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray(j);
                await sleep(delay);
            }
        }
    }
    renderArray();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray(j);
            await sleep(delay);
        }
        array[j + 1] = key;
        renderArray(i);
        await sleep(delay);
    }
    renderArray();
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            renderArray(j);
            await sleep(delay);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray(i);
            await sleep(delay);
        }
    }
    renderArray();
}

// Initial array
generateArray();
