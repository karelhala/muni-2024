const data = require('./brno_firmy.json');
const fs = require('node:fs');

const startDate = new Date((new Date()).getFullYear(), 8, 1);
const endDate = new Date((new Date()).getFullYear() + 1, 5, 1);

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const internshipType = ['high_school', 'university']
const int = [true, false];

const a = data.map((item) => {
  
  const employees = item.employees.split('-');
  const turnover = item.turnover_i.replace('mil.', '').replace('avíce', '').split('-');
  const employeesMin = employees[0] ? employees[0].trim() : null
  let openPositons = 0;
  let internship = false;
  if (employeesMin) {
    if (employeesMin > 250) {
      internship =  int[Math.floor(Math.random()*int.length)];
    }
    openPositons = Math.round(Math.random() * (Math.floor(employeesMin / 250) * 10))
  }

  return {
    ...item,
    employees_min: employees[0] ? employees[0].trim() : null,
    employees_max: employees[1] ? employees[1].trim() : null,
    turnover_min: turnover[0] ? turnover[0].trim() : null,
    turnover_max: turnover[1] ? turnover[1].trim() : null,
    internship: internship,
    internship_date: internship ? randomDate(startDate, endDate).getTime() : null,
    internship_type: internship ? internshipType[Math.floor(Math.random()*internshipType.length)] : null,
    open_positions: openPositons,
    rank: Math.round(Math.random()*5),
  }
})

fs.writeFile(`${__dirname}/brno_updated_firmy.json`, JSON.stringify(a, null, 2), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
