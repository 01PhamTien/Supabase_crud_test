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

        stage('Notify Start') {
            steps {
                withCredentials([
                    string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_TOKEN'),
                    string(credentialsId: 'telegram-chat-id', variable: 'TELEGRAM_CHAT_ID')
                ]) {
                    script {
                        def commit = sh(
                            script: 'git rev-parse --short HEAD',
                            returnStdout: true
                        ).trim()

                        def message = """🚀 Bắt đầu deploy website

Repository: 01PhamTien/Supabase_crud_test
Branch: main
Commit: ${commit}"""

                        sh """
                            curl -s -X POST "https://api.telegram.org/bot\$TELEGRAM_TOKEN/sendMessage" \
                            -d chat_id="\$TELEGRAM_CHAT_ID" \
                            --data-urlencode text='${message}'
                        """
                    }
                }
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
                            --yes \
                            --logs
                    '''
                }
            }
        }
    }

    post {

        success {
            withCredentials([
                string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_TOKEN'),
                string(credentialsId: 'telegram-chat-id', variable: 'TELEGRAM_CHAT_ID')
            ]) {
                sh '''
                    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
                        -d chat_id="$TELEGRAM_CHAT_ID" \
                        --data-urlencode "text=✅ Deploy thành công

Repository: 01PhamTien/Supabase_crud_test
Branch: main
Website: https://supabase-crud-test.vercel.app"
                '''
            }
        }

        failure {
            withCredentials([
                string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_TOKEN'),
                string(credentialsId: 'telegram-chat-id', variable: 'TELEGRAM_CHAT_ID')
            ]) {
                script {
                    def commit = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    sh """
                        curl -s -X POST "https://api.telegram.org/bot\$TELEGRAM_TOKEN/sendMessage" \
                            -d chat_id="\$TELEGRAM_CHAT_ID" \
                            --data-urlencode text='❌ Deploy thất bại

Repository: 01PhamTien/Supabase_crud_test
Branch: main
Commit: ${commit}
Error: Jenkins pipeline failed'
                    """
                }
            }
        }
    }
}