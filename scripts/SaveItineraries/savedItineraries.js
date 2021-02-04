import { getItineraries, saveItineraries, useItineraries } from "./SaveDataProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".savedItinerary")

let savedItinerary = {
  "savedPark": "",
  "savedEatery": "",
  "savedAttraction": ""
}

eventHub.addEventListener("attractionSelected", e => {
  savedItinerary.savedAttraction = e.detail.chosenAttraction
})

eventHub.addEventListener("eaterySelect", e => {
  savedItinerary.savedEatery = e.detail.eatery
})

eventHub.addEventListener("parkChosen", e => {
  savedItinerary.savedPark = e.detail.parkName
})

eventHub.addEventListener("saveButtonClick", e => {
  saveItineraries(savedItinerary)
    .then(getItineraries)
    .then(displayItineraries)
})

export const displayItineraries = () => {
  getItineraries()
    .then(() => {
      const itineraryList = useItineraries()

      contentTarget.innerHTML = `
        <div class="itineraryCard">
          ${itineraryList.map(itinerary => {
            return `
            Park: ${itinerary.savedPark}<br>
            Attraction: ${itinerary.savedAttraction}<br>
            Eatery: ${itinerary.savedEatery}<br>
            `
          }).join("")}
        </div>
      `
    })
}
