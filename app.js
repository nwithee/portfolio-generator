const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your name (Required)?",
            validate: nameInput => {
                if (nameInput){
                    return true;
                }
                else {
                    console.log('Please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: nameInput => {
                if (nameInput){
                    return true;
                }
                else {
                    console.log('Please enter your name');
                    return false;
                }
            }        
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: "Would you like to enter some information about yourself blah blah blah",
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some informatin about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = porfolioData => {
    console.log(`
================
Add a New Project 
================   
`);

    if (!porfolioData.projects){
        porfolioData.projects =[];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput){
                    return true;
                }
                else {
                    console.log('Please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput){
                    return true;
                }
                else {
                    console.log('Please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Boostrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput){
                    return true;
                }
                else {
                    console.log('Please enter your name');
                    return false;
                }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
    ])

    .then(projectData => {
        porfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){
            return promptProject(porfolioData);
        }
        else {
            return porfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log('Page created! Check out index.html in this directory to see it!');
        });
        
    });


//const pageHTML = generatePage(name, github);

//fs.writeFile('./index.html', pageHTML, err =>{
    //if (err) throw err;

    //console.log('Porfolio complete!  Check out hte index.html to see the output!');
//});