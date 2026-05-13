const canvas = document.getElementById('c');
            const ctx = canvas.getContext('2d');

            const THEMES = {
            neon:  ['#b57bee','#5ec9f5','#f55e9e','#7bf5c5','#f5c45e','#ee7bbb','#7bcdf5','#f57b7b'],
            ember: ['#f5844a','#f5c45e','#ee5e7b','#f5a33c','#e85588','#f5d080','#f0704a','#f59560'],
            ocean: ['#3ecccc','#4a9ef5','#5efaf0','#5e9af5','#1ad4a0','#2ae0d0','#60aff5','#40d4b0'],
            candy: ['#f55eb0','#c97bee','#ee5e5e','#f597ee','#ee7b9e','#d45ef5','#f57bb5','#ee9ef5'],
            };
            let theme = 'neon';
            let paused = false;
            let t = 0;
            const trailPts = [];

            function getConfig() {
            return {
                arms:    +document.getElementById('arms').value,
                ratio:   +document.getElementById('ratio').value,
                speed:   +document.getElementById('spd').value * 0.003,
                maxTrail: +document.getElementById('trail').value,
            };
            }

            function setup() {
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.parentElement.clientWidth;
            const h = Math.round(w * 0.65);
            canvas.width  = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width  = w + 'px';
            canvas.style.height = h + 'px';
            ctx.scale(dpr, dpr);
            clearTrail();
            }

            function clearTrail() {
            trailPts.length = 0;
            const w = canvas.width  / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);
            ctx.fillStyle = '#080810';
            ctx.fillRect(0, 0, w, h);
            }

            function hexToRgb(hex) {
            const r = parseInt(hex.slice(1,3),16);
            const g = parseInt(hex.slice(3,5),16);
            const b = parseInt(hex.slice(5,7),16);
            return [r,g,b];
            }

            function draw() {
            if (!paused) {
                const { arms, ratio, speed, maxTrail } = getConfig();
                const dpr = window.devicePixelRatio || 1;
                const W = canvas.width  / dpr;
                const H = canvas.height / dpr;
                const cx = W / 2, cy = H / 2;
                const R  = Math.min(cx, cy) * 0.82;

                t += speed;

                const pts = [];
                for (let a = 0; a < arms; a++) {
                const phase = (a / arms) * Math.PI * 2;
                const r1 = R * 0.54;
                const r2 = R * 0.32;
                const x = cx + r1 * Math.cos(t + phase) + r2 * Math.cos(ratio * t + phase);
                const y = cy + r1 * Math.sin(t + phase) + r2 * Math.sin(ratio * t + phase);
                pts.push({ x, y });
                }
                trailPts.push(pts);
                if (trailPts.length > maxTrail) trailPts.shift();

                ctx.fillStyle = 'rgba(8,8,16,0.14)';
                ctx.fillRect(0, 0, W, H);

                const colors = THEMES[theme];
                const len = trailPts.length;

                for (let i = 1; i < len; i++) {
                const alpha = (i / len);
                const prev = trailPts[i-1];
                const curr = trailPts[i];
                const maxA = curr.length;
                for (let a = 0; a < maxA; a++) {
                    if (!prev[a]) continue;
                    const [r,g,b] = hexToRgb(colors[a % colors.length]);
                    ctx.beginPath();
                    ctx.moveTo(prev[a].x, prev[a].y);
                    ctx.lineTo(curr[a].x, curr[a].y);
                    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
                    ctx.lineWidth = 0.8 + alpha * 2.2;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
                }

                const last = trailPts[trailPts.length - 1];
                if (last) {
                last.forEach((p, a) => {
                    const [r,g,b] = hexToRgb(colors[a % colors.length]);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r},${g},${b},1)`;
                    ctx.shadowColor = colors[a % colors.length];
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });
                }
            }
            requestAnimationFrame(draw);
            }

            ['arms','ratio','spd','trail'].forEach(id => {
            const el = document.getElementById(id);
            const out = document.getElementById(id + '-v');
            el.addEventListener('input', () => { out.textContent = el.value; clearTrail(); });
            });

            document.getElementById('btn-clear').addEventListener('click', clearTrail);

            document.getElementById('btn-pause').addEventListener('click', () => {
            paused = !paused;
            const btn = document.getElementById('btn-pause');
            btn.textContent = paused ? '▶ Resume' : '⏸ Pause';
            btn.classList.toggle('paused', paused);
            });

            [['btn-t1','neon'],['btn-t2','ember'],['btn-t3','ocean'],['btn-t4','candy']].forEach(([id, name]) => {
            document.getElementById(id).addEventListener('click', () => {
                theme = name;
                document.querySelectorAll('[id^="btn-t"]').forEach(b => b.classList.remove('active'));
                document.getElementById(id).classList.add('active');
                clearTrail();
                const el = document.getElementById('spd');
                if (name === 'neon')  { document.documentElement.style.setProperty('--accent','#b57bee'); }
                if (name === 'ember') { document.documentElement.style.setProperty('--accent','#f5844a'); }
                if (name === 'ocean') { document.documentElement.style.setProperty('--accent','#3ecccc'); }
                if (name === 'candy') { document.documentElement.style.setProperty('--accent','#f55eb0'); }
            });
            });

            window.addEventListener('resize', setup);
            setup();
            draw();