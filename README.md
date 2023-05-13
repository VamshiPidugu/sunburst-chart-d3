# sunburst-chart-d3

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-c9xfb6)

A sunburst chart is a visualization chart used to represent hierarchical data in a circular layout. It is often used to show the proportions and relationships between different levels of a hierarchy. Each level of the hierarchy is represented by concentric circles, and the sectors within each circle represent the children of the parent level.

Here Sunburst Chart is designed using d3 where the

# JSON structure

name - parent node
children- the chid nodes of the parent
size - the arc width

{
name: 'A',
children: [
{
name: 'B',
children: [
{
name: 'C',
children: [
{
name: 'D',
size: 30,
},
],
},
],
}

# creates arc

const arc = d3
.arc()
.startAngle((d) => d.x0)
.endAngle((d) => d.x1)
.padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
.padRadius(radius)
.innerRadius((d) => (d.y0 _ 2) / 420)
.outerRadius((d) => (d.y1 _ 2) / 425);

# creates heirarchy

const partition = (data) => {
const root = d3
.hierarchy(data)
.sum((d) => d.size)
.sort((a, b) => b.value - a.value);

      return d3.partition().size([2 * Math.PI, radius * radius])(root);
    };
