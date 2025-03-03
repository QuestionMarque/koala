import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Temporary in-memory storage (replace this with your database)
let apiKeys = [];

// DELETE API key
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// UPDATE API key
export async function PUT(request, { params }) {
  try {
    const id = params.id
    const body = await request.json()

    const { data, error } = await supabase
      .from('api_keys')
      .update({
        name: body.name,
        type: body.type,
        monthly_limit: body.monthlyLimit,
        pii_enabled: body.piiEnabled,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 