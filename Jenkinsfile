pipeline {
  agent {
    node {
      label "docker-agent-slave"
    }
  }
  stages {
    stage("build") {
      steps {
        sh '''
        echo "building"
        '''
        sh '''
        echo "checking dir"
        ls -la
        '''
      }
    }
  }
}
