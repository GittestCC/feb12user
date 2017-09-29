pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        parallel(
          "Build": {
            withCredentials([string(credentialsId: 'docker_registry', variable: 'SECRET')]) {
            sh '''echo "doing the build..."
docker login kintocloud.azurecr.io --username kintocloud --password ${SECRET}            
docker build -t kintocloud.azurecr.io/frontend:${BUILD_NUMBER} .
git tag --contains $GIT_COMMIT
'''
            }
            
          },
          "Slack build started": {
            slackSend(color: '#D3D3D3', message: "Started: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]  from branch ${env.GIT_BRANCH} ")
            
          }
        )
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
  }
}