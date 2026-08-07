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
}