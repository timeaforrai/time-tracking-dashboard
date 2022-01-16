const daily = document.querySelector('#daily')
const weekly = document.querySelector('#weekly')
const monthly = document.querySelector('#monthly')

daily.addEventListener('click', () => updateDashboard('daily'))
weekly.addEventListener('click', () => updateDashboard('weekly'))
monthly.addEventListener('click', () => updateDashboard('monthly'))

async function updateDashboard(date) {
  try {
    const data = await fetch('./data.json')
    const records = await data.json()

    console.log(records)
  } catch (error) {
    console.error(error)
  }
}
