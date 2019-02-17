function main() {
    const departments = getDepartments();
    const employees = getEmployees();


    const employeeReportRecords = employees.map(emp => {
        const splitName = emp.name.split(' ');
        const department = departments.find(dept => dept.id === emp.departmentId);

        return {
            firstName: splitName[0],
            lastName: splitName[1],
            salary: toCurrencyString(emp.salary),
            departmentName: department.name
        }
    });
    const employeeReport = buildEmployeeReport(employeeReportRecords);


    const departmentReportRecords = departments.map(dept => {
        const deptEmployees = employees.filter(emp => emp.departmentId === dept.id);

        let totalSalary = 0;
        deptEmployees.forEach(emp => {
            totalSalary += emp.salary;
        });

        return {
            name: dept.name,
            totalSalary: toCurrencyString(totalSalary)
        };
    });
    const departmentReport = buildDepartmentReport(departmentReportRecords);


    document
        .getElementById('output')
        .appendChild(employeeReport)
        .appendChild(departmentReport);
}


function getDepartments() {
    return [ 
        { id: 1, name: "Executive" },
        { id: 2, name: 'IT' }, 
        { id: 3, name: 'HR' }
    ];
}


function getEmployees() {
    return[ 
        { id: 1, name: 'Alice Rogers',   salary: 2400000, departmentId: 1 }, 
        { id: 2, name: 'Juan Rodriguez', salary: 1500000, departmentId: 1 }, 
        { id: 3, name: 'Alef Bogale',    salary: 65000,   departmentId: 2 }, 
        { id: 4, name: 'Jane Fox',       salary: 100000,  departmentId: 2 }, 
        { id: 5, name: 'Marie Curie',    salary: 40000,   departmentId: 3 }, 
        { id: 6, name: 'Wendy Day',      salary: 45000,   departmentId: 3 }
     ];
}


function toCurrencyString(number) {
    let numberString = number.toString();
    for(let i=numberString.length-3; i>0; i=i-3) {
       numberString = numberString.substr(0, i) + ',' + numberString.substr(i);
    }
    return '$' + numberString;
}


function buildEmployeeReport(employeeReportRecords) {
    const report = makeElement('article');

    const heading = makeElement('h1', 'Employee Report');
    report.appendChild(heading);

    const reportTable = makeElement('table');
    reportTable.setAttribute('border', '2');
    report.appendChild(reportTable);

    const reportTableHead = makeElement('thead');
    reportTable.appendChild(reportTableHead);

    const headRow = makeElement('tr');
    reportTableHead.appendChild(headRow);

    ['First Name', 'Last Name', 'Department'].forEach(columnName => {
        headRow.appendChild(makeElement('th', columnName));
    })

    const reportTableBody = makeElement('tbody');
    reportTable.appendChild(reportTableBody);

    employeeReportRecords.forEach(rec => {
        const row = makeElement('tr');

        row.appendChild(makeElement('td', rec.firstName));
        row.appendChild(makeElement('td', rec.lastName));
        row.appendChild(makeElement('td', rec.salary));
        row.appendChild(makeElement('td', rec.departmentName));

        reportTableBody.appendChild(row);
    })
    
    return report;
}


function buildDepartmentReport(employeeReportRecords) {
    const report = makeElement('article');

    const heading = makeElement('h1', 'Department Report');
    report.appendChild(heading);

    const reportTable = makeElement('table');
    reportTable.setAttribute('border', '2');
    report.appendChild(reportTable);

    const reportTableHead = makeElement('thead');
    reportTable.appendChild(reportTableHead);

    const headRow = makeElement('tr');
    reportTableHead.appendChild(headRow);

    ['Name', 'Total Salary'].forEach(columnName => {
        headRow.appendChild(makeElement('th', columnName));
    })

    const reportTableBody = makeElement('tbody');
    reportTable.appendChild(reportTableBody);

    employeeReportRecords.forEach(rec => {
        const row = makeElement('tr');

        row.appendChild(makeElement('td', rec.name));
        row.appendChild(makeElement('td', rec.totalSalary));

        reportTableBody.appendChild(row);
    })

    return report;
}


function makeElement(tagName, textContent) {
    const element = document.createElement(tagName);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

main();