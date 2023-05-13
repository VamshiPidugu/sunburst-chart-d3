import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

@Component({
  selector: 'sankey',
  template: `<div id='sankey-container'></div>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class SankeyComponent implements OnInit {
  constructor() {}
  data = {
    nodes: [
      {
        id: 'energy',
        name: 'Energy',
      },
      {
        id: 'resource',
        name: 'Resource',
      },
      {
        id: 'cutting',
        name: 'Cutting',
      },
      {
        id: 'product1',
        name: 'Product1',
      },
      {
        id: 'product2',
        name: 'Product2',
      },
      {
        id: 'product3',
        name: 'Product3',
      },
      {
        id: 'packaging',
        name: 'Packaging',
      },
      {
        id: 'painting',
        name: 'Painting/Gluing',
      },
      {
        id: 'pressing',
        name: 'Steel Pressing',
      },
      {
        id: 'moulding',
        name: 'Injection Moulding',
      },
    ],
    links: [
      {
        source: 0,
        target: 2,
        value: 30,
      },
      {
        source: 0,
        target: 9,
        value: 15,
      },
      {
        source: 0,
        target: 6,
        value: 15,
      },
      {
        source: 0,
        target: 8,
        value: 20,
      },
      {
        source: 0,
        target: 7,
        value: 10,
      },
      {
        source: 1,
        target: 2,
        value: 10,
      },
      {
        source: 1,
        target: 9,
        value: 10,
      },
      {
        source: 1,
        target: 8,
        value: 5,
      },
      {
        source: 1,
        target: 7,
        value: 10,
      },
      {
        source: 2,
        target: 3,
        value: 20,
      },
      {
        source: 2,
        target: 4,
        value: 20,
      },
      {
        source: 9,
        target: 3,
        value: 10,
      },
      {
        source: 9,
        target: 5,
        value: 15,
      },
      {
        source: 6,
        target: 3,
        value: 3.75,
      },
      {
        source: 6,
        target: 5,
        value: 3.75,
      },
      {
        source: 6,
        target: 4,
        value: 7.5,
      },

      {
        source: 8,
        target: 3,
        value: 5,
      },
      {
        source: 8,
        target: 4,
        value: 20,
      },
      {
        source: 7,
        target: 3,
        value: 5,
      },
      {
        source: 7,
        target: 4,
        value: 10,
      },
      {
        source: 7,
        target: 5,
        value: 5,
      },
    ],
  };

  ngOnInit() {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const svg = d3
      .select('#sankey-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const sankey = d3Sankey
      .sankey()
      .nodeWidth(36)
      .nodePadding(290)
      .size([width, height]);

    const path = sankey.link();
    sankey.nodes(this.data.nodes).links(this.data.links).layout(32);
    svg
      .append('g')
      .selectAll('.link')
      .data(this.data.links)
      .enter()
      .append('path')
      .attr('class', 'path')
      .attr('d', path)
      .style('stroke-width', (d) => Math.max(1, d.dy))
      .sort((a, b) => b.dy - a.dy);

    svg
      .append('g')
      .selectAll('.node')
      .data(this.data.nodes)
      .enter()
      .append('rect')
      .attr('class', 'node')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('height', (d) => d.dy)
      .attr('width', sankey.nodeWidth())
      .style('fill', '#ccc');

    svg
      .append('g')
      .selectAll('.node-label')
      .data(this.data.nodes)
      .enter()
      .append('text')
      .attr('class', 'node-label')
      .attr('x', (d) => d.x + sankey.nodeWidth() / 2)
      .attr('y', (d) => d.y + d.dy / 2);
  }
}
