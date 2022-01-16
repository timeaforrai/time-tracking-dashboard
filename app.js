const daily = document.querySelector('#daily')
const weekly = document.querySelector('#weekly')
const monthly = document.querySelector('#monthly')
let container = document.getElementById('cards-container')

daily.addEventListener('click', () => updateDashboard('daily'))
weekly.addEventListener('click', () => updateDashboard('weekly'))
monthly.addEventListener('click', () => updateDashboard('monthly'))

async function updateDashboard(time) {
  try {
    const data = await fetch('./data.json')
    const records = await data.json()
    changeStats(records, time)
  } catch (error) {
    console.error(error)
  }
}

function changeStats(records, time) {
  container.innerHTML = ''

  records.map((rec) => {
    let current = 0
    let previous = 0
    if (time === 'daily') {
      current = rec.timeframes.daily.current
      previous = rec.timeframes.daily.previous
    } else if (time === 'weekly') {
      current = rec.timeframes.weekly.current
      previous = rec.timeframes.weekly.previous
    } else if (time === 'monthly') {
      current = rec.timeframes.monthly.current
      previous = rec.timeframes.monthly.previous
    }

    container.innerHTML += `
    <article class="${rec.title.toLowerCase().replace(' ', '-')}-card">
          <img src="images/icon-${rec.title.toLowerCase().replace(' ', '-')}.svg" alt="${rec.title.toLowerCase().replace(' ', '-')}-icon" />
          <div class="cards">
            <div class="cards-header">
              <h2>${rec.title}</h2>
              <div>
                <img src="/images/icon-ellipsis.svg" alt="3dot" />
              </div>
            </div>
            <div class="hrs">
              <h3>${current}${current < 2 ? 'hr' : 'hrs'}</h3>
              <p>${time === 'daily' ? 'Yesterday' : time === 'weekly' ? 'Last Week' : 'Last Month'} - ${previous}${previous < 2 ? 'hr' : 'hrs'}</p>
            </div>
          </div>
        </article>`
  })
}

updateDashboard('weekly')
