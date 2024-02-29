function renderLicenseBadge(license) {
  if (!license || license === 'None') {
    return '';
  }
  return `![License: ${license}](https://img.shields.io/badge/license-${encodeURIComponent(license.replace(/\s+/g, '_'))}-blue.svg)`;
}

function renderLicenseLink(license) {
  const licenseLinks = {
    'MIT': 'https://opensource.org/licenses/MIT',
    'Apache 2.0': 'https://opensource.org/licenses/Apache-2.0',
    'GPL v3': 'https://www.gnu.org/licenses/gpl-3.0',
    'BSD 3-Clause': 'https://opensource.org/licenses/BSD-3-Clause'
  };
  return licenseLinks[license] ? `(${licenseLinks[license]})` : '';
}

function renderLicenseSection(license) {
  if (!license || license === 'None') {
    return '';
  }
  return `## License\nThis project is licensed under the ${license} License. ${renderLicenseLink(license)}\n`;
}

function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseSection = renderLicenseSection(data.license);
  
  let toc = `## Table of Contents
- [Installation](#installation)
- [Usage](#usage)`;

  if (data.license !== 'None') toc += `\n- [License](#license)`;
  if (data.contributing) toc += `\n- [Contributing](#contributing)`;
  if (data.tests) toc += `\n- [Tests](#tests)`;

  let readmeContent = `# ${data.title}
${licenseBadge}

## Description
${data.description}

${toc}

## Installation
${data.installation}

## Usage
${data.usage}

${licenseSection}`;

  if (data.contributing) {
    readmeContent += `
## Contributing
${data.contributing}
`;
  }

  if (data.tests) {
    readmeContent += `
## Tests
${data.tests}
`;
  }

  return readmeContent;
}

module.exports = generateMarkdown;