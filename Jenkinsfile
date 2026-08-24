pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t smart-solar-farm:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container...'
                bat 'docker stop smart-solar-farm-container || exit 0'
            }
        }

        stage('Remove Old Container') {
            steps {
                echo 'Removing old container...'
                bat 'docker rm smart-solar-farm-container || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                echo 'Starting new container...'
                bat 'docker run -d -p 8080:80 --name smart-solar-farm-container smart-solar-farm:latest'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}