## CI/CD

### Continuous Integration (CI)
- **Automated Pipeline**
    - Orchestrated with GitHub Actions to trigger on every Push and Pull Request.
- **Quality Assurance**
    - **Frontend**: Executes Unit Testing with Jest to ensure UI logic reliability
    - **Backend**: Performs Integration Testing to validate full API request-response cycles and database interactions
- **Linting**
    - Enforces code consistency via ESLint across the entire stack
- **Artefact Management**
    - Automatically generates and uploads backend Test Coverage Reports as CI artefacts for reviewer visibility
- **Docker Integration**
    - Automates Docker Image builds within the pipeline to ensure cross-environment reproducibility


### Continuous Deployment (CD)
- **Multi-Platform Deployment Strategy**
    - **Frontend (Vercel)**
        - **Orchestrated Deployment**
            - Replaced default auto-update with Vercel Deploy Hooks triggered via GitHub Actions
      
        - **Resource Optimisation**
            - Implemented Ignored Build Step to prevent redundant builds and ensure the frontend only updates after the backend service is confirmed ready
        
    - **Backend (Railway)**
        - **Fine-grained Control**
            - Triggered manually via Railway GraphQL API (environmentTriggersDeploy) to precisely manage deployment timing and optimise resource usage (Credit consumption)
         
        - **Containerized Portability**
            - Engineered a production-ready Dockerfile with environment-specific configurations, ensuring seamless migration between local development and cloud environments
        
    - **Database (MongoDB Atlas)**
        - **DBaaS Integration**
            - Integrated a cloud-managed Database-as-a-Service (DBaaS) layer (Connection strings are securely injected via Railway's environment variables to ensure data persistence across container redeployments)

- **Deployment Status and Records**
    - **Images**<br>
    <img src="../Image/Deployment/Vercel_Deployment.png" style="width:90%;"/><br>
    Image 1 - Vercel Deployment Record<br>
    <img src="../Image/Deployment/Railway_Deployment.png" style="width:90%;"/><br>
    Image 2 - Railway Deployment Record<br>


    - **Deployment Secret Explanation**

    | Secret Name            | Description / Purpose                                                  | How to Obtain                                    |
    | ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------ |
    | VERCEL_DEPLOY_HOOK     | Triggers automated deployment for the Frontend on Vercel               | Vercel Project Settings > Git > Deploy Hooks     |
    | RAILWAY_TOKEN          | Grants GitHub Actions permission to access the Railway API for deployment  | Railway User Settings > Tokens                   |
    | RAILWAY_SERVICE_ID     | Identifies the specific Backend Service to be targeted for deployment  | Railway Service > Settings > Service ID          |
    | RAILWAY_ENVIRONMENT_ID | Ensures the deployment is routed to the correct Environment            | Railway Environment > Settings > Environment ID  |
    | RAILWAY_DEPLOY_HOOK    | Used to programmatically trigger Backend deployment cycles             | Railway Service > Settings > Deploy Hook         |


    - **Security And Operational Excellence**
        - **Zero-Credential Exposure**
            - Ensure the source code does not have private data, and fulfil the OWASP standard
        - **Automated Lifecycle**
            - Reduce the deployment mistakes on manual trigger with GitHub Actions

            
- **Changes**
    - **Production Environment Realignment**
        - Migrated BACKEND_BASE_URL and BASE_URL from localhost to platform-specific production endpoints (Vercel/Railway)<br>
               (It ensured seamless communication between the decoupled frontend and backend services in a live cloud environment)<br>
          
    - **Security & CORS Optimisation**
        - Enhanced the ORIGINAL_URI configuration to support Multiple Origins<br>
          (It allowed the backend to securely accept requests from both the Vercel production domain and local development environments simultaneously, improving workflow flexibility without compromising security)


### Remarks
- The entire CI/CD workflow is managed and automated via GitHub Actions workflows
- CI/CD workflow definitions are located in `.github/workflows/` (The whole process could be viewed in the actions tab -> All workflows, CD workflow = CD pipeline)
- Backend CD are utilising Railway’s $5 credit/30-day trial/subscription model for consistent backend uptime