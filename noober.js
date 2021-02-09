function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]


    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

function clearButtons(){ //Removes background colors from buttons
  let allRidesButton = document.querySelector('#all-filter')
  let poolButton = document.querySelector('#noober-pool-filter')
  let purpleButton = document.querySelector('#noober-purple-filter')
  let xButton = document.querySelector('#noober-x-filter')
  let xLButton = document.querySelector('#noober-xl-filter')

  allRidesButton.classList.remove('bg-gray-300')
  poolButton.classList.remove('bg-gray-300')
  purpleButton.classList.remove('bg-gray-300')
  xButton.classList.remove('bg-gray-300')
  xLButton.classList.remove('bg-gray-300')
}

window.addEventListener('DOMContentLoaded', async function() {
  let allRidesButton = document.querySelector('#all-filter')
  let poolButton = document.querySelector('#noober-pool-filter')
  let purpleButton = document.querySelector('#noober-purple-filter')
  let xButton = document.querySelector('#noober-x-filter')
  let xLButton = document.querySelector('#noober-xl-filter')

  let url = 'https://kiei451.com/api/rides.json' //Pulling data outside of button functions because inefficient to pull each time a button is clicked
  let response = await fetch(url)
  let json = await response.json()
  let res = []

  allRidesButton.addEventListener('click', async function(event){
    event.preventDefault()
    console.log("All Rides Selected")
    document.querySelector('.rides').innerHTML = "";
    clearButtons()
    allRidesButton.classList.add('bg-gray-300')

    renderRides(json)
  })

  poolButton.addEventListener('click', async function(event){
    event.preventDefault()
    console.log("Pool Rides Selected")
    document.querySelector('.rides').innerHTML = "";
    clearButtons()
    poolButton.classList.add('bg-gray-300')

    for(let i = 0; i < json.length; i++){
      if(levelOfService(json[i]) == 'Noober Pool'){
        res.push(json[i])
      }
    }
    renderRides(res)
    res = []
  })

  purpleButton.addEventListener('click', async function(event){
    event.preventDefault()
    console.log("Purple Rides Selected")
    document.querySelector('.rides').innerHTML = "";
    clearButtons()
    purpleButton.classList.add('bg-gray-300')

    for(let i = 0; i < json.length; i++){
      if(levelOfService(json[i]) == 'Noober Purple'){
        res.push(json[i])
      }
    }
    renderRides(res)
    res = []
  })

  xButton.addEventListener('click', async function(event){
    event.preventDefault()
    console.log("Noober X Rides Selected")
    document.querySelector('.rides').innerHTML = "";
    clearButtons()
    xButton.classList.add('bg-gray-300')

    for(let i = 0; i < json.length; i++){
      if(levelOfService(json[i]) == 'Noober X'){
        res.push(json[i])
      }
    }
    renderRides(res)
    res = []
  })

  xLButton.addEventListener('click', async function(event){
    event.preventDefault()
    console.log("Noober XL Rides Selected")
    document.querySelector('.rides').innerHTML = "";
    clearButtons()
    xLButton.classList.add('bg-gray-300')

    for(let i = 0; i < json.length; i++){
      if(levelOfService(json[i]) == 'Noober XL'){
        res.push(json[i])
      }
    }
    renderRides(res)
    res = []
  })

})

