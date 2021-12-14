/**
 * Divides the canvas in rows and columns
 * @param rows number of rows in grid
 * @param cols number of columns in grid
 * @returns array of each quadrant center point coordinates
 */
 function get2DGridCenterPoints(rows: number, cols: number): void {
  evenLines = [];
  oddLines = [];
  gridXCenterCoords = [];
  
  let shapeCenterX = 0;
  let gridUnitWidth = width / rows;

  let shapeCenterY = 0;
  let gridUnitHeight = height / cols;

  const coordArray = [];

  for (let i = 1; i <= rows; i++) {
    shapeCenterX = Math.round(gridUnitWidth * i - gridUnitWidth / 2);
    gridXCenterCoords.push(shapeCenterX);
    for (let j = 1; j <= cols; j++) {
      shapeCenterY = Math.round(gridUnitHeight * j - gridUnitHeight / 2);
      coordArray.push([shapeCenterX, shapeCenterY]);
    }
  }

  coordArray.forEach((centerPoint) => {
    gridXCenterCoords.indexOf(centerPoint[0]) % 2 === 0 ?
      evenLines.push(createVector(centerPoint[0], centerPoint[1])) :
      oddLines.push(createVector(centerPoint[0], centerPoint[1]))
  })

}