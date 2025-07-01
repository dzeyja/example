const div = document.createElement('div')

div.classList.add('wrapper')

const body = document.body
body.appendChild(div)

const header = document.createElement('h1')
header.textContent = 'DOM (Document Object Module)'


div.insertAdjacentElement('beforebegin', header)

const ul = `
    <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
    </ul>
`

div.innerHTML = ul



const generateAutoCard = (brand, color, year) => {
    const curDate = new Date
    const curYear = curDate.getFullYear()
    
    return `
        <div class="autoCard">
            <h2>${brand.toUpperCase()} ${year}</h2>
            <p>Автомобиль ${brand.toUpperCase()} - ${year} года. Возраст авто - ${curYear - year} лет.</p>
            <p>Цвет: ${color}</p>
            <button type='button' class='btn'>Удалить</button>
        </div>
    `
}

const carsDiv = document.createElement('div')
carsDiv.classList.add('autos')

const cardList = [
    {brand: 'Tesla', year: 2015, color: 'red'},
    {brand: 'Lexus', year: 2016, color: 'silver'},
    {brand: 'Nissan', year: 2012, color: 'black'},
]

const carsHTML = cardList.map(car => {
    return generateAutoCard(car.brand, car.color, car.year)
}).join('')

carsDiv.innerHTML = carsHTML

div.insertAdjacentElement('beforebegin', carsDiv)

const buttons = document.querySelectorAll('.btn')

function handleClick(e) {
    const currentButton = e.currentTarget
    currentButton.closest('.autoCard').remove()
}

buttons.forEach(button => {
    button.addEventListener('click', handleClick)
})

