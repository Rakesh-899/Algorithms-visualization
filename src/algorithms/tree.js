document.addEventListener("DOMContentLoaded", function () {
    let width=450;
    const height=650;

    if (window.matchMedia("(max-width: 750px)").matches) {
        width=400;
    }
    const treeData={
        name: "Root",
        children: [
            {
                name: "1", children: [
                    {
                        name: "2", children: [
                            {name: "3"},
                            {
                                name: "4", children: [
                                    {name: "5"},
                                    {name: "6", children: [{name: "55"}]}
                                ]
                            }
                        ]
                    },
                    {
                        name: "7", children: [
                            {name: "8"},
                            {
                                name: "9", children: [
                                    {name: "10"},
                                    {
                                        name: "11", children: [{name: "45"},
                                        {name: "46"}
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "12", children: [
                    {
                        name: "13", children: [
                            {name: "14"},
                            {
                                name: "15", children: [
                                    {name: "16"},
                                    {name: "17", children: [{name: "51"}]}
                                ]
                            }
                        ]
                    },
                    {
                        name: "18", children: [
                            {name: "19"},
                            {
                                name: "20", children: [
                                    {name: "21"},
                                    {
                                        name: "22", children: [{name: "47"},
                                        {name: "48"}]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "23", children: [
                    {
                        name: "24", children: [
                            {name: "25"},
                            {
                                name: "26", children: [
                                    {name: "27"},
                                    {name: "28", children: [{name: "52"}]}
                                ]
                            }
                        ]
                    },
                    {
                        name: "29", children: [
                            {name: "30"},
                            {
                                name: "31", children: [
                                    {name: "32"},
                                    {
                                        name: "33", children: [{name: "49"},
                                        {name: "50"}]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "34", children: [
                    {
                        name: "35", children: [
                            {name: "36"},
                            {
                                name: "37", children: [
                                    {name: "38"},
                                    {name: "39", children: [{name: "54"}]}
                                ]
                            }
                        ]
                    },
                    {
                        name: "40", children: [
                            {name: "41"},
                            {
                                name: "42", children: [
                                    {name: "43", children: [{name: "53"}]},
                                    {name: "44"}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const treeLayout=d3.tree()
        .size([height-100, width-100]);

    const rootNode=d3.hierarchy(treeData);
    const tree=treeLayout(rootNode);

    const svg=d3.select("#tree-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(10, 10)");

    const nodes=svg.selectAll(".node")
        .data(tree.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    nodes.append("circle")
        .attr("r", 20)
        .attr("fill", "#fff");

    nodes.append("text")
        .attr("dy", 3)
        .attr("text-anchor", "middle")
        .text(d => d.data.name);

    const links=svg.selectAll(".link")
        .data(tree.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d => `M${d.source.y},${d.source.x}L${d.target.y},${d.target.x}`);

    function dfs (node, speedFactor) {
        return new Promise(resolve => {
            svg.selectAll(".node")
                .filter(d => d===node)
                .select("circle")
                .attr("class", "visited")
                .attr("fill", "red");

            setTimeout(() => {
                svg.selectAll(".node")
                    .filter(d => d===node)
                    .select("circle")
                    .attr("fill", "#fff")
                    .attr("class", "");

                if (node.children) {
                    let promise=Promise.resolve();
                    node.children.forEach(child => {
                        promise=promise.then(() => dfs(child, speedFactor));
                    });
                    promise.then(() => {
                        svg.selectAll(".node")
                            .filter(d => d===node)
                            .select("circle")
                            .attr("class", "visited")
                            .attr("fill", "red");

                        setTimeout(() => {
                            svg.selectAll(".node")
                                .filter(d => d===node)
                                .select("circle")
                                .attr("fill", "#fff")
                                .attr("class", "");
                            resolve();
                        }, 1000/speedFactor);
                    });
                } else {
                    resolve();
                }
            }, 1000/speedFactor);
        });
    }

    function bfs (node, speedFactor) {
        let queue=[node];

        function processNode (node) {
            return new Promise(resolve => {
                svg.selectAll(".node")
                    .filter(d => d===node)
                    .select("circle")
                    .attr("class", "visited")
                    .attr("fill", "red");

                setTimeout(() => {
                    svg.selectAll(".node")
                        .filter(d => d===node)
                        .select("circle")
                        .attr("fill", "#fff")
                        .attr("class", "");

                    resolve();
                }, 1000/speedFactor);
            });
        }

        async function traverse () {
            while (queue.length>0) {
                let currentLevelSize=queue.length;
                for (let i=0; i<currentLevelSize; i++) {
                    let currentNode=queue.shift();
                    await processNode(currentNode);
                    if (currentNode.children) {
                        queue.push(...currentNode.children);
                    }
                }
            }
        }

        traverse();
    }


    document.getElementById("run-dfs").addEventListener("click", function () {
        const speedFactor=document.getElementById("speed-control").value;
        dfs(rootNode, speedFactor);
    });


    document.getElementById("run-bfs").addEventListener("click", function () {
        const speedFactor=document.getElementById("speed-control").value;
        bfs(rootNode, speedFactor);
    });

});
