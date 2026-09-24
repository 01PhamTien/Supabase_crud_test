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
                withCredentials([
                    string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN'),
                    string(credentialsId: 'vercel-project-id', variable: 'VERCEL_PROJECT_ID'),
                    string(credentialsId: 'vercel-org-id', variable: 'VERCEL_ORG_ID')
                ]) {
                    sh '''
                        npx vercel deploy \
                            --prod \
                            --token="$VERCEL_TOKEN" \
                            --project="$VERCEL_PROJECT_ID" \
                            --scope="$VERCEL_ORG_ID" \
                            --yes
                    '''
                }
            }
        }

    }
}