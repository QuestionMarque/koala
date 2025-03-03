import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

// GET all API keys
export async function GET() {
  try {
    console.log('Fetching API keys...');
    
    const { data: apiKeys, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 500 });
    }

    console.log('API keys fetched:', apiKeys);
    return NextResponse.json(apiKeys || []);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}

// CREATE new API key
export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Generate a secure random API key
    const apiKey = `koala_${crypto.randomBytes(24).toString('hex')}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        name: body.name,
        key: apiKey,
        type: body.type || 'development',
        monthly_limit: body.monthlyLimit || null,
        pii_enabled: body.piiEnabled || false
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 