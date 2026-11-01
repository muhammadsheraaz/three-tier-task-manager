
pipeline {

    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        FRONTEND_IMAGE = "muhammadsheraaz/task-manager-frontend"
        BACKEND_IMAGE  = "muhammadsheraaz/task-manager-backend"
        IMAGE_TAG      = "latest"
    }

    stages {

        // 1. Checkout
        stage('Checkout Source Code') {
            steps {
                echo "Checking out latest source code from GitHub..."
                checkout scm

                sh '''
                    echo "Build Number: $BUILD_NUMBER"
                    echo "Git Commit: $(git rev-parse --short HEAD)"
                    echo "Build Started: $(date)"
                '''
            }
        }

        // 2. Environment Verification
        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Checking build environment..."
                    node --version
                    npm --version
                    docker --version
                    docker compose version
                '''
            }
        }

        // 3. Frontend Lint and Build
        stage('Frontend Lint & Build') {
            steps {
                dir('frontend') {
                    sh '''
                        echo "Installing frontend dependencies..."
                        npm install

                        echo "Running React lint checks and production build..."
                        CI=true npm run build
                    '''
                }
            }
        }

        // 4. Backend Static Validation
        stage('Backend Code Validation') {
            steps {
                dir('backend') {
                    sh '''
                        echo "Installing backend dependencies..."
                        npm install

                        echo "Checking JavaScript syntax..."
                        node --check server.js
                    '''
                }
            }
        }

        // 5. Unit Testing
        stage('Unit Testing') {
            steps {
                script {
                    def frontendTests = sh(
                        script: "node -e \"process.exit(require('./frontend/package.json').scripts?.test ? 0 : 1)\"",
                        returnStatus: true
                    )

                    def backendTests = sh(
                        script: "node -e \"process.exit(require('./backend/package.json').scripts?.test ? 0 : 1)\"",
                        returnStatus: true
                    )

                    if (frontendTests == 0) {
                        dir('frontend') {
                            sh 'CI=true npm test -- --watchAll=false'
                        }
                    } else {
                        echo "WARNING: Frontend unit tests not configured. Skipping."
                    }

                    if (backendTests == 0) {
                        dir('backend') {
                            sh 'npm test'
                        }
                    } else {
                        echo "WARNING: Backend unit tests not configured. Skipping."
                    }
                }
            }
        }

        // 6. Build Docker Images
        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "Building frontend Docker image..."
                    docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend

                    echo "Building backend Docker image..."
                    docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend
                '''
            }
        }

        // 7. Docker Hub Authentication
        stage('Docker Hub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        // 8. Push Images
        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                    echo "Pushing frontend image..."
                    docker push $FRONTEND_IMAGE:$IMAGE_TAG

                    echo "Pushing backend image..."
                    docker push $BACKEND_IMAGE:$IMAGE_TAG
                '''
            }
        }

        // 9. Deployment
        stage('Deploy Application') {
            steps {
                sh '''
                    echo "Stopping previous application..."
                    docker compose down

                    echo "Deploying updated application..."
                    docker compose up -d --build

                    echo "Checking running containers..."
                    docker compose ps
                '''
            }
        }

    }

    // Build execution metrics and status
    post {

        success {
            echo """
            =====================================
                  PIPELINE EXECUTION SUCCESS
            =====================================
            Build Number: ${env.BUILD_NUMBER}
            Build Status: SUCCESS
            Build Duration: ${currentBuild.durationString}
            Completed: ${new Date()}
            =====================================
            """
        }

        failure {
            echo """
            =====================================
                  PIPELINE EXECUTION FAILED
            =====================================
            Build Number: ${env.BUILD_NUMBER}
            Build Status: FAILURE
            Build Duration: ${currentBuild.durationString}
            Failed At: ${new Date()}
            Check Jenkins Console Output.
            =====================================
            """
        }

        always {
            sh '''
                docker logout || true
            '''
            echo "Pipeline execution finished."
            echo "Final Status: ${currentBuild.currentResult}"
        }
    }
}














































// pipeline {

//     agent any

//     environment {
//         FRONTEND_IMAGE = "muhammadsheraaz/task-manager-frontend"
//         BACKEND_IMAGE  = "muhammadsheraaz/task-manager-backend"
//         IMAGE_TAG      = "latest"
//     }

//     stages {

//         stage('Checkout Source Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Verify Environment') {
//             steps {
//                 sh 'pwd'
//                 sh 'ls -la'
//                 sh 'docker --version'
//                 sh 'docker compose version'
//             }
//         }

//         stage('Build Frontend Image') {
//             steps {
//                 sh 'docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend'
//             }
//         }

//         stage('Build Backend Image') {
//             steps {
//                 sh 'docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend'
//             }
//         }

//         stage('Docker Hub Login') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-creds',
//                     usernameVariable: 'DOCKER_USER',
//                     passwordVariable: 'DOCKER_PASS'
//                 )]) {

//                     sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
//                 }
//             }
//         }

//         stage('Push Frontend Image') {
//             steps {
//                 sh 'docker push $FRONTEND_IMAGE:$IMAGE_TAG'
//             }
//         }

//         stage('Push Backend Image') {
//             steps {
//                 sh 'docker push $BACKEND_IMAGE:$IMAGE_TAG'
//             }
//         }

//         stage('Deploy Application') {
//             steps {
//                 sh 'docker compose down'
//                 sh 'docker compose up -d'
//             }
//         }
//     }

// }