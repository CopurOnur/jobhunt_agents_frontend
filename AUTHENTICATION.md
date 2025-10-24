# Authentication Setup

The frontend now includes a simple authentication system that restricts access to only 2 authorized users.

## Features

- Username/password authentication
- Session persistence using localStorage
- Beautiful login page with error handling
- Logout functionality with username display
- Protected routes - unauthorized users see login page

## Configuration

### 1. Set User Credentials

Edit your `.env.local` file and update the authentication variables:

```bash
# Authentication - Two users only
NEXT_PUBLIC_USER1_USERNAME=your_username1
NEXT_PUBLIC_USER1_PASSWORD=your_password1
NEXT_PUBLIC_USER2_USERNAME=your_username2
NEXT_PUBLIC_USER2_PASSWORD=your_password2
```

**Important:** Replace the default values (`user1`, `password1`, etc.) with your actual credentials.

### 2. Restart Development Server

After updating the environment variables, restart your development server:

```bash
npm run dev
```

The changes will also apply automatically when you deploy to Vercel.

## How It Works

### Components

1. **AuthContext** ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx))
   - Manages authentication state
   - Stores session in localStorage
   - Validates credentials against environment variables

2. **LoginPage** ([src/components/LoginPage.tsx](src/components/LoginPage.tsx))
   - Beautiful login form with gradient background
   - Error handling for invalid credentials
   - Dark mode support

3. **ProtectedRoute** ([src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx))
   - Wrapper component that protects routes
   - Shows LoginPage if user is not authenticated
   - Automatically redirects after successful login

4. **LogoutButton** ([src/components/LogoutButton.tsx](src/components/LogoutButton.tsx))
   - Displays current username
   - Logout button clears session

### Usage

The main page is automatically protected. When a user visits the site:

1. If not authenticated → Login page appears
2. After successful login → Main application loads
3. Session persists across page refreshes
4. Logout clears session and returns to login page

## Security Notes

⚠️ **Important Security Considerations:**

1. **Client-side only**: This is a simple client-side authentication suitable for restricting access to 2 known users. It's not suitable for sensitive applications.

2. **Environment variables**: Credentials are stored in `NEXT_PUBLIC_*` variables, which are embedded in the client-side bundle. This is acceptable for basic access control but not for high-security applications.

3. **For production use**: Consider implementing:
   - Backend authentication with secure token management
   - Password hashing
   - HTTPS only
   - Rate limiting on login attempts
   - JWT tokens with expiration

4. **Current implementation is suitable for**:
   - Personal projects with trusted users
   - Internal tools for small teams
   - Preventing casual access
   - Situations where you control both user accounts

## Testing

### Test Login Flow

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should see the login page
4. Try logging in with valid credentials (from .env.local)
5. Try invalid credentials - you should see an error message
6. After successful login, you should see the main application
7. Refresh the page - you should remain logged in
8. Click logout - you should return to the login page

### Test Credentials

Default test credentials (update these in .env.local):

- **User 1**: username: `user1`, password: `password1`
- **User 2**: username: `user2`, password: `password2`

## Deployment to Vercel

When deploying to Vercel, add these environment variables in your project settings:

1. Go to your Vercel project
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:
   ```
   NEXT_PUBLIC_USER1_USERNAME
   NEXT_PUBLIC_USER1_PASSWORD
   NEXT_PUBLIC_USER2_USERNAME
   NEXT_PUBLIC_USER2_PASSWORD
   ```
4. Redeploy your application

## Troubleshooting

### "Invalid username or password" even with correct credentials

- Make sure you restarted the dev server after updating .env.local
- Check that there are no extra spaces in the credentials
- Verify the environment variables are set correctly

### Session not persisting

- Check browser localStorage is enabled
- Clear browser cache and localStorage
- Try in incognito mode to rule out extension interference

### Login page not appearing

- Verify `AuthProvider` is wrapping your app in `src/app/providers.tsx`
- Check that `<ProtectedRoute>` is wrapping the main content in `src/app/page.tsx`
- Look for console errors in browser developer tools

## Future Enhancements

If you need more robust authentication in the future, consider:

- Backend API authentication with bcrypt password hashing
- JWT tokens with refresh tokens
- OAuth integration (Google, GitHub, etc.)
- Multi-factor authentication
- User management interface
- Password reset functionality
- Audit logging
