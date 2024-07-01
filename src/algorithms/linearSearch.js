class LinearSearch {
    constructor (values) {
        this.values=values;
        this.colors=new Array(values.length).fill(255);
    }

    async sort (speed) {
        const n=this.values.length;
        let target=this.values[n-min(n, 10)];
        let val;
        for (let i=0; i<=n-1; i++) {
            this.colors[i]=color(255, 165, 0);
            await sleep(200-speed);
            if (target===this.values[i]) {
                // this.colors[i]=color(0, 255, 255);
                val=i;
                break;
            }
        }
        this.markSorted();
        this.colors[val]=color(255, 255, 0);;
    }

    markSorted () {
        this.colors=new Array(this.values.length).fill(color(255, 255, 255));
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
