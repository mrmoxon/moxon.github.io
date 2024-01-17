document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heatmapCanvas');
    const ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawHeatmap(); // Redraw heatmap
    }

    function drawHeatmap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const points = generateRandomPoints(20, canvas.width, canvas.height);

        points.forEach(point => {
            drawConcentricCircles(point.x, point.y, 3 + Math.floor(Math.random() * 4)); 
        });
    }

    function generateRandomPoints(numberOfPoints, width, height) {
        let points = [];
        for (let i = 0; i < numberOfPoints; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            points.push({x: x, y: y});
        }
        return points;
    }

    function drawConcentricCircles(x, y, k) {
        for (let i = 1; i <= k; i++) {
            let radius = i * 30; 
            let color = getGradientColor(i, k);
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }    

    function getGradientColor(i, k) {
        const red = 255;
        const green = Math.round(140 + (115 * (i / k)));
        const blue = 0;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    function drawVoronoi(points) {
        // Basic Voronoi implementation
        // Note: This is a simplified version and may not handle all edge cases
        points.forEach((point, i, arr) => {
            arr.forEach(otherPoint => {
                if (point !== otherPoint) {
                    drawPerpendicularBisector(point, otherPoint);
                }
            });
        });
    }
    
    function drawPerpendicularBisector(p1, p2) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const slope = -(p2.x - p1.x) / (p2.y - p1.y);
        
        // Drawing a line segment instead of an infinite line for simplicity
        const lineLength = 1000; // Arbitrary large value
        const deltaX = lineLength / Math.sqrt(1 + slope * slope);
        const deltaY = slope * deltaX;
    
        ctx.beginPath();
        ctx.moveTo(midX - deltaX, midY - deltaY);
        ctx.lineTo(midX + deltaX, midY + deltaY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // ... [rest of the script remains unchanged]
    
    function drawHeatmap() {
        // ... [existing drawing code]
    
        // Add Voronoi diagram drawing
        drawVoronoi(points);
    }
    

    console.log("Heatmap script loaded and executed."); // Basic check to ensure the file is being executed
    resizeCanvas();
});
