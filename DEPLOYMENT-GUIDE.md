# ElectronicHub Deployment Guide

This guide provides instructions for deploying the ElectronicHub website to production.

## Prerequisites

- Node.js 18+ installed
- Git
- A Vercel account (recommended) or other hosting provider
- DeepSeek API key for the AI assistant

## Deployment Steps

### 1. Environment Variables

Make sure to set the following environment variables in your deployment platform:

- `DEEPSEEK_API_KEY`: Your DeepSeek API key for the AI assistant

### 2. Local Build Test

Before deploying, test the build locally:

\`\`\`bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the production build
npm start
\`\`\`

Verify that the site works correctly in production mode.

### 3. Deploying to Vercel (Recommended)

#### Using the Vercel CLI

1. Install the Vercel CLI:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. Log in to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Deploy the project:
   \`\`\`bash
   vercel
   \`\`\`

4. For production deployment:
   \`\`\`bash
   vercel --prod
   \`\`\`

#### Using the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to the [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Set the framework preset to "Next.js"
   - Add the required environment variables
6. Click "Deploy"

### 4. Post-Deployment Checks

After deployment, verify the following:

- All pages load correctly
- The AI assistant works properly
- Search functionality works
- Component details pages display correctly
- Mobile responsiveness works as expected
- Links in the footer and navigation work correctly

### 5. Custom Domain Setup (Optional)

If you want to use a custom domain:

1. In the Vercel dashboard, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow the instructions to configure DNS settings

### 6. Monitoring and Analytics

Consider setting up:

- [Vercel Analytics](https://vercel.com/analytics) for performance monitoring
- [Google Analytics](https://analytics.google.com/) for user behavior tracking
- [Sentry](https://sentry.io/) for error tracking

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure your DeepSeek API key is correctly set in environment variables
2. **Build Failures**: Check build logs for errors
3. **Missing Dependencies**: Ensure all dependencies are properly installed
4. **Routing Issues**: Verify Next.js routing configuration

### Getting Help

If you encounter issues not covered in this guide, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Issues](https://github.com/yourusername/electronichub/issues)

## Maintenance

Regular maintenance tasks:

- Update dependencies regularly
- Monitor API usage and costs
- Back up your data
- Check for performance issues
- Update content as needed
