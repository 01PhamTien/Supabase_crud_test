pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Build project...'
            }
        }

        stage('Check Node') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    sh 'npx vercel ./ --prod --token=$VERCEL_TOKEN --yes'
                }
            }
        }

    }
}