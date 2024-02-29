const fs = require('fs').promises; 
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for use:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to your project?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What license did you use for this project?',
    choices: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide any tests written for your application and examples on how to run them:',
  },
];

async function writeToFile(fileName, data) {
  try {
    await fs.writeFile(fileName, data);
    console.log(`Successfully wrote to ${fileName}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

async function init() {
  try {
    const answers = await inquirer.prompt(questions);
    const readmeContent = generateMarkdown(answers);
    await writeToFile('README.md', readmeContent);
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

init();