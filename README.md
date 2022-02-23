# Chess1

Welcome to my chess project. I created this for fun because my friend was promising an Angular job at the time. Now I am using this to deploy to aws.

## Command to install on Amazon Linux
ssh-keygen -t rsa
(then assign ssh key to the github)

git clone git@github.com:jamesEmerson112/Angular-Chess-with-ChessJS-API.git

amazon-linux-extras install epel

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

npm install

npm run ng serve

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Resources
- For deploying via AWS Codepine, follow https://tusharghosh09006.medium.com/continuously-deploy-angular-app-to-amazon-ec2-using-aws-codepipeline-f29ed1e3ce06
- For deploying only with nginx https://medium.com/thecodr/deploying-an-angular-app-onto-an-ec2-instance-using-github-262c89dbde68

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Todo List
1. get the other client to render the game
2. Game turn

## Notes
https://www.chessboardjs.com/examples#1000

got codeFEN sent.

working on reading codeFEN

https://stackoverflow.com/questions/18722201/two-player-turn-based-game
Infor about turn-based games

chat features:
1. More features for chat (creating room)
https://stackoverflow.com/questions/32657379/how-i-can-get-a-socket-username-socket-io

1. https://www.tutorialspoint.com/socket.io/socket.io_chat_application.htm
this is for creating username

1. https://medium.com/@deguzmanbrianfrancis/setting-up-and-creating-a-chat-app-with-angular-socket-io-3-0-and-express-70c69b8031f6
this one has Observant
2. https://codingblast.com/chat-application-angular-socket-io/
simple example of socketio

install @type/node
https://github.com/jhlywa/chess.js/issues/208
=> Fixing Chess()
https://docs.w3cub.com/webpack/loaders/imports-loader to disable AMD webpack config

manually add the style of chessboardjs
manually add the scripts of chessboardjs and jquery