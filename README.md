# Kontakas - AWS Lambda Contact Form Handler

![](https://goldencode-solutions-client-assets.s3.us-east-1.amazonaws.com/kontakas/kontakas-logo.jpg)

A serverless contact form processing system built with AWS Lambda, featuring reCAPTCHA validation and email notifications.

## 🏆 AWS Lambda Hackathon Submission

This project demonstrates the power of AWS Lambda for building scalable, serverless contact form processing with advanced validation and notification capabilities.

## 🏗 Architecture Overview

![Kontakas Architecture Diagram](https://goldencode-solutions-client-assets.s3.us-east-1.amazonaws.com/kontakas/kontakas-diagram.jpg)

## 🚀 How This Application Uses AWS Lambda

### Core Lambda Functions
- **SendContactUsForm**: Main handler that processes contact form submissions
- **Event-driven architecture**: Lambda functions trigger automatically via API Gateway
- **Serverless scaling**: Automatically handles traffic spikes without server management
- **Cost-effective**: Pay only for actual function execution time

### Key Lambda Features Utilized
- **Environment Variables**: Dynamic configuration for different environments (dev/prod)
- **Warm Containers**: Optimized for performance with container reuse
- **API Gateway Integration**: RESTful endpoint triggering Lambda functions
- **Error Handling**: Structured error responses and validation
- **CloudWatch Logging**: Automatic logging and monitoring

## 🛠 AWS Tools Used

- **AWS Lambda**: Core serverless compute for form processing
- **AWS API Gateway**: RESTful API endpoints
- **AWS SAM (Serverless Application Model)**: Infrastructure as Code and local development
- **AWS CloudWatch**: Logging and monitoring
- **AWS Systems Manager Parameter Store**: Configuration management (ready for secrets)
- **AWS Secrets Manager**: Secure API key storage (configured for production)

## 📋 Prerequisites

Before running locally, ensure you have:

- **Node.js 20.x** or later
- **AWS CLI** configured with appropriate credentials
- **AWS SAM CLI** installed
- **Docker** (for SAM local development)
- **npm** or **yarn** package manager

## 🏃‍♂️ Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone git@github.com:alvingerona/kontakas-public.git
cd kontakas
npm install
```

### 2. Environment Configuration

The project uses environment-specific configurations:

- `samconfig-dev.toml` - Explicit development configuration  
- `samconfig-prod.toml` - Production configuration

### 3. Start Local Development Server

```bash
# Start development server with automatic rebuilding and hot reload
npm run dev
```

This command will:
- Clean and rebuild the project
- Start file watching for automatic rebuilds
- Launch SAM local API server with development environment variables
- Enable warm containers for faster response times

### 4. Test the API

The local server will be available at `http://localhost:3000`

#### Test Endpoint
```bash
curl -X POST http://localhost:3000/send-form \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "test-form-id",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Test message"
    },
    "g-recaptcha-response": "test-token"
  }'
```

## 🏗 Project Structure

```
kontakas/
├── src/
│   ├── handlers/
│   │   └── sendContactusForm/          # Main Lambda handler
│   │       ├── index.ts                # Entry point
│   │       ├── schema.ts               # Validation schemas
│   │       ├── constants.ts            # Field constants
│   │       └── recaptcha-validate.ts   # reCAPTCHA validation
│   ├── utils/
│   │   ├── response.ts                 # HTTP response utilities
│   │   ├── validation.ts               # Form validation
│   │   ├── env.ts                      # Environment configuration
│   │   └── logger.ts                   # Logging utilities
│   ├── models/                         # Data models
│   ├── repositories/                   # Data access layer
│   ├── integrations/                   # External service integrations
│   └── services/                       # Business logic services
├── template.yaml                       # SAM template (Infrastructure as Code)
├── samconfig*.toml                     # Environment-specific configurations
└── esbuild.js                         # Custom build configuration
```

## 🌍 Environment Variables

The application uses environment-specific variables managed through SAM parameters:

### Development Environment
- `ENVIRONMENT=dev`
- `ENABLE_RECAPTCHA=false` (disabled for easier testing)
- `LOG_LEVEL=debug` (verbose logging)

### Production Environment  
- `ENVIRONMENT=prod`
- `ENABLE_RECAPTCHA=true` (full validation)
- `LOG_LEVEL=warn` (minimal logging)

## 🔧 Available Scripts

```bash
# Development
npm run dev                    # Start development server with hot reload

# Deployment  
npm run deploy                 # Build and deploy to production
```

## 🧪 Testing

### Local Testing
1. Start the local server: `npm run dev`
2. The API will be available at `http://localhost:3000`
3. Use the test endpoint above or integrate with a frontend

### Validation Features
- **Form Schema Validation**: Using Yup for robust input validation
- **reCAPTCHA Integration**: Spam protection (configurable per environment)
- **Organization & Form Management**: Multi-tenant form handling
- **Procedure Pipeline**: Extensible processing workflow

## 🚀 Deployment

### Prerequisites for Deployment

⚠️ **Important**: Before deploying, you must manually create the S3 bucket for static assets due to CloudFormation dependency constraints.

#### 1. Create S3 Bucket Manually

```bash
# Replace 'your-stack-name' with your actual stack name
aws s3 mb s3://your-stack-name-static-assets --region us-east-1

# Enable public access for the bucket (required for CloudFront)
aws s3api put-public-access-block \
  --bucket your-stack-name-static-assets \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

#### 2. Update Template Configuration

Ensure your `samconfig-prod.toml` or `samconfig-dev.toml` has the correct stack name that matches your bucket name:

```toml
[default.deploy.parameters]
stack_name = "your-stack-name"  # This should match the bucket prefix
```

### Production Deployment
```bash
npm run deploy
```

This command will:
- Clean the dist folder
- Build the project for production
- Deploy to production using the samconfig-prod.toml configuration
- Configure the CloudFront distribution to use your pre-created S3 bucket

## 📊 Monitoring and Logging

- **CloudWatch Logs**: Automatic Lambda function logging
- **Structured Logging**: Environment-aware log levels
- **Error Tracking**: Comprehensive error handling and reporting
- **Performance Metrics**: Lambda execution metrics via CloudWatch

## 🔐 Security Features

- **Input Validation**: Comprehensive form data validation
- **reCAPTCHA Protection**: Bot and spam prevention
- **Environment Isolation**: Separate configurations for dev/prod
- **Secure Secrets Management**: Ready for AWS Secrets Manager integration

## 🎯 Lambda-Specific Optimizations

- **Cold Start Minimization**: Efficient bundling with esbuild
- **Memory Optimization**: Right-sized memory allocation (128MB)
- **Warm Containers**: Enabled for better performance
- **Tree Shaking**: Reduced bundle size for faster startup
- **Source Maps**: Enhanced debugging capabilities

## 📝 API Documentation

### POST /send-form

**Request Body:**
```json
{
  "formId": "string",
  "data": {
    "name": "string",
    "email": "string", 
    "message": "string"
  },
  "g-recaptcha-response": "string"
}
```

**Response:**
```json
{
  "success": true
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally using `npm run dev`
5. Submit a pull request

---

**Built with ❤️ for the AWS Lambda Hackathon**