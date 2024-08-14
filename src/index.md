```js
import {surfaceEnergySlicePlot} from "./components/surface-energy.js"
```

```js
const color_scale = d3.scaleSequential(d3.interpolateTurbo).domain([-7, -2]);
const square_lattice = [...Array((8 * 2 + 1) ** 2)].map((d, i) => ({
  x: 0.975 * ((i % 17) - 8),
  y: 0.975 * (Math.floor(i / 17) - 8)
}));
```

```js
const theta_in_deg_slider = Inputs.range([0, 360], {
  label: "Slice angle",
  value: 60
});
const theta_in_deg = Generators.input(theta_in_deg_slider);
```
```js
const theta_in_deg_mod = (theta_in_deg % 180) - 90;
```
 
# Lennard Jones Surface Energy

<blockquote>

2024 Molecular Foundry Annual User Meeting  
Digital Science Communication: Reproducibility, Reactivity, and Web Interfaces  
Georgios Varnavides | 08/12/2024  

</blockquote> 

<div class="centered-div">
  ${theta_in_deg_slider}
  ${resize((width)=>surfaceEnergySlicePlot(square_lattice,theta_in_deg_mod,color_scale,width))}
  ${resize((width)=>Plot.legend({label:"normalized Lennard-Jones interatomic potential energy",width:2*width/3,color:{domain:[-3,0]},style:{margin:'0 auto'}}))}
</div>

<style>

h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 4vw;
  font-weight: 900;
  line-height: 1;
}

.centered-div {
  margin: 0 auto;
  max-width: 480px;
}

blockquote {
  max-width: none;
  border-left: 6px solid #ccc;
  margin-left: 6px;
  padding-left: 6px;
}

</style>
