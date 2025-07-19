import { NextRequest, NextResponse } from 'next/server';

/**
 * Gumroad OAuth Callback Handler
 * 
 * This endpoint handles the OAuth callback from Gumroad after user authorization.
 * It exchanges the authorization code for an access token.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
      console.error('Gumroad OAuth Error:', error, errorDescription);
      return NextResponse.json(
        { 
          error: 'OAuth Error', 
          message: errorDescription || 'Authorization failed' 
        },
        { status: 400 }
      );
    }

    // Check if authorization code is present
    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code);

    if (tokenResponse.success) {
      // Store the access token securely (implement your storage logic here)
      // For now, we'll just return success with some token info
      
      // Redirect to success page or dashboard
      return NextResponse.redirect(new URL('/dashboard?auth=success', request.url));
    } else {
      return NextResponse.json(
        { error: 'Token exchange failed', message: tokenResponse.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code: string) {
  try {
    const clientId = process.env.GUMROAD_CLIENT_ID;
    const clientSecret = process.env.GUMROAD_CLIENT_SECRET;
    const redirectUri = process.env.GUMROAD_REDIRECT_URI || 'http://localhost:3000/api/auth/gumroad/callback';

    if (!clientId || !clientSecret) {
      throw new Error('Missing Gumroad credentials in environment variables');
    }

    const response = await fetch('https://api.gumroad.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
      // Store token securely (implement your preferred storage method)
      console.log('Access token received:', data.access_token.substring(0, 10) + '...');
      
      return {
        success: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        scope: data.scope,
        tokenType: data.token_type,
      };
    } else {
      return {
        success: false,
        error: data.error_description || 'Failed to exchange token',
      };
    }

  } catch (error) {
    console.error('Token exchange error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
} 