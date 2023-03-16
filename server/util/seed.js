// Model.bulkCreate() receives an array of objects. I will create a variable with an array of objects (as countries) and use them to seed my country table in db.

const {Country} = require('./models')

    const countryList = [

    {
        countryName: 'Armenia'
    },
    {
        countryName: 'Albania'
    },
    {
        countryName: 'Andorra'
    },
    {
        countryName: 'Austria'
    },
    {
        countryName: 'Belarus'
    },
    {
        countryName: 'Belgium'
    },
    {
        countryName: 'Bosnia and Herzegovina'
    },
    {
        countryName: 'Bulgaria'
    },
    {
        countryName: 'Croatia'
    },
    {
        countryName: 'Cyprus'
    },
    {
        countryName: 'Czech Republic'
    },
    {
        countryName: 'Denmark'
    },
    {
        countryName: 'Estonia'
    },
    {
        countryName: 'Finland'
    },
    {
        countryName: 'France'
    },
    {
        countryName: 'Germany'
    },
    {
        countryName: 'Georgia'
    },
    {
        countryName: 'Greece'
    },
    {
        countryName: 'Hungary'
    },
    {
        countryName: 'Iceland'
    },
    {
        countryName: 'Ireland'
    },
    {
        countryName: 'Italy'
    },
    {
        countryName: 'Kosovo'
    },
    {
        countryName: 'Latvia'
    },
    {
        countryName: 'Liechtenstein'
    },
    {
        countryName: 'Lithuania'
    },
    {
        countryName: 'Luxembourg'
    },
    {
        countryName: 'Malta'
    },
    {
        countryName: 'Moldova'
    },
    {
        countryName: 'Monaco'
    },
    {
        countryName: 'Montenegro'
    },
    {
        countryName: 'Netherlands'
    },
    {
        countryName: 'North Macedonia'
    },
    {
        countryName: 'Norway'
    },
    {
        countryName: 'Poland'
    },
    {
        countryName: 'Portugal'
    },
    {
        countryName: 'Romania'
    },
    {
        countryName: 'Russia'
    },
    {
        countryName: 'San Marino'
    },
    {
        countryName: 'Serbia'
    },
    {
        countryName: 'Slovakia'
    },
    {
        countryName: 'Slovenia'
    },
    {
        countryName: 'Spain'
    },
    {
        countryName: 'Sweden'
    },
    {
        countryName: 'Switzerland'
    },
    {
        countryName: 'Turkey'
    },
    {
        countryName: 'Ukraine'
    },
    {
        countryName: 'United Kingdom'
    },
    {
        countryName: 'Vatican City'
    }
]


const seedCountries = async () => {
    await Country.bulkCreate(countryList)
}

module.exports = {seedCountries}