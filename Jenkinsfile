pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Build project...'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    bat 'npx vercel --prod --token=%VERCEL_TOKEN% --yes'
                }
            }
        }

    }
}