pipeline{
    agent {label "vinod"}
    stages{
        stage("code clone github"){
            steps{
                echo "this is cloning the code"
                git url: "https://github.com/jitender81/portfolio_website.git", branch: "main"
                echo "code cloning succesful"
            }
        }
        stage('SonarCloud Analysis') {
          steps {
             withSonarQubeEnv('SonarCloud') {
                withEnv(['SONAR_SCANNER_HOME=' + tool 'SonarScanner']) {
                   sh '''
                      $SONAR_SCANNER_HOME/bin/sonar-scanner \
                      -Dsonar.organization=jitender81 \
                      -Dsonar.projectKey=jitender81_portfolio_website \
                      -Dsonar.sources=.
                       '''
                   }
               }
           }
        }
        stage("build docker image"){
            steps{
                echo "this is building the code"
                sh "docker build -t jiender/jitender-portfolio:latest ."
                sh "docker images"
            }
        }
        stage("test codes"){
            steps{
                echo "this is testing the code"
                // sh "npx html-validate "**/*.html
            }
        }
        stage("push to DockerHub"){
            steps{
                echo "this is pushing to DockerHub"
                withCredentials([usernamePassword(credentialsId:"DockerhubCred",
                passwordVariable:"dockerhubPass",
                usernameVariable:"dockerhubUser")]){
                    sh "docker login -u ${env.dockerhubUser} -p ${env.dockerhubPass}"
                    sh "docker push jiender/jitender-portfolio:latest"
                }
            }
        }
  
        stage("deploy"){
            steps{
                echo "this is deploying the code"
                sh 'docker compose up -d'
            }
        }
        
    }
    post {
        failure {
            mail to: 'jitendermahlawat696@gmail.com',
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Check console output: ${env.BUILD_URL}"
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
    }
}
