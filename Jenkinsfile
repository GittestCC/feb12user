pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        parallel(
          "Build": {
            withCredentials([string(credentialsId: 'docker_registry', variable: 'SECRET')]) {
            sh '''#!/bin/bash -xe
echo "doing the build..."
echo "REACT_APP_SERVER_URL=http://api.dev.kintocloud.com" >> .env
echo "REACT_APP_SHOW_DEV_UI=true" >> .env
docker login kintocloud.azurecr.io --username kintocloud --password ${SECRET}
docker build -t kintocloud.azurecr.io/frontend:dev-${BUILD_NUMBER} .
GIT_TAG=`git describe --tags ${GIT_COMMIT}`
if (( ${#GIT_TAG} > 8 ));
  then
  echo "false" > deploy
else
  echo "Do the deployment"
  echo "true" > deploy
fi'''
            }
            script {
              ENV_PUSH = readFile('deploy').trim()
            }
          },
          "Slack build started": {
            slackSend(color: '#D3D3D3', message: "Started: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]  from branch ${env.GIT_BRANCH} ")

          }
        )
      }
    }
    stage('Push') {
      when {
          anyOf {
            branch 'dev'
            branch 'master'
          }
      }
      steps {
        sh """#!/bin/bash -xe
if [ "$ENV_PUSH" == "true" ];
then
  docker push kintocloud.azurecr.io/frontend:dev-${BUILD_NUMBER}
fi"""
      }
    }
    stage('Helm') {
      when {
          anyOf {
            branch 'dev'
            branch 'master'
          }
      }
      steps {
        withCredentials([string(credentialsId: 'githubpass', variable: 'GIT_PASS')]) {
        sh """#!/bin/bash -xe
if [ "$ENV_PUSH" == "true" ];
then
  git clone https://sanguinius69:${GIT_PASS}@github.com/kintohub/KintoInfra.git
  cd KintoInfra
  git checkout dev
  helm list
  cd helm
  helm lint frontend
  helm upgrade --set kintoblock.image.tag=dev-${BUILD_NUMBER} frontendv1 frontend
fi"""
        }
      }
    }
  }
  post {
    success {
      slackSend(color: '#008000', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
  environment {
    JENKINS_URL = '13.76.86.184:8080'
    JENKINS_SLAVE_SERVICE_HOST = '10.0.13.149'
    JENKINS_SLAVE_SERVICE_PORT = '50000'
    ENV_PUSH = 'false'
  }
}
