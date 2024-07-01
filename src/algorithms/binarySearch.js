
class binarySearch {
    constructor (values) {
        this.values=values;
        values.sort((a, b) => a-b);
        this.colors=new Array(values.length).fill(255);
    }
    async sort (speed) {
        let target;
        // this.colors[2]=color(144, 238, 144);
        let left=0;
        let right=this.values.length-1;
        let n=this.values.length;
        target=this.values[n-min(n, 10)];
        // this.colors[left]=color(144, 238, 144); // light green
        // this.colors[right]=color(144, 238, 144); // light green
        while (left<=right) {
            let mid=Math.floor((left+right)/2);
            await sleep(220-speed);
            this.colors[left]=color(185, 107, 47);
            // await sleep(220-speed);
            this.colors[right]=color(185, 107, 47);
            // await sleep(220-speed);
            this.colors[mid]=color(0, 192, 203);
            await sleep(1220-speed);
            let l=left;
            let r=right;
            if (this.values[mid]===target) {
                this.colors[mid]=color(255, 255, 0);;//black ;
                return mid; // Target found at index mid
            } else if (this.values[mid]<target) {
                left=mid+1; // Search the right half
                this.colors[left]=color(255, 0, 0);
            } else {
                right=mid-1; // Search the left half
                this.colors[right]=color(255, 0, 0);
            }
            this.colors[l]=color(255); // light green
            // await sleep(220-speed);
            this.colors[r]=color(255); // light green
            await sleep(220-speed);
        }
        this.markVisited();

    }
    markVisited () {
        this.colors=new Array(this.values.length).fill(color(144, 238, 144));
    }
    draw (rectWidth) {
        for (let i=0; i<this.values.length; i++) {
            const rectX=i*rectWidth;
            const rectY=height-this.values[i];
            const rectColor=this.colors[i];

            fill(rectColor);
            rect(rectX, rectY, rectWidth, this.values[i]);
        }
    }
}