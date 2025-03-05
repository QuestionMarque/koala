import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { summarizeReadme } from '@/lib/chain';

export async function POST(request) {
  try {
    const { githubUrl } = await request.json();
    const apiKey = request.headers.get('x-api-key');

    // Validate API key presence
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Validate GitHub URL presence
    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    // Check if the API key exists in the database
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const readmeContent = await getReadmeContent(githubUrl);
    const summary = await summarizeReadme(readmeContent);
    
    return NextResponse.json(summary, { status: 200 });

  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 

async function getReadmeContent(githubUrl) {
  try {
    // Validate GitHub URL format
    if (!githubUrl.startsWith('https://github.com/')) {
      throw new Error('Invalid GitHub URL format');
    }

    // Parse owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    if (urlParts.length < 2) {
      throw new Error('Invalid GitHub repository URL');
    }

    const owner = urlParts[0];
    const repo = urlParts[1];

    // Fetch readme content from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Failed to fetch README: ${response.status} ${response.statusText}`
      );
    }

    const readmeContent = await response.text();
    if (!readmeContent) {
      throw new Error('README content is empty');
    }

    return readmeContent;

  } catch (error) {
    console.error('Error fetching README:', error);
    throw new Error(`Failed to fetch README: ${error.message}`);
  }
}