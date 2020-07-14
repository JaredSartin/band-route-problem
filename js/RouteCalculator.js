/*-------------------------------------------------------------------------------------------------
Routing Algorithm
-------------------------------------------------------------------------------------------------*/
/**
* Class RouteCalculator()
*
* Contains methods that create new arrays without mutating the
* existing one, sorts it, and converts a string value into the
* desired array if needed.
* 
*/
class RouteCalculator {

  constructor() {
    this.homePoint  = []
    let  newArray   = []
    /**
    * Method makeNewArray(pointsArray)
    * 
    * @param pointsArray | The desired array we want to loop through
    *
    * Creates a new array that makes a copy of the pointArray with an added distance key.
    * Loops through each point in the desired array and finds the distance between the
    * homePoint and the point's x and y coordinates (in km).
    */
    this.makeNewArray = (pointsArray) => {
      this.homePoint = pointsArray[0]
      newArray       = []
  
      /**
       * For each point in the array, except the first point (home point), find the
       * difference between the x and y coordinates. Square and add those value together
       * for the distance and add that to the new array using the spread operator. Uses
       * the Haversine formula to find the shortest distance over the earth's surface in km.
       * The Haversine formula is similar to Pythagoras' Theorem but it takes the earth's
       * surface into account.
       */
      pointsArray.slice(1).forEach((point) => {
        // /**
        //  * HOMEMADE FORMULA
        //  * 
        //  * Finds the difference between the home point and the array point
        //  * and then squares and adds those values together (pythagoras).
        //  * Adds a key / pair "distance" with to the newArray.
        //  */ 
        // let   xDifference = this.homePoint.x - point.x
        // let   yDifference = this.homePoint.y - point.y
        // const newPointObj = { 
        //   ...point, 
        //   distance: Math.sqrt((xDifference * xDifference) + (yDifference * yDifference)).toFixed(2)
        // }

        const earthRadius = 6371 // earth's radius in km 
        const latitude    = degreeToRadian(point.x - this.homePoint.x)
        const longitude   = degreeToRadian(point.y - this.homePoint.y)
        const plotted     =
          Math.sin(latitude / 2) * Math.sin(latitude / 2) +
          Math.cos(degreeToRadian(this.homePoint.x)) * Math.cos(degreeToRadian(point.x)) *
          Math.sin(longitude / 2) * Math.sin(longitude / 2)
        const angle       = 2 * Math.atan2(Math.sqrt(plotted), Math.sqrt(1 - plotted))
        const distance    = earthRadius * angle
        const newPointObj = { 
          ...point, 
          distance: distance.toFixed(2)
        }

        newArray.push(newPointObj)
      })

      /**
       * function degreeToRadian ()
       * 
       * @param deg | the degree to be converted
       * 
       *  Convert the degree of the destination point to radians.
       */
      function degreeToRadian(deg) {
        return deg * (Math.PI/180)
      }
  
      //log for testing
      console.log(`new array`, newArray)
      console.log(this.getSortedArray())
      return newArray
    }
  
    /**
    * Method getSortedArray()
    * 
    * Returns the array sorted by min -> max distance. Uses a nifty sort functionality
    * that find the min value, sorts it, and checks if each value was sorted before continuing.
    */
    this.getSortedArray = () => {
      return [...newArray].sort((a, b) => { return a.distance - b.distance })
    }
    /**
    * Method insertData()
    * 
    * Gets the current sorted array within out routeCalculator object
    * and inserts that data into the DOM.
    */
    this.insertData = () => {
      const dataTarget   = document.querySelector('#app_data')
      const homeTarget   = document.querySelector('#home_distance')
      const newPoints    = this.getSortedArray()
      const elementArray = []

      // for each new point, add that point's data to elementArray
      newPoints.forEach((point, i) => {
        elementArray.push(
          `<div class="wrapper">
            <p>${point.distance}</p>
            <p>${point.y}</p>
            <p>${point.x}</p>
            <p>${i + 1}</p>
          </div>
          `
        )
      })

      // set the origin point's lat and lng in the DOM
      homeTarget.innerHTML = `<br>(lat: ${this.homePoint.y}, lng: ${this.homePoint.x})`

      // add elementArray as inner html into the DOM
      dataTarget.innerHTML = elementArray.join('')
    }
  }
}
