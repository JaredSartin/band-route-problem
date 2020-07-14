/**
 * IIFE Function initPage()
 * 
 * Initializes the default data on the page.
 */
(function initPage() { 
  const initialTab      = document.querySelector('#initial_tab')
  const routeCalculator = new RouteCalculator()
  const setEvents       = new SetEvents()

  // set the tab events
  setEvents.setEvents()

  // initialize our page with data
  routeCalculator.insertData()

  // set the initial tab styles
  initialTab.click()
})()