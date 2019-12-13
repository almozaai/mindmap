import * as d3 from "d3";

const generateTree = ideas => {
  const topParent = ideas.find(idea => idea.parentId === null);
  const tree = { ...topParent };
  tree.children = generateParents(ideas, topParent);
  return tree;
};

const generateParents = (ideas, parent) => {
  return ideas
    .filter(idea => idea.parentId === parent.id)
    .map(idea => {
      idea.children = generateParents(ideas, idea);
      return idea;
    });
};

export default class MindMap {
  constructor(element, nodes) {
    const table = generateTree(nodes);
    console.log("nodes", nodes);
    console.log("table", table);
    const dataStructure = d3.hierarchy(table);

    const treeLayout = d3.tree().size([300, 150]);
    const information = treeLayout(dataStructure);
    console.log(information.links());
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(20,20)");
    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(information.descendants());
    circles
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return d.y;
      })
      .attr("cy", function(d) {
        return d.x;
      })
      .attr("r", 5);
    const content = svg
      .append("g")
      .selectAll("text")
      .data(information.descendants());
    content
      .enter()
      .append("text")
      .text(function(d) {
        return d.data.body;
      })
      .attr("x", function(d) {
        return d.y - 6;
      })
      .attr("y", function(d) {
        return d.x - 8;
      });
    const connections = svg
      .append("g")
      .selectAll("line")
      .data(information.links());
    connections
      .enter()
      .append("line")
      .attr("x1", function(d) {
        return d.source.y;
      })
      .attr("y1", function(d) {
        return d.source.x;
      })
      .attr("x2", function(d) {
        return d.target.y;
      })
      .attr("y2", function(d) {
        return d.target.x;
      });
  }
}
