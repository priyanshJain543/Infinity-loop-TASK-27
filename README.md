# ➰ Infinity Loop - Generative Art Visualizer

A professional, high-performance generative art engine built with HTML5 Canvas. Create hypnotic, mathematically-perfect spirograph patterns in real-time.

## 🔗 Live Demo
Check out the live project here:  
## 👉 Click here to View Live Demo **( https://priyanshjain543.github.io/Infinity-loop-TASK-27/)**
---

## 🚀 Key Features

* **Real-time Parametric Manipulation:** Adjust geometry using 4 distinct parameters (Arms, Ratio, Speed, Trail).
* **Dynamic Theming Engine:** Toggle between Neon, Ember, Ocean, and Candy palettes with CSS Variable injection.
* **Adaptive Resolution:** Built-in high-DPI scaling logic for crystal clear visuals on 4K and Retina displays.
* **State Management:** Pause/Resume functionality to capture and study complex geometric intersections.

## 🛠️ Technical Implementation

### Mathematical Core
The visualizer is based on the **Trochoid** family of curves. Each rotating arm calculates its position using the following parametric logic:

- **Orbital Radius ($r1$):** Controls the primary circular path.
- **Epicycle Radius ($r2$):** Controls the secondary rotation path.
- **Frequency Ratio:** Determines the symmetry and "looping" nature of the shape.

### Tech Stack
- **HTML5:** Semantic UI structure.
- **SCSS/CSS:** Modern Dark-UI with glassmorphism effects and custom range-slider styling.
- **JavaScript (ES6):** Canvas API, `requestAnimationFrame` for 60FPS, and event-driven control updates.
