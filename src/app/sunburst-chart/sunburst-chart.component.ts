import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
const COLORS = [
  '#B70077',
  '#0384D4',
  '#EE6B0B',
  '#A319B1',
  '#11A611',
  '#1BB9FF',
  '#495A9C',
  '#EDB700',
  '#8B98C8',
  '#E6C49C',
  '#CCB8CE',
  '#9B9B9B',
];
@Component({
  selector: 'app-sunburst-chart',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.css'],
})
export class SunburstChartComponent implements OnInit {
  @Input() data: any;

  @Output() eventclick = new EventEmitter<void>();
  name: string;
  parent: string;
  constructor() {}

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const width = 932,
      radius = width / 6 + 70;
    // radius = width / 3 - 100;
    const format = d3.format(',d');
    //var border=1;
    var bordercolor = '#ccc';
    const partition = (data) => {
      const root = d3
        .hierarchy(data)
        .sum((d) => d.size)
        .sort((a, b) => b.value - a.value);

      return d3.partition().size([2 * Math.PI, radius * radius])(root);
    };
    const svg = d3
      .select('svg')
      .attr('width', width)
      .attr('height', width)
      .style('margin-left', '200px')
      // .attr("style", "outline: thin solid red;")
      //   .attr("viewBox", [0, 0, width, width])
      .style('font', 'normal normal normal 12px/8px sans-serif');
    // .style("stroke", bordercolor)
    //.style("stroke-width", 0.5)
    //.style('font-weight', 'bold');

    const g = svg
      .append('g')
      .attr('transform', `translate(${radius + 50},${radius + 20})rotate(270)`);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius)
      .innerRadius((d) => (d.y0 * 2) / 420)
      .outerRadius((d) => (d.y1 * 2) / 425);

    const root = partition(this.data);
    root.each((d) => (d.current = d));

    const labelsArray = new Set();

    //const color = d3.scaleOrdinal().range(Array.from(COLORS));
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // const color = d3.scaleOrdinal(d3.schemePaired);

    const maxDepth = d3.max(root.descendants(), (d) => d.depth);

    const path = g
      .append('g')
      .selectAll('path')
      .data(root.descendants().slice(0))
      .enter()
      .append('path')
      .attr('fill', (d) => {
        //  while (d.depth > 1) d = d.parent;
        if (!d.parent) return '#10A55A';
        return color(d.data.name);
      })
      .attr('stroke', 'white')
      .style('stroke-width', 0.75)
      .attr('fill-opacity', (d) => (!d.parent ? 1 : 0.6))
      .attr('d', (d) => arc(d.current));
    //.on('click', console.log('Clicked'));

    path
      .filter((d) => !d.children)
      .style('cursor', 'pointer')
      .on('click', function (event: any) {
        var node = d3.select(this).data()[0];
        console.log('Node Name:', node.data.name);
        console.log('Node Parent:', node.parent.data.name);
        submitevent({ child: node.data.name, parent: node.parent.data.name });
        // this.name = node.data.name;
        // this.parent = node.parent.data.name;
      });
    const submitevent = (value) => {
      this.eventclick.emit(value);
    };

    // d3.selectAll("path")
    // .on('click', function () {
    //   var node = d3.select(this).data()[0];
    //   console.log('Node :', node);
    //   console.log('Node Name:', node.data.name);
    // })
    path.append('title').text(
      (d) => `${getLabels(d).join(' -> ')}\n${format(d.value)}${' '}kg Co2 e`
      // `${d
      //   .ancestors()
      //   .map((d) => d.data.name)
      //   .reverse()
      //   .join('- > ')}\n${format(d.value)}`
      // {
      //   getLabels(d);
      // }
    );
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
    function onArcClick(value) {
      console.log('Reached');
      this.eventclick.emit(value);
    }
    function centroid(d) {
      //       let θ = (startAngle + endAngle) / 2;
      // let x = (outerRadius + innerRadius) / 2 * cos(θ);
      // let y = (outerRadius + innerRadius) / 2 * sin(θ);
      let θ = (arc.startAngle()(d) + arc.endAngle()(d)) / 2;
      let x = ((arc.outerRadius()(d) + arc.innerRadius()(d)) / 2) * Math.cos(θ);
      let y = ((arc.outerRadius()(d) + arc.innerRadius()(d)) / 2) * Math.sin(θ);
      console.log('In centroid ' + y, -x);
      return [y, -x];
    }
    const label = g
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(0))
      .enter()
      .append('text')
      .attr('dy', '0.35em')
      .style('fill', (d) => {
        if (!d.parent) return 'white';
      })
      .style('font', (d) => {
        if (!d.parent) return 'normal normal bold 12px/16px Montserrat';
      })
      // .attr(
      //   'dx',
      //   (d) =>
      //     `${
      //       d.data.name != 'Process'
      //         ? d.depth == maxDepth
      //           ? console.log(d.data.name+""+arc.centroid(d)+" "+d.parent.data.name)
      //           : '0.5em'
      //         : '-2em'
      //     }`
      // )
      .attr('dx', (d) => {
        const c = arc.centroid(d);

        if (d.data.name == 'Process') return '-2em';
        else if (d.depth == maxDepth) {
          console.log(c);
          if (c[0] > 0 && c[1] < 0) return '-0.5em';
        }
        `${
          d.data.name != 'Process'
            ? d.depth == maxDepth
              ? c[0]
              : '0.5em'
            : '-2em'
        }`;
      })
      .attr('transform', (d) => {
        // const c = arc.centroid(d);
        // console.log(d.data.name + ' ' + c);
        return `translate(${arc.centroid(d)}) rotate(${
          d.data.name != 'Process' ? 90 : 90
        })`;
      })
      .text((d) => d.data.name);

    function getAngle(d) {
      var thetaDeg =
        ((180 / Math.PI) * (arc.startAngle()(d) + arc.endAngle()(d))) / 2 - 90;
      return thetaDeg > 90 ? thetaDeg - 180 : thetaDeg;
    }

    function getLabels(d) {
      var x = d
        .ancestors()
        .map((d) => d.data.name)
        .reverse();
      x = x.filter(checkundefined);
      return x;
    }
    function checkundefined(d) {
      if (d == undefined) return false;
      return true;
    }
  }
}
