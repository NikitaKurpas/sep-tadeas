pipeline {
    agent none
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {            
            agent {
                docker {
                    image 'node:6-alpine' 
                    args '-p 3000:3000' 
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                echo 'tady budou testy'
                sh 'npm test' 
            }
        }
    }
}