const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

const DataService = {
    employees: [],
    departments: [],

    read: path => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    },

    initialize: async() => {
        return new Promise(async(resolve, reject) => {
            try {
                const employees = await DataService.read(path.join(__dirname, 'data', 'employees.json'))
                const departments = await DataService.read(path.join(__dirname, 'data', 'departments.json'))
                DataService.employees = JSON.parse(employees)
                DataService.departments = JSON.parse(departments)
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    },

    getAllEmployees: () => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {
            if (DataService.employees.length === 0) reject('No results returned')
            return resolve(DataService.employees)
        })
    },
    getEmployeesByStatus: (status) => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {

            employeesByStatus = [];
            for (let index = 0; index < DataService.employees.length; index++) {
                if (DataService.employees[index].status == status) {
                    employeesByStatus.push(DataService.employees[index]);
                }
            }
            if (employeesByStatus.length === 0) reject('No results returned')
            return resolve(employeesByStatus)
        })
    },
    getEmployeesByDepartment: (department) => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {

            employeesByDepartment = [];
            for (let index = 0; index < DataService.employees.length; index++) {
                if (DataService.employees[index].department == department) {
                    employeesByDepartment.push(DataService.employees[index]);
                }
            }
            if (employeesByDepartment.length === 0) reject('No results returned')
            return resolve(employeesByDepartment)
        })
    },

    getEmployeesByManager: (manager) => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {

            employeesByManager = [];
            for (let index = 0; index < DataService.employees.length; index++) {
                if (DataService.employees[index].employeeManagerNum == manager) {
                    employeesByManager.push(DataService.employees[index]);
                }
            }
            if (employeesByManager.length === 0) reject('No results returned')
            return resolve(employeesByManager)
        })
    },

    getEmployeeByNum: (num) => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {
            employeesByNum = [];
            for (let index = 0; index < DataService.employees.length; index++) {
                if (DataService.employees[index].employeeNum == num) {
                    employeesByNum.push(DataService.employees[index]);
                }
            }
            if (employeesByNum.length === 0) reject('No results returned')
            return resolve(employeesByNum)
        })
    },
    addEmployee: (employeeData) => {
        console.log(employeeData)
        employeeData.isManager = false;
        employeeData.employeeNum = DataService.employees.length + 1;
        DataService.employees.push(employeeData)
            //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {
            if (DataService.employees.length === 0) reject('No results returned')
            return resolve(DataService.employees)
        })
    },

    getManagers: () => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {
            const managers = DataService.employees.filter(e => e.isManager)
            if (managers.length === 0) reject('No results returned')
            return resolve(managers)
        })
    },

    getDepartments: () => {
        //after initialized, no need to handle promise here but add handle Promise as the requirement
        return new Promise((resolve, reject) => {
            if (DataService.departments.length === 0) reject('No results returned')
            return resolve(DataService.departments)
        })
    },

    updateEmployee: (employeeData) =>{
        

       const emp= DataService.employees.find( p => Number(p.employeeNum) == Number(employeeData.employeeNum) && ( Object.assign(p,employeeData) ) );
        //console.log("Updated",DataService.employees.find(p => Number(p.employeeNum) == Number(employeeData.employeeNum) ));
        return new Promise((resolve,reject)=>{
            resolve("Updated");
        })
        

    }

}


module.exports = DataService