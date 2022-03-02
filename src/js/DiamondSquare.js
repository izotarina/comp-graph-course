class DiamondSquare {  
    static n = 8;
    static roughness = 0.6;
    static points = [];

    static generateArray = (corner1, corner2, corner3, corner4) => {
        const pointsArray = [];
        const size = Math.pow(2, this.n) + 1;

        for (let i = 0; i < size; ++i) {
            pointsArray.push(new Array(size));
        }

        pointsArray[0][0] = corner1;
        pointsArray[size - 1][0] = corner2;
        pointsArray[size -1][size - 1] = corner3;
        pointsArray[0][size - 1] = corner4;

        return pointsArray;
    };
  
    static calculateZ = (points, n, pointDistance) => {
        points = points.filter((point) => point !== undefined);

        let z = 0;
        for (let i = 0; i < points.length; ++i) {
            z += points[i];
        }

        z = z / points.length;

        let randomAmount;
        randomAmount = Math.random() * pointDistance * this.roughness * .7;

        if (n === 1) {
            randomAmount *= .8;
        }

        if (Math.random() < 0.5) {
            z -= randomAmount;
        } else {
            z += randomAmount;
        }

        return z;
    };  
  
    static diamondSquare = () => {
        const corners = [0, 0, 0, 0];

        corners.forEach((_, i) => {
            const val = Math.random() * this.n * 2;

            if (Math.random() < 0.5) {
                corners[i] -= val;
            } else {
                corners[i] += val;
            }
        });
    
        let pointsArray = this.generateArray(...corners);
        let step = 1;
        let pointDistance = pointsArray.length - 1;
    
        while (step < (2 * this.n + 1)) {
            if (step % 2 !== 0) { 
                for (let i = 0; i < pointsArray.length;  i+= pointDistance) {
                    for (let j = 0; j < pointsArray[i].length; j += pointDistance) {
                        if (j + pointDistance >= pointsArray[i].length || i + pointDistance >= pointsArray.length) break;

                        const pointsToUse = [];
                        pointsToUse.push(pointsArray[i][j]); 
                        pointsToUse.push(pointsArray[i][j + pointDistance]);
                        pointsToUse.push(pointsArray[i + pointDistance][j]);
                        pointsToUse.push(pointsArray[i + pointDistance][j + pointDistance]); 
            
                        pointsArray[Math.round(i + pointDistance / 2)][Math.round(j + pointDistance / 2)] = this.calculateZ(pointsToUse, step, pointDistance);
                    }
                }
            } else { 
                for (let i = 0; i < pointsArray.length; i += pointDistance) {
                    for (let j = 0; j < pointsArray[i].length; j += pointDistance) {
                        const pointsToUse = [];

                        if (pointsArray[i][j] !== undefined) {
                            continue;
                        } else {
                            if (i - pointDistance >= 0) {
                                pointsToUse.push(pointsArray[i - pointDistance][j]);
                            }
                            if (j + pointDistance < pointsArray.length) {
                                pointsToUse.push(pointsArray[i][j + pointDistance]);
                            }
                            if (i + pointDistance < pointsArray.length) {
                                pointsToUse.push(pointsArray[i + pointDistance][j]);
                            }
                            if (j - pointDistance >= 0) {
                                pointsToUse.push(pointsArray[i][j - pointDistance]);
                            }

                            pointsArray[i][j] = this.calculateZ(pointsToUse, step, pointDistance);
                        }
                    }
                }
            }
            if (step % 2) {
                pointDistance /= 2;
            }
            if (pointDistance < 1) {
                pointDistance = 1;
            }
            ++step;
        }

        pointsArray = this.removeSpikes(pointsArray);

        let expandedArray = [];
        for (let i = 0; i < pointsArray.length; i++) {
            expandedArray.push(...pointsArray[i]);
        };
        
        this.points = expandedArray;
    };  

    static removeSpikes = (pointsArray) => {
        for (let i = 0; i < pointsArray.length; ++i) {
            for (let j = 0; j < pointsArray[i].length; ++j) {
                const adjacentHeights = this.getAdjacent(pointsArray, i, j);
                const averageSurroundingHeight = adjacentHeights.reduce((curr, total) => total += curr) / adjacentHeights.length;

                pointsArray[i][j] = averageSurroundingHeight;
            }
        }

        return pointsArray;
    };
  
    static getAdjacent = (array, pointI, pointJ) => {
        let adjacentPoints = [];

        for (let i = pointI - 1; i <= pointI + 1; ++i) {
            if (i < 0) continue;

            if (i > array.length - 1) break;

            for (let j = pointJ - 1; j <= pointJ + 1; ++j) {
                if (j < 0 ||
                    (i === pointI && j === pointJ) ||
                    j > array.length - 1) continue;
        
                adjacentPoints.push(array[i][j]);
            }
        }

        return adjacentPoints;
    }
}
