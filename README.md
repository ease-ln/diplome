![GitHub issues](https://img.shields.io/github/issues/shaxri/NlpWithNeuralNetwork)
![Website](https://img.shields.io/website?up_color=red&up_message=Online&url=https%3A%2F%2Finnometrics.ru%2F%23innometrics-subscribe)
![GitHub forks](https://img.shields.io/github/forks/shaxri/NlpWithNeuralNetwork?style=social)

<p align="center">
<img width="233" height="58" src="https://github.com/InnopolisUniversity/innometrics-dashboard/blob/master/innometrics_logo.png">
</p>
<p align="center">
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img src="https://img.shields.io/badge/firebase%20-%23039BE5.svg?&style=for-the-badge&logo=firebase"/>
</p>


# Innometrics Frontend
Track, evaluate and analyze the software development process. This system provides a visualisation of users' working activity statistics. An intelligent, customizable dashboard to visualize and manipulate software engineering data based on requirements and preferences coming from the industry.
Stores information from:

- Desktop clients and browser extensions about users' activities (which programs, tabs and for how long user has used it)
- Remote repositories about developers' source code quality metrics


## Dashboard
Gaining insights from the development process has never been easier. [Dashboard](https://link.springer.com/chapter/10.1007/978-3-030-47240-5_16)’s primary purpose is to share important information in terms of different metrics to the end user.

## Features

- Charts
<p align="center">
<img width="700" height="400" src="https://github.com/InnopolisUniversity/innometrics-dashboard/blob/master/Innometrics_charts.png">
</p>

- Top applications per person daily
- Accumulated activities
- Accumulated total time spent
- Category of activities
  - Development
  - Education
  - Communication
  - Utilities
  - Management
  - Entertainment

## Links

* [Dashboard](https://innometrics-12856.firebaseapp.com/#/login)
* [Backend source code](https://github.com/InnopolisUniversity/innometrics-backend)
* [API](https://github.com/InnopolisUniversity/innometrics-backend/blob/master/documentation.yaml)
  (Access readable format by pasting `documentation.yaml` data to https://editor.swagger.io)
* [Here](https://drive.google.com/file/d/1ghOf4uXLN9Nl4MYenroQuLhQ3GPfZMZW/view?usp=sharing) you can read about PRIVACY NOTICE of Innometrics system.
*  [Website](http://51.250.3.9:3000/dashboard)
<p align="center">
<img width="800" height="500" src="https://github.com/InnopolisUniversity/innometrics-dashboard/blob/master/Innometrics_website.png" alt="Innometrics website"></a>
<p>

## Monitoring
* [SonarCloud](https://sonarcloud.io/project/overview?id=ease-ln_diplome)
* [Yandex.Metrika](https://metrika.yandex.ru/dashboard?id=93655705)
* [Uptimia](https://www.uptimia.com/cp)
* [Lighthouse]() 
     * On every push to the main branch LightHouse CI pipline created, on the last step the link like 'Open the report at ...' exist

## Installation
1. `yarn`
2. `yarn start` to boot up a development server
3. Visit the link found in your terminal after running `yarn start`.

## Automated Deploy
### Virtual Machine recommendations
* Platform% Intel Ice Lake
* vCPU 2
* RAM 2 GB
*  Disk space 10 GB

### The process
Here are the steps to deploy those applications on your machine with proper automated deployment

* Install [Dokku](https://dokku.com/docs/getting-started/installation/) on your server machine
* Add the DockerHub credentials to the GitHub secrets
* Create applications and git repos on Dokku:
    ```
    sudo dokku apps:create <appname>
    sudo dokku git:initialize  <appname>
* Change appname in github workflow to the one of your choice.
* Add private ssh key of your machine to github actions secrets using key SSH_PRIVATE_KEY
* Change dokku server ip in repository workflow
* Change docker registry in repository workflow
* Then merge/push to main branch
* Profit.


## Have Question or Feedback?
Contact us via email info@innometric.guru

## Acknowledgement
[aldeeyar](https://github.com/aldeeyar/innometrics-info/blob/main/instructions.md) thanks for Automated Deploy documentation

