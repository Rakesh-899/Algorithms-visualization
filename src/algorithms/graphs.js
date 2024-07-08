
const graphData={
    nodes: [
        {id: 0, label: "0"},
        {id: 1, label: "1"},
        {id: 2, label: "2"},
        {id: 3, label: "3"},
        {id: 4, label: "4"},
        {id: 5, label: "5"},
        {id: 6, label: "6"},
        {id: 7, label: "7"},
        {id: 8, label: "8"},
        {id: 9, label: "9"},
        {id: 10, label: "10"},
        {id: 11, label: "11"},
        {id: 12, label: "12"},
        {id: 13, label: "13"},
        {id: 14, label: "14"},
        {id: 15, label: "15"},
        {id: 16, label: "16"},
        {id: 17, label: "17"},
        {id: 18, label: "18"},
        {id: 19, label: "19"},
        {id: 20, label: "20"},
        {id: 21, label: "21"},
        {id: 22, label: "22"},
        {id: 23, label: "23"},
        {id: 24, label: "24"},
        {id: 25, label: "25"},
        {id: 26, label: "26"},
        {id: 27, label: "27"},
        {id: 28, label: "28"},
        {id: 29, label: "29"},
        {id: 30, label: "30"},
    ],
    links: [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 1, target: 3},
        {source: 1, target: 4},
        {source: 2, target: 5},
        {source: 2, target: 6},
        {source: 3, target: 7},
        {source: 3, target: 8},
        {source: 4, target: 9},
        {source: 4, target: 10},
        {source: 5, target: 11},
        {source: 5, target: 12},
        {source: 6, target: 13},
        {source: 6, target: 14},
        {source: 7, target: 15},
        {source: 7, target: 16},
        {source: 8, target: 17},
        {source: 8, target: 18},
        {source: 9, target: 19},
        {source: 9, target: 20},
        {source: 10, target: 21},
        {source: 10, target: 22},
        {source: 11, target: 23},
        {source: 11, target: 24},
        {source: 12, target: 25},
        {source: 12, target: 26},
        {source: 13, target: 27},
        {source: 13, target: 28},
        {source: 14, target: 29},
        {source: 14, target: 30},
    ]
};


const svg=d3.select("#graph-container").append("svg")
    .attr("class", "graph-svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, 800, 600])
    .attr("preserveAspectRatio", "xMidYMid meet");


const simulation=d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(400, 300));


function drag (simulation) {
    function dragstarted (event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx=event.subject.x;
        event.subject.fy=event.subject.y;
    }

    function dragged (event) {
        event.subject.fx=event.x;
        event.subject.fy=event.y;
    }

    function dragended (event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx=null;
        event.subject.fy=null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}


const link=svg.selectAll(".graph-link")
    .data(graphData.links)
    .enter().append("line")
    .attr("class", "graph-link")
    .style("stroke", "#ccc")
    .style("stroke-width", "2");


const node=svg.selectAll(".graph-node")
    .data(graphData.nodes)
    .enter().append("g")
    .attr("class", "graph-node")
    .call(drag(simulation));

node.append("circle")
    .attr("r", 20)
    .style("fill", "#fff")
    .style("stroke", "steelblue")
    .style("stroke-width", "2");

node.append("text")
    .attr("x", 0)
    .attr("y", 4)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(d => d.label);


simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
});


async function highlightNode (node, isVisited, isBacktracked=false) {
    svg.selectAll(".graph-node")
        .filter(d => d===node)
        .select("circle")
        .attr("fill", isVisited? "red":(isBacktracked? "pink":"#fff"))
        .attr("class", isVisited? "graph-visited":(isBacktracked? "graph-backtracked":""));

    return new Promise(resolve => setTimeout(resolve, speed));
}


async function dfs (node, visited=new Set()) {
    await highlightNode(node, true);

    for (let link of graphData.links.filter(l => l.source===node)) {
        if (!visited.has(link.target)) {
            visited.add(link.target);
            await dfs(link.target, visited);
        }
    }

    await highlightNode(node, false, visited.has(node));
}


async function bfs (root) {
    const queue=[root];
    const visited=new Set();
    const backtracked=new Set();

    while (queue.length>0) {
        const node=queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            await highlightNode(node, true);

            for (let link of graphData.links.filter(l => l.source===node)) {
                queue.push(link.target);
            }
        } else {
            backtracked.add(node);
            await highlightNode(node, false, true);
        }
    }
}

document.getElementById("run-dfs-btn").addEventListener("click", function () {
    dfs(graphData.nodes[0]);
});


document.getElementById("run-bfs-btn").addEventListener("click", function () {
    bfs(graphData.nodes[0]);
});

let speed=1000;
document.getElementById("graph-speed-control").addEventListener("input", function () {
    speed=2000-parseInt(this.value);
});
