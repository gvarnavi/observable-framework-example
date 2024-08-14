import * as d3 from "npm:d3";
import {forceSimulation,forceLennardJonesPotential} from "npm:d3-force-md";

function sliceParticle(particle, theta) {

  const particle_copy = structuredClone(particle);
  const left = particle_copy.filter((d) => Math.tan(theta % Math.PI) * (d.x + 1e-6) < d.y);
  const right = particle_copy.filter((x) => !left.includes(x));
  return [left, right];
}

function drawNodes(svg, node_data, colorScale) {
  
  if (colorScale == null) {
    colorScale = (e) => null;
  }

  const node = svg
    .selectAll(".node")
    .data(node_data)
    .enter()
    .append("circle")
    .classed("node", true)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("fill", (d) => colorScale(d.energy))
    .attr("r", 0.5);

  return node;
}

export function surfaceEnergySlicePlot(square_lattice, theta_in_deg, color_scale, width) {

  const svg = d3.create("svg")
   .attr("width",width)
   .attr("height",width);

  const theta = (theta_in_deg / 180) * Math.PI;
  const [nodes, nodesRight] = sliceParticle(square_lattice, theta);

  svg.attr("viewBox", [-10, -11, 20, 21]);

  forceSimulation(nodes)
    .force("lennard-jones-BH", forceLennardJonesPotential().theta(0))
    .alphaDecay(0)
    .velocityDecay(0)
    .dt(0)
    .tick()
    .stop();

  forceSimulation(nodesRight)
    .force("lennard-jones-BH", forceLennardJonesPotential().theta(0))
    .alphaDecay(0)
    .velocityDecay(0)
    .dt(0)
    .tick()
    .stop();

  // draw nodes (with uniform radius and no edges)
  nodes.forEach((d) => {
    (d.x -= Math.sin(theta)), (d.y += Math.cos(theta));
  });
  nodesRight.forEach((d) => {
    (d.x += Math.sin(theta)), (d.y -= Math.cos(theta));
  });

  const node = drawNodes(
    svg,
    [...nodes, ...nodesRight],
    color_scale
  );

  svg
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", 0.05)
    .style("stroke-dasharray", 0.25)
    .attr("x1", 11 * Math.cos(theta))
    .attr("y1", 11 * Math.sin(theta))
    .attr("x2", -11 * Math.cos(theta))
    .attr("y2", -11 * Math.sin(theta));

  return svg.node();
}
