function calculateTeamFinanceReport(salaries, team) {
  // parse tax value (a simple parseInt will be sufficient for our usecase👌)
  const parseTax = (tax) => parseInt(tax);

  // calculate salary with tax for the single record helper function
  const getSalaryWithTax = (salary, tax) => {
    const result = salary / ((100 - parseTax(tax)) * 0.01);
    return result;
  };

  // truncate all properties in passing object helper function
  const truncAllProps = (obj) => {
    // to truncate we will use Math.trunc, we also might've
    // been used Math.round if needed
    const result = obj;
    for (const prop in result) {
      result[`${prop}`] = Math.trunc(result[`${prop}`]);
    }
    return result;
  };

  // assign all specialisations to separate variable
  const specializationList = Object.keys(salaries);

  /////// .reduce() implementation
  // team report accumulator variable initialisation
  const initialReport = {
    totalBudgetTeam: 0,
  };

  // calculate final report
  const result = team.reduce((prev, person) => {
    // assign previous accumulator state to new variable so we'll be able to modify it
    const acc = prev;

    // assign specialization of the current person to separate variable for convenience
    const currentSpecialization = person.specialization;

    // make sure that current specialization exists in salaries data
    if (specializationList.includes(currentSpecialization)) {
      // calculate budget of the current person
      const currentBudget = getSalaryWithTax(
        salaries[currentSpecialization].salary,
        salaries[currentSpecialization].tax
      );

      // add it to total budget
      acc["totalBudgetTeam"] += currentBudget;

      // if there is no specialization in report yet, initialize w/ 0
      if (!acc[`totalBudget${person.specialization}`]) {
        acc[`totalBudget${person.specialization}`] = 0;
      }

      // add currentBudget to corresponding category total
      acc[`totalBudget${person.specialization}`] += currentBudget;
    }

    return acc;
  }, initialReport);

  /////// for..of loop implementation
  // // team report accumulator variable initialisation
  // let result = {
  //   totalBudgetTeam: 0,
  // };

  // for (const person of team) {
  //     // assign specialization of the current person to separate variable for convenience
  //     const currentSpecialization = person.specialization;
  //     // make sure that current specialization exists in salaries data
  //     if (specializationList.includes(currentSpecialization)) {
  //   // calculate budget of the current person
  //   const currentBudget = getSalaryWithTax(
  //       salaries[currentSpecialization].salary,
  //       salaries[currentSpecialization].tax
  //       );
  //       // add it to total budget
  //       result["totalBudgetTeam"] += currentBudget;
  //       // if there is no specialization in report yet, initialize w/ 0
  //       if (!result[`totalBudget${person.specialization}`]) {
  //           result[`totalBudget${person.specialization}`] = 0;
  //         }
  //         // add currentBudget to corresponding category total
  //         result[`totalBudget${person.specialization}`] += currentBudget;
  //     }
  // }

  return truncAllProps(result);
}

module.exports = calculateTeamFinanceReport;
