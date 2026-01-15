# Sanity CMS Projects Setup Guide

This guide helps you populate your portfolio with projects using the Sanity Studio interface.

## Getting Started

1. **Start Sanity Studio locally:**
   ```bash
   cd backend
   yarn dev
   ```
   This opens the Sanity Studio at `http://localhost:3333`

2. **Or deploy and access online:**
   ```bash
   cd backend
   yarn deploy
   ```
   Access at: `https://your-project.sanity.studio`

## Recommended Projects to Add

Based on your LinkedIn profile and experience, here are suggested projects:

### 1. End-to-End Encrypted Secure Chat System
- **Title:** "Secure Chat System with E2E Encryption"
- **Short Title:** "SecureChat"
- **Subtitle:** "Newcastle University Master's Project"
- **Client:** "Academic Research"
- **Description:** 
  - Developed end-to-end encrypted chat application
  - Implemented public/private key architecture
  - Public keys stored on server, private keys on user devices
  - Added authentication layer requiring private key for device login
  - Collaborated with team on cybersecurity best practices
- **Technologies:** Cryptography, Information Security, Key Management, System Architecture
- **Links:** GitHub repo (if available)

### 2. Data Pipeline & ETL Systems
- **Title:** "Enterprise Data Pipeline Architecture"
- **Short Title:** "Data Pipeline"
- **Subtitle:** "OceanFrogs Software - Production System"
- **Client:** "OceanFrogs Software"
- **Description:**
  - Built scalable ETL pipelines using Azure Databricks & PySpark
  - Processed large-scale datasets for analytics
  - Implemented data quality checks and monitoring
  - Optimized query performance and data modeling
- **Technologies:** PySpark, Azure Databricks, SQL Server, ETL, Data Engineering
- **Links:** Company website

### 3. REST API Development with Docker
- **Title:** "Microservices API Platform"
- **Short Title:** "API Platform"
- **Subtitle:** "OceanFrogs Software - Backend Infrastructure"
- **Client:** "OceanFrogs Software"
- **Description:**
  - Designed and built production REST APIs using FastAPI
  - Containerized applications with Docker for deployment
  - Implemented authentication, validation, and error handling
  - Followed best practices: documentation, testing, GitHub workflows
  - Integrated with SQL databases using SQL Alchemy
- **Technologies:** Python, FastAPI, Docker, REST API, SQL Alchemy, PostgreSQL
- **Links:** Documentation (if available)

### 4. Machine Learning Data Labeling System
- **Title:** "ML Data Labeling & Training Pipeline"
- **Short Title:** "ML Pipeline"
- **Subtitle:** "OceanFrogs Software - Machine Learning Project"
- **Client:** "OceanFrogs Software"
- **Description:**
  - Researched and proposed multiple solution approaches
  - Documented pros, cons, and recommendations
  - Built data labeling infrastructure
  - Integrated with ML training workflows
- **Technologies:** Python, Machine Learning, Data Mining, KeyBERT, Pandas
- **Links:** Internal documentation

### 5. Web Development & Speed Optimization
- **Title:** "Performance-Optimized Web Applications"
- **Short Title:** "Web Apps"
- **Subtitle:** "Full Stack Development Projects"
- **Client:** "Various"
- **Description:**
  - Built responsive web applications with React and Node.js
  - Implemented website speed optimizations
  - WordPress and Drupal CMS development
  - Mobile app development using Flutter
- **Technologies:** React, Node.js, WordPress, Drupal, Flutter, JavaScript, PHP
- **Links:** Live sites (if available)

### 6. Data Analytics & Visualization
- **Title:** "Business Intelligence Dashboard"
- **Short Title:** "BI Dashboard"
- **Subtitle:** "Data Analytics & Visualization"
- **Client:** "OceanFrogs Software"
- **Description:**
  - Created data analytics dashboards using Google Looker Studio
  - Implemented data scraping and mining solutions
  - Automated reporting pipelines
  - Provided actionable insights from complex datasets
- **Technologies:** Google Looker Studio, Python, Pandas, Beautiful Soup, Selenium
- **Links:** Demo or screenshots

## How to Add Projects in Sanity Studio

1. **Navigate to Projects:**
   - Click "Project" in the left sidebar
   - Click "Create new document"

2. **Fill in Required Fields:**
   - **Title:** Full project name
   - **Short Title:** Abbreviated name for UI
   - **Slug:** Auto-generated URL-friendly version (click "Generate")
   - **Subtitle:** One-line description
   - **Client:** Company or organization

3. **Add Details:**
   - **Designers:** If applicable (or skip)
   - **Body:** Detailed description using rich text editor
     - Use bullet points for achievements
     - Include technical challenges and solutions
     - Mention impact/results
   - **Highlight Color:** Choose a color that represents the project
   - **Links:** Add GitHub, live site, or documentation links

4. **Save & Publish:**
   - Click "Publish" in the bottom bar
   - Your project will now appear on the frontend

## Experience Timeline

You can also add your work experience using the new "Work Experience" document type:

### OceanFrogs Software
- **Company:** OceanFrogs Software
- **Role:** Data Engineer
- **Start Date:** 2022
- **End Date:** 2024
- **Description:** Built data pipelines, REST APIs, and ML systems
- **Technologies:** Python, FastAPI, Docker, PySpark, Azure Databricks
- **Order:** 1

### Appsatile Pm Ltd
- **Company:** Appsatile Pm Ltd
- **Role:** Founding Software Engineer (Data)
- **Start Date:** 2024
- **Current Position:** Yes
- **Description:** Leading data engineering initiatives
- **Technologies:** Python, PySpark, Azure Databricks, Docker, React
- **Order:** 0

## Tips

- **Use Real Data:** Add actual project details, not placeholders
- **Be Specific:** Include metrics, challenges, and solutions
- **Link Everything:** Add GitHub repos, live sites, documentation
- **Highlight Impact:** Mention results, improvements, or awards
- **Keep Updated:** Regularly add new projects as you complete them

## Need Help?

- Sanity documentation: https://www.sanity.io/docs
- Schema file: `backend/schemas/project.ts`
- Frontend display: `frontend/src/ProjectListing.tsx`
