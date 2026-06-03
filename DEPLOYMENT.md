# Deployment Guide for Uniosun Pulse

This guide will help you deploy Uniosun Pulse to production using:
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas

## Prerequisites

You'll need accounts on:
1. [Vercel](https://vercel.com/signup) - Free
2. [Railway](https://railway.app/login) - Free tier available
3. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) - Free tier available
4. [GitHub](https://github.com) - Already have one ✓

---

## Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or GitHub account
3. Click "Create" to create a new project
4. Create a free cluster (select the free tier)

### 1.2 Get Your Connection String
1. In MongoDB Atlas, go to **Clusters** → **Connect**
2. Choose **Drivers** → **Node.js**
3. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Save it somewhere safe - you'll need it

### 1.3 Configure Database Access
1. Go to **Network Access** tab
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (for development/testing)
4. For production, use your Railway IP instead

---

## Step 2: Deploy Backend on Railway

### 2.1 Connect GitHub Repository
1. Go to https://railway.app
2. Sign up/Log in with GitHub
3. Click **+ New Project** → **Deploy from GitHub repo**
4. Select **oloyedeferanmi08/uniosun-pulse**
5. Click **Deploy**

### 2.2 Configure Environment Variables
1. In your Railway project, click on the **server** service
2. Go to **Variables** tab
3. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uniosun-pulse
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-vercel-url.vercel.app
   ```
   - Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials
   - Replace `your-vercel-url` with your Vercel domain (you'll get it in Step 3)

### 2.3 Set Root Directory
1. In Railway, go to **Settings** tab
2. Under **Root Directory**, enter: `server`
3. This tells Railway to run the backend from the server folder

### 2.4 Get Your Backend URL
1. In Railway, go to the **server** service
2. Look for **Domains** section
3. Copy your Railway URL (looks like: `https://your-app.railway.app`)
4. Save it - you'll need it for the frontend

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Connect GitHub Repository
1. Go to https://vercel.com/new
2. Sign up/Log in with GitHub
3. Search for and select **oloyedeferanmi08/uniosun-pulse**
4. Click **Import**

### 3.2 Configure Project Settings
1. **Framework Preset:** Select **Vite**
2. **Root Directory:** Select `client`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

### 3.3 Add Environment Variables
1. Click **Environment Variables**
2. Add:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```
   - Replace `your-railway-url` with the Railway backend URL from Step 2.4

3. Click **Deploy**

### 3.4 Get Your Frontend URL
1. After deployment completes, Vercel will show your URL
2. It looks like: `https://uniosun-pulse.vercel.app`
3. Save this URL

### 3.5 Update Backend with Frontend URL
1. Go back to Railway
2. Edit the `CLIENT_URL` variable to your Vercel URL from above
3. Save and redeploy

---

## Step 4: Update Frontend to Use Railway Backend

The frontend Vite config should already proxy API calls. Verify:

1. Your frontend makes requests to `/api/messages`
2. It will be forwarded to your Railway backend automatically
3. If manual configuration needed, update `client/vite.config.js`

---

## Step 5: Test Your Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Create a username
3. Try sending a test message
4. Check if it uploads to MongoDB

---

## Troubleshooting

### Messages Not Saving?
- Check Railway backend logs for errors
- Verify MongoDB Atlas connection string is correct
- Ensure Network Access in MongoDB Atlas includes Railway IP

### Can't Connect to Backend?
- Verify `VITE_API_URL` environment variable in Vercel
- Check Railway domain is accessible
- Review CORS settings in backend server.js

### File Uploads Not Working?
- Railway's default file system is ephemeral (doesn't persist)
- For production, consider using:
  - **AWS S3** (Amazon cloud storage)
  - **Cloudinary** (image hosting)
  - **Railway's persistent volumes**

---

## Next Steps for Production

1. **Set up a custom domain** (optional):
   - In Vercel: **Settings** → **Domains**
   - In Railway: **Settings** → **Domains**

2. **Enable HTTPS** - Both platforms do this automatically ✓

3. **Set up file storage**:
   - Currently files are stored on Railway's ephemeral file system
   - For production, use AWS S3 or Cloudinary

4. **Add monitoring**:
   - Railway Dashboard shows real-time logs
   - Set up error alerts

5. **Add more features**:
   - User authentication
   - Message notifications
   - Admin dashboard to view all messages

---

## Quick Deployment Checklist

- [ ] MongoDB Atlas account created & connection string ready
- [ ] Railway GitHub connected & backend deployed
- [ ] Railway environment variables configured
- [ ] Vercel GitHub connected & frontend deployed
- [ ] Vercel environment variables configured
- [ ] Backend URL updated in Vercel
- [ ] Frontend URL updated in Railway
- [ ] Test message sent successfully
- [ ] Files uploading correctly

---

## Support

If you encounter issues:
1. Check Railway logs: **server** → **Logs**
2. Check Vercel logs: **Deployments** → **View Logs**
3. Check MongoDB Atlas: **Activity** tab for connection issues

Good luck! 🚀
